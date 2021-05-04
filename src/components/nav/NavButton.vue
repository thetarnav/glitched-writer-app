<script lang="ts">
import { computed, defineComponent } from 'vue'
import { startCase } from 'lodash'
import tabs from '../../modules/tabs'

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true,
		},
	},
	setup({ name }) {
		const { toggleTab, isTabOpen } = tabs

		return {
			toggleTab: () => toggleTab(name),
			isActive: computed(() => isTabOpen(name)),
			capitalName: startCase(name),
		}
	},
})
</script>

<template>
	<button class="nav-button" :class="{ active: isActive }" @click="toggleTab">
		<div class="content">
			<inline-svg :src="`./svg/${name}.svg`" class="icon" />
			<span class="text caption">
				{{ capitalName }}
			</span>
		</div>
		<div class="cover">
			<inline-svg :src="`./svg/${name}.svg`" class="icon" />
			<span class="text caption">
				{{ capitalName }}
			</span>
		</div>
	</button>
</template>

<style lang="scss" scoped>
.nav-button {
	@apply relative bg-1 text-gray-darkest;
	@apply md:w-32 md:h-10;
}

.cover,
.content {
	@apply flex flex-col space-y-0.5 justify-center items-center;
	@apply md:flex-row md:justify-start md:space-y-0 md:space-x-2 md:px-3;
}
.content {
	@apply md:absolute md:inset-0;
}
.cover {
	@apply absolute inset-0 bg-3 text-0;
	clip-path: polygon(
		0 calc(100% - theme(spacing.1)),
		100% calc(100% - theme(spacing.1)),
		100% 100%,
		0% 100%
	);
	@apply transition-clip-path;
}

.icon {
	@apply w-5;
}

.active {
	.cover {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
	}

	&:focus {
		outline: 0;
	}
}
</style>
