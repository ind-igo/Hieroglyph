<script>
  import TranscriptDisplay from './TranscriptDisplay.svelte';
  import { goto } from '@sapper/app';

  let inputURL;
  let transcriptText;

  async function getTranscript(videoId_) {
    //const apiUrl = "api/transcribe";
    const apiUrl = "transcribe";
    const response = await fetch(`${apiUrl}?v=${videoId_}`);

    return response.json();
  }

  async function submitVideoURL() {
    // TODO regex does not take mobile links, and takes invalid youtube links
    const ytRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/

    try {
      if (!ytRegex.test(inputURL)) throw 'Bad URL';

      // Capture video ID from both regular link and share link
      const videoURL = new URL(inputURL);
      const videoID = videoURL.hostname.includes('youtu.be') ?
        videoURL.pathname.substring(1) :
        videoURL.searchParams.get('v');

      await goto(`/transcribe?v=${videoID}`)
    //const transcript = await getTranscript(videoID);
    //console.log(transcript);
    //transcriptText = transcript.text;
    } catch (err) {
      // TODO return red error somewhere, maybe flash
      console.log("Please enter a valid URL: " + err);
    }
  }
</script>

<img class="mx-auto mb-6" src="logo_banner.svg" alt="Hieroglyph" />
<form on:submit|preventDefault={submitVideoURL}>
  <div class="flex border border-gray-300 rounded-md p-2 shadow text-lg">
    <input bind:value={inputURL} class="flex-1 outline-none px-2" type="text" placeholder="Insert Youtube Link Here" />
    <button class="relative right-0 top-0 mx-1" type="submit">
      <svg
          class="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style="enable-background:new 0 0 56.966 56.966;"
          xml:space="preserve"
          width="512px"
          height="512px">
          <path
            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
            s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
            c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z
            M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
            s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
    </button>
  </div>
</form>

{#if !!transcriptText}
<TranscriptDisplay transcriptText=transcriptText/>
{/if}