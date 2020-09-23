<script>
  import { prefetch, goto } from '@sapper/app';
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import { spinner, search } from 'svelte-awesome/icons';

  let inputURL;
  let invalidInput = false;
  let loading = false;
  $: inputBorder = invalidInput ? "border-red-600" : "border-gray-300";

  async function submitVideoURL() {
    // TODO regex does not take mobile links, and takes invalid youtube links
    const ytRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/

    try {
      invalidInput = false;
      if (!ytRegex.test(inputURL)) throw 'Bad URL';

      // Capture video ID from both regular link and share link
      const videoURL = new URL(inputURL);
      const videoID = videoURL.hostname.includes('youtu.be') ?
        videoURL.pathname.substring(1) :
        videoURL.searchParams.get('v');

      loading = true;
      goto(`/transcribe?v=${videoID}`);
    } catch (err) {
      invalidInput = true;
      console.log("Please enter a valid URL: " + err);
    }
  }
</script>

<a rel="prefetch" href="/">
  <img class="mx-auto mb-6" src="/logo_banner.svg" alt="Hieroglyph" />
</a>
<form on:submit|preventDefault={submitVideoURL}>
  <div class="flex border border-gray-300 rounded-md p-2 shadow text-lg {inputBorder}">
    <input bind:value={inputURL} class="flex-1 outline-none px-2" type="text" placeholder="Insert Youtube Link Here" />
    <button class="relative pr-1 pb-1" type="submit">
      {#if !loading}
        <Icon data={search} />
      {:else}
        <Icon data={spinner} spin />
      {/if}
    </button>
  </div>
</form>