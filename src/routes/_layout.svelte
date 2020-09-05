<script>
	import Nav from '../components/Nav.svelte';
</script>

<main>
	<Nav />
	<div class="max-w-3xl mx-auto pt-20">
		<slot></slot>
	</div>
</main>