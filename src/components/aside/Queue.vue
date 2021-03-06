<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import useQueue from '../../modules/queue'
import tabs from '../../modules/tabs'

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
			tabs.tab = -1
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
	<transition name="slow-fade" appear>
		<draggable
			tag="ul"
			:list="queue"
			v-bind="dragOptions"
			class="aside-list"
			handle=".drag-handle"
			item-key="id"
		>
			<template #item="{ element }">
				<li class="aside-list--item no-appear">
					<auto-textarea
						v-model="element.text"
						class="textarea item-style"
					/>

					<i class="drag-handle">
						<inline-svg src="./svg/draggable.svg" />
					</i>
				</li>
			</template>
		</draggable>
	</transition>
	<div class="action-buttons">
		<IconButton icon="reload" class="reset" @click="reset" />
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/utils/mixins.scss';
.sortable-chosen {
	@apply opacity-60;
}

.aside-list {
	@apply space-y-3;
}

.textarea {
	@apply w-full pr-14 text-3;

	&:focus {
		@apply text-4;
	}
	&:focus,
	&:hover {
		outline: 1px theme('colors.3') solid;
	}
}
.drag-handle {
	@apply absolute right-0 top-0 bottom-1.5 w-12 flex text-2;
	cursor: move;

	svg {
		@apply m-auto fill-current text-gray-darkest;
	}

	&:hover {
		@apply lg:bg-2 lg:bg-opacity-20;
	}
}
</style>
