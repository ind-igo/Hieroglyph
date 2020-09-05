<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`transcribe.json`)
      .then(res => res.json())
      .then({ transcript })
  }
</script>