<script lang="ts">
import { defineComponent } from 'vue'
import useState from '../modules/state'

export default defineComponent({
	name: 'StateDropdown',
	setup() {
		return {
			...useState(),
		}
	},
	methods: {
		toggleDropMenu() {
			this.isOpen = !this.isOpen
			this.iconTransform = this.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
		},
	},
	data: function () {
		return {
			isOpen: false,
			iconTransform: '',
		}
	},
})
</script>

<template>
	<div class="state-dropdown">
		<div class="dropdown-header">
			<div class="title">Writer's state</div>
			<IconButton
				icon="chevron"
				:style="{ transform: iconTransform }"
				@click="toggleDropMenu()"
			/>
		</div>
		<ul class="dropdown-list" v-show="isOpen">
			<li>v 2.0.22</li>
			<li>State: "{{ state }}"</li>
			<li>Progress: {{ progress }}%</li>
			<li>{{ nGhosts }} Ghosts</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.state-dropdown {
	@apply absolute top-5 right-5 xl:top-12 xl:right-12  w-[340px] hidden md:block;
}
.dropdown-header {
	@apply flex bg-0 items-center justify-between p-3 border-b-2 border-1;
}
.dropdown-list {
	@apply p-3 bg-0;
}
</style>
