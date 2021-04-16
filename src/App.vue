<template>
	<Navbar />
	Hello World
	<div class="count">{{ count }}</div>
	<button @click="increment">Increment</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'
import { useStore } from './store'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
	},
	setup() {
		const store = useStore()

		return {
			increment: () => store.commit('increment'),
			count: computed(() => store.state.count),
		}
	},
})
</script>

<style src="./scss/base.scss" lang="scss" />
