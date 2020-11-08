<script>
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import { twitter } from 'svelte-awesome/icons';
  import TranscriptInputForm from '../components/TranscriptInputForm.svelte'
</script>

<nav class="flex justify-between p-3">
  <div>
    <img src="/logo_symbol.svg" alt="Hieroglyph" width="40" height="50"/>
  </div>
  <div class="">
    <TranscriptInputForm />
	</div>
  <div>
    <a class="inline-block" rel="prefetch" href="/about">About</a>
    <a href="https://twitter.com/HieroglyphApp">
      <span class="pr-2">Follow Us</span>
      <Icon data={twitter} class="h-6 w-6" />
    </a>
  </div>
</nav>