<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'StateDropdown',
	setup() {},
	methods: {
		toggleDropMenu() {
			console.log('clicked')
			this.isActive = !this.isActive
			console.log(this.isActive)
			this.arrow = this.isActive ? 'rotate(180deg)' : 'rotate(0deg)'
		},
	},
	data: function () {
		return {
			isActive: false,
			arrow: '',
		}
	},
})
</script>

<template>
	<div class="state-dropdown">
		<div class="dropdown-header">
			<div class="title">GW State</div>
			<IconButton
				icon="chevron_down"
				:style="{ transform: arrow }"
				@click="toggleDropMenu()"
			/>
		</div>
		<ul class="dropdown-list" :class="{ hidden: !isActive }">
			<li>v 2.0.22</li>
			<li>State: typing</li>
			<li>Pause</li>
			<li>Progress: 34%</li>
			<li>6 Ghosts</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.state-dropdown {
	@apply hidden w-[380px] md:block;
}
.dropdown-header {
	@apply flex bg-gray-50 items-center justify-between p-5 border-b-2 border-gray-300;
}
.dropdown-list {
	@apply p-5 bg-gray-50;
}
</style>
