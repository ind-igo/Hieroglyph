<script>
  import Icon from 'svelte-awesome/components/Icon.svelte';
  import { twitter } from 'svelte-awesome/icons';
</script>

<nav class="flex justify-between text-md">
  <div class="relative pl-3">
    <a class="inline-block p-3" rel="prefetch" href="/">Home</a>
    <a class="inline-block p-3" rel="prefetch" href="/about">About</a>
  </div>
  <button type="button" class="p-3">
    <a href="https://us7.list-manage.com/survey?u=0690d6b292d96a936376ab614&id=5eb8b1ef9a">
      Take this survey and help us improve Hieroglyph 😁
    </a>
  </button>
  <div class="flex items-center pr-3">
    <a href="https://twitter.com/HieroglyphApp">
      <Icon data={twitter} class="mr-3 mt-3 h-6 w-6" />
    </a>
  </div>
</nav>