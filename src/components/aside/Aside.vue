<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { useStore, Getters } from '../../store'
import EndingText from './EndingText.vue'
const Options = defineAsyncComponent(() => import('./Options.vue'))
const Queue = defineAsyncComponent(() => import('./Queue.vue'))
const About = defineAsyncComponent(() => import('./About.vue'))

export default defineComponent({
	name: 'Aside',
	components: {
		EndingText,
		Options,
		Queue,
		About,
	},
	data() {
		return {}
	},
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
	},
	setup() {
		const store = useStore()

		return {
			capitalName: store.getters.openTabCapital as Getters['openTabCapital'],
			tabActions: store.getters.tabActions as Getters['tabActions'],
			tabName: store.getters.openTabName as Getters['openTabName'],
		}
	},
})
</script>

<template>
	<aside class="aside">
		<!-- Action Buttons -->
		<div class="action-buttons">
			<IconButton
				icon="reload"
				class="reset"
				v-if="tabActions.has('reset')"
			/>
			<IconButton icon="copy" class="copy" v-if="tabActions.has('copy')" />
			<IconButton icon="close" class="close" @click="closeTab" />
		</div>
		<!-- Headder -->
		<header>
			<h3>{{ capitalName }}</h3>
		</header>
		<!-- Content -->
		<div class="content-wrapper">
			<div class="content">
				<!-- <div class="input" v-for="n in 12" :key="n"></div> -->
				<Options v-if="tabName === 'options'" />
				<Queue v-else-if="tabName === 'queue'" />
				<About v-else-if="tabName === 'about'" />
				<!-- Ending Text -->
				<EndingText />
			</div>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
.aside {
	@apply bg-gray-100 flex flex-col;
}

header {
	@apply p-5;
}

.action-buttons {
	@apply fixed right-0 bottom-16 m-3 flex space-x-2;
	@apply md:absolute md:bottom-auto md:top-0;

	.copy {
		@apply hidden md:block;
	}
}

.content {
	@apply flex flex-col space-y-4 px-5 pb-12 overflow-hidden;

	&-wrapper {
		@apply overflow-y-scroll;
	}
}
</style>
