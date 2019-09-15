import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Row, Col } from 'antd';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './Read.scss';

import TranscriptText from '../components/TranscriptText';
import ReactPlayer from 'react-player';
import VideoMetadata from '../components/VideoMetadata';

const statusEnum = Object.freeze({
	WAITING: 'WAITING',
	ERROR: 'ERROR',
	UPLOAD: 'UPLOAD',
	READY: 'READY'
});

export default function Read(props) {
	const { videoId } = props.match.params;

	const [video, setVideo] = useState(null);
	const [status, setStatus] = useState('WAITING');
	const [showPlayer, setShowPlayer] = useState(true);

	async function fetchData(videoId) {
		const { ERROR, UPLOAD, READY } = statusEnum;
		try {
			const { data } = await axios.get(`/api/video/${videoId}`);
			if (data) {
				setVideo(data);
				setStatus(READY);
			} else {
				setStatus(UPLOAD);
			}
		} catch (err) {
			console.log(err);
			setStatus(ERROR);
		}
	}

	useEffect(() => {
		fetchData(videoId);
	}, [videoId]);

	return (
		<Layout>
			<Content>
				<Button>
					<Link to='/' style={{ textDecoration: 'none' }}>
						Back
					</Link>
				</Button>
				{showPlayer && (
					<Row>
						<Col className='video-frame__box'>
							<ReactPlayer
								url={`https://youtu.be/${videoId}`}
								width='100%'
								height='100%'
							/>
						</Col>
					</Row>
				)}

				<Row>
					<Col>
						<Button onClick={() => setShowPlayer(!showPlayer)}>
							Show Player
						</Button>
					</Col>
				</Row>

				<Row>
					<Col>
						<VideoMetadata status={status} video={video} />
					</Col>
				</Row>

				<Row className='transcript-row'>
					<Col>
						<TranscriptText status={status} video={video} />
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}
