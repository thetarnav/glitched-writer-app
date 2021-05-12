<script lang="ts">
import { defineComponent } from 'vue'
import { writerStateAction } from '../../../modules/event-bus'

export default defineComponent({
	setup() {
		function togglePause() {
			writerStateAction.emit('togglePause')
		}

		function reset() {
			writerStateAction.emit('reset')
		}

		return {
			togglePause,
			reset,
		}
	},
})
</script>

<template>
	<div class="wrapper">
		<a @click="togglePause" class="key-action mono">
			<span>(Space)</span>
			<span>Pause</span>
		</a>
		<a @click="reset" class="key-action mono">
			<span>(r)</span>
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
</style>
