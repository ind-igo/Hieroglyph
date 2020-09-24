<script context="module">
  export async function preload({ params, query }) {
    try {
      const videoID = query.v;
      const res = await this.fetch(`/api/transcribe?v=${videoID}`);
      const transcript = await res.json();
      return { transcript }
    }
    catch(err) {
      console.log(err)
    }
  }
</script>

<script>
  import TranscriptInputForm from "../components/TranscriptInputForm.svelte";

  export let transcript;
</script>

<svelte:head>
	<title>Hieroglyph</title>
</svelte:head>

<TranscriptInputForm />

<div class="pt-4"></div>
<div class="border border-gray-300 rounded-md px-2 shadow">
  { transcript.text }
</div>