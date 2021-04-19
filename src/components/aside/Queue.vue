<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'
import useQueue from '../../state/queue'

export default defineComponent({
	components: {
		draggable,
	},
	data() {
		return {
			dragOptions: {
				animation: 200,
				group: 'description',
				disabled: false,
				ghostClass: 'ghost',
			},
		}
	},
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
	},
	setup() {
		const { queue, reset } = useQueue()

		return {
			queue,
			reset,
		}
	},
})
</script>

<template>
	<draggable
		tag="ul"
		:list="queue"
		v-bind="dragOptions"
		class="list"
		handle=".drag-handle"
		item-key="id"
	>
		<template #item="{ element }">
			<li class="item">
				<auto-textarea v-model="element.text" class="textarea" />

				<i class="drag-handle">
					<inline-svg src="./svg/draggable.svg" />
				</i>
			</li>
		</template>
	</draggable>
	<div class="action-buttons">
		<IconButton icon="reload" class="reset" @click="reset" />
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>

<style lang="scss" scoped>
.list {
	@apply flex flex-col space-y-3;
}
.item {
	@apply relative h-auto text-gray-600;
	@apply transition-opacity;
}
.sortable-chosen {
	@apply opacity-60;
}

.textarea {
	@apply w-full p-3 pl-4 pr-14 rounded-md focus:text-gray-900;
}
.drag-handle {
	@apply absolute right-0 top-0 bottom-1 w-12 flex text-gray-400;
	cursor: move;

	svg {
		@apply m-auto;
	}
}
</style>
