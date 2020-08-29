<script>
  "use strict";
  let videoUrl;
  let transcriptText;
  //$: showTranscript = !!transcriptText;

  async function getTranscript(videoId_) {
    const apiUrl = 'api/transcribe';
    const response = await fetch(`${apiUrl}?v=${videoId_}`)

    return response.json();
  }

  async function submitVideoURL() {
    // TODO Test for youtube's share url: https://youtu.be/DORxM-QsUr0
    try {
      const videoId = new URL(videoUrl).searchParams.get('v')
      const transcript= await getTranscript(videoId);
      transcriptText = transcript.text;
      console.log("transcriptText is " + transcript.text)
    } catch(err) {
      // TODO return red error somewhere, maybe flash
      console.log('Please enter a valid URL')
    }
  }
</script>

<svelte:head>
  <title>Hieroglyph</title>
</svelte:head>

<body class="font-mono bg-gray-400">
  <div class="container mx-auto">
    <div>
      <input bind:value={videoUrl} type="text" placeholder="Insert Youtube Video URL" />
      <button on:click={submitVideoURL}>Submit</button>
    </div>
  </div>
  
  <!-- Transcript header -->
  <div>
    <h5>Transcript</h5>
  </div>

  <!-- TODO create a transcriptText container component -->
  {#if !!transcriptText}
  <div>{transcriptText}</div>
  {/if}
</body>