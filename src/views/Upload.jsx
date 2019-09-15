import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Container,
	Button,
	InputGroup,
	InputGroupAddon,
	Input,
	Spinner
} from 'reactstrap';

const statusEnum = Object.freeze({
	INVALID_INPUT: 'INVALID_INPUT', // display invalid error
	WAITING: 'WAITING', // show spinner while waiting for response from server
	SERVER_ERROR: 'SERVER_ERROR', // show error & try again
	FOUND: 'FOUND', // display message & show link to /read/videoId:
	SUCCESS: 'SUCCESS' // sucessfully added to database. Show link to /read/videoId:
});

export default function Upload() {
	const [inputUrl, setInputUrl] = useState('');
	const [videoId, setVideoId] = useState('');
	const [status, setStatus] = useState('');

	const handleInput = (e) => {
		setInputUrl(e.target.value);
		setStatus('');
		setVideoId('');
	};

	async function handleSubmit(url) {
		const { INVALID_INPUT, WAITING, SERVER_ERROR, FOUND, SUCCESS } = statusEnum;
		setStatus(WAITING);

		if (!validateUrl(url)) return setStatus(INVALID_INPUT);

		try {
			const { data } = await axios.post(`/api/video/${getVideoId(url)}`);
			if (data.message === SUCCESS) setStatus(SUCCESS);
			if (data.message === FOUND) setStatus(FOUND);
			setVideoId(data.videoId);
		} catch (err) {
			console.log(err);
			setStatus(SERVER_ERROR);
		}
	}

	function messageSwitch(statusParam) {
		const { INVALID_INPUT, FOUND, SERVER_ERROR, WAITING, SUCCESS } = statusEnum;
		switch (statusParam) {
			case INVALID_INPUT:
				return <p>Invalid URL. Try again.</p>;
			case WAITING:
				return <Spinner color='primary' />;
			case FOUND:
				return <p>Transcript already added. Click next to read it.</p>;
			case SUCCESS:
				return <p>Transcript added. Click next to read it.</p>;
			case SERVER_ERROR:
				return <p>Server error.</p>;
			default:
				return null;
		}
	}

	function buttonSwitch(statusParam) {
		const { FOUND, SUCCESS } = statusEnum;
		switch (statusParam) {
			case FOUND:
			case SUCCESS:
				return (
					<Button>
						<Link to={`read/${videoId}`}>Next</Link>
					</Button>
				);
			default:
				return <Button onClick={() => handleSubmit(inputUrl)}>Submit</Button>;
		}
	}

	return (
		<Layout>
			<Header>
				<NavBar />
			</Header>
			<h1>Upload</h1>
			<hr />
			<InputGroup>
				<Input
					type='text'
					placeholder='YouTube URL'
					value={inputUrl}
					onChange={(e) => handleInput(e)}
				/>
				<InputGroupAddon addonType='append'>
					{buttonSwitch(status)}
				</InputGroupAddon>
			</InputGroup>

			<hr />
			{messageSwitch(status)}
		</Layout>
	);
}

// helper functions
function validateUrl(url) {
	// const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
	const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/;
	return regex.test(url);
}

function getVideoId(url) {
	// const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	const ytRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
	return url.match(ytRegex)[1];
}
