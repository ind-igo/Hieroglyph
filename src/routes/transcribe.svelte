<script context="module">
  export async function preload({ params, query }) {
    const videoID = query.v;
    const res = await this.fetch(`/api/transcribe?v=${videoID}`);
    const transcript = await res.json();
    return { transcript }
  }
</script>

<script>
  import TranscriptInputForm from "../components/TranscriptInputForm.svelte";

  export let transcript;
</script>

<TranscriptInputForm />

<div class="pt-4"></div>
<div class="border border-gray-300 rounded-md px-2 shadow">
  {transcript.text}
</div>