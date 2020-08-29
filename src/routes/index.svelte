<script>
	"use strict";
	let videoUrl;
	let transcript;

	async function getTranscript(video_url) {
		const apiUrl = '/api/transcribe';

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-type': 'application/json'},
			body: JSON.stringify({ video_url })
		});

		return response.json();
	}

	async function submitVideoURL() {
		const ytRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

		console.log('is this working?')
		if(ytRegex.test(videoUrl)) {
			try {
				transcript = await getTranscript(videoUrl);
				console.log(transcript);
			} catch(err) {
				console.log(err)
			}
		} else {
			// TODO: Turn text and border of textbox red
			// TODO: Print out that there is an error
			console.log(`There is an error with the URL`)
		}
	}
</script>

<svelte:head>
	<title>Hieroglyph</title>
</svelte:head>

<body class="font-mono bg-gray-400">
  <div class="container mx-auto">
    <form id="url-form">
      <div>
        <input bind:value={videoUrl} type="text" placeholder="Insert Youtube Video URL" />
        <button on:click={submitVideoURL}>Submit</button>
      </div>
    </form>
	</div>
	
	<!-- Transcript header -->
	<div>
		<h5>Transcript</h5>
	</div>

	<!-- TODO create a transcript container component -->
	{#if !!transcript}
	<div>{transcript}</div>
	{/if}
</body>