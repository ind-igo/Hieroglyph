import React from 'react';
import 'antd/dist/antd.css';
import './ReadCard.scss';
import { Card, Button } from 'antd';

export default function ReadCard(props) {
	const { video } = props;
	return (
		<Card title={video.title} size='default'>
			<Button>Close</Button>
			<p>{video.channelTitle}</p>
			<p>{video.description}</p>
			<hr />
			<p className='overflow'>{video.transcript}</p>
		</Card>
	);
}
