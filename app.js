// Globals
let videoVisible = false;

// DOM elements
const submitButtonElement = document.getElementById('submit-button');
const transcriptElement = document.getElementById('transcript');
const iframeElement = document.getElementById('youtubeiframe');
const button2Element = document.getElementById('button2');
const youtubeUrlElement = document.getElementById('youtube-url');

// Attach Event Listeners
submitButtonElement.addEventListener('click', e => submitVideoHandler(e));
button2Element.addEventListener('click', e => showButtonHandler(e));

// =========
// Video Transcript Event
// =========

// Handler for showing or hiding video when clicking show/hide button
function submitVideoHandler(e) {
	e.preventDefault();
	let youtubeUrl = youtubeUrlElement.value;
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

// Helper fuction for sending POST Request for transcript from AWS
async function getTranscript(url) {
	const awsUrl =
		'https://3iy19oh41a.execute-api.us-east-1.amazonaws.com/test/transcribe';

	const response = await fetch(awsUrl, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({ url })
	});

	return response.json();
}

// =========
// Show Video Event
// =========

// Handler for showing or hiding video when clicking show/hide button
function showButtonHandler(e) {
	let url = youtubeUrlElement.value;

	if (videoVisible) {
		hideVideo();
	} else {
		showVideo(url);
	}

	videoVisible = !videoVisible;
	e.preventDefault();
}

// helper function for showButtonHander()
function showVideo(url) {
	const videoId = getVideoIdParameter(url); // all it is doing in extracting v= parameter & placing it in embedded iframe

	iframeElement.src = `https://www.youtube.com/embed/${videoId}`; // set correct src
	iframeElement.style.display = 'inline-block'; // display it
	iframeElement.allow =
		'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
	button2Element.innerText = 'Hide Youtube Video';
}

// helper function for showVideo()
function getVideoIdParameter(url) {
	url = url.replace(/(>|<)/g, ''); // take out tags
	url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

	// example: url = ["https://www.youtube.com/watch?", "v=", "EY6q5dv_B-o"]
	if (url[2]) {
		url = url[2].split(/[^0-9a-z_\-]/i)[0]; // split where it is not [0-9a-z\-]. Outputs as array
	}
	return url;
}

// helper function for showButtonHandler()
function hideVideo() {
	iframeElement.style.display = 'none';
	iframeElement.src = '';
	button2Element.innerText = 'Show Youtube Video';
}
