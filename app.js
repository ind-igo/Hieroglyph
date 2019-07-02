// import axios from 'axios';

// Globals
let videoVisible = false;

// DOM elements
const submitButtonElement = document.getElementById('submit-button');
const transcriptElement = document.getElementById('transcript');
const iframeElement = document.getElementById('youtubeiframe');
const button2Element = document.getElementById('button2');
const youtubeUrlElement = document.getElementById('youtube-url');

// Fetch transcript on submit
submitButtonElement.addEventListener('click', e => submitVideo(e));
button2Element.addEventListener('click', e => showHide(e));

// =========
// Functions
// =========

// Make an HTTP POST Request
async function getTranscript(url) {
	const awsUrl =
		'https://3iy19oh41a.execute-api.us-east-1.amazonaws.com/test/transcribe';

	const response = await fetch(awsUrl, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({ url })
	});

	// const response = await axios.post(awsUrl, { url });

	return response.json();
}

function submitVideo(e) {
	e.preventDefault();
	let youtubeUrl = youtubeUrlElement.value; // will be state eventually
	const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

	if (!youtubeRegex.test(youtubeUrl)) {
		// was showError() & clearTranscriptError()
		youtubeUrlElement.style.color = 'red';
		youtubeUrlElement.style.borderColor = 'red';
		transcriptElement.innerHTML = 'There is an error in your Youtube URL';
	} else {
		// make post request to AWS app
		getTranscript(youtubeUrl)
			.then(data => {
				transcriptElement.innerHTML = data.body;
			})
			.catch(err => console.log(err));

		youtubeUrlElement.style.color = '';
		youtubeUrlElement.style.borderColor = '#D1D1D1';
		submitButtonElement.style.color = '';
	}
}

// Insert Youtube video and show/hide button
function showHide(e) {
	let url = youtubeUrlElement.value;

	// if visible, then
	if (videoVisible) {
		iframeElement.style.display = 'none';
		button2Element.innerText = 'Show Youtube Video';
	} else {
		showVideo(url);
	}

	// toggleVideoButton
	videoVisible = !videoVisible;
	e.preventDefault();
}

// helper function for showVideo
function getVideoIdParameter(url) {
	console.log(`parameter=${url}`);
	url = url.replace(/(>|<)/gi, '');
	console.log(`replace ${url}`);
	// url = url.split(' ');
	url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	console.log(url);

	let ID = '';
	if (url[2] !== undefined) {
		ID = url[2].split(/[^0-9a-z_\-]/i);
		console.log(`ID=${ID}`);
		ID = ID[0];
	} else {
		ID = url;
	}
	return ID;
}

// helper function for button2Element event function
function showVideo(fullUrl) {
	let rightUrl = getVideoIdParameter(fullUrl); // all it is doing in extracting v= parameter & placing it in embedded iframe

	// Required for YouTube iframe to work
	iframeElement.src = `https://www.youtube.com/embed/${rightUrl}`;
	iframeElement.style.display = 'inline-block';
	iframeElement.allow =
		'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
	button2Element.innerText = 'Hide Youtube Video';
}
