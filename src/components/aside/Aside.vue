<script lang="ts">
import { defineComponent } from 'vue'
import { useStore, Getters } from '../../store'
import EndingText from './EndingText.vue'
import Options from './Options.vue'

export default defineComponent({
	name: 'Aside',
	components: {
		EndingText,
		Options,
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
				<Options />
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
