<script lang="ts">
import { computed, defineComponent } from 'vue'
import { writerStateAction } from '../../../modules/event-bus'
import useState from '../../../modules/state'

export default defineComponent({
	setup() {
		const { state } = useState(),
			isPaused = computed(() => state.value === 'paused')

		function togglePause() {
			writerStateAction.emit('togglePause')
		}

		function reset() {
			writerStateAction.emit('reset')
		}

		window.addEventListener('keypress', e => {
			if (e.code === 'Space') {
				e.preventDefault()
				togglePause()
			} else e.code === 'KeyR' && reset()
		})

		return {
			togglePause,
			reset,
			isPaused,
		}
	},
})
</script>

<template>
	<div class="wrapper">
		<a @click="togglePause" class="key-action mono">
			<span class="key">(Space)</span>
			<span>{{ isPaused ? 'Play' : 'Pause' }}</span>
		</a>
		<a @click="reset" class="key-action mono">
			<span class="key">(r)</span>
			<span>Reset</span>
		</a>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	@apply fixed md:static left-6 lg:left-8;
	@apply flex flex-col space-y-1 items-start md:items-end;
}

.key-action {
	> *:first-child {
		@apply mr-1;
	}
}

.key {
	@apply hidden lg:inline;
}
</style>
