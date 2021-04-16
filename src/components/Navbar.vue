<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {},
})
</script>

<template>
	<nav class="navbar">
		<!-- Logo -->
		<div class="logo"></div>
		<!-- Tabs -->
		<div class="tabs flex">
			<a class="tab" href="#">Options</a>
			<a class="tab" href="#">Presets</a>
			<a class="tab" href="#">Queue</a>
			<a class="tab" href="#">About</a>
		</div>
		<!-- Empty space -->
		<div class="empty"></div>
	</nav>
</template>

<style lang="scss" scoped>
.navbar {
	@apply w-screen p-2 flex justify-center bg-gray-100;
}
.tab {
	@apply p-2 font-bold;
}
</style>
