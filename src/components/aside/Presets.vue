<script lang="ts">
import { defineComponent } from 'vue'
import copyToCB from 'copy-to-clipboard'

import SwitchButton from '../common/SwitchButton.vue'
import IconButton from '../common/IconButton.vue'
import CustomButton from '../common/Button.vue'

import { presets, setOptions } from '../../modules/options'
import tabs from '../../modules/tabs'

export default defineComponent({
	components: { SwitchButton, IconButton, CustomButton },
	name: 'Presets',
	data() {
		return {
			presets,
			openPresets: [] as number[],
		}
	},
	methods: {
		closeTab() {
			tabs.tab = -1
		},
		setActiveIndex(index: number): void {
			if (this.isPresetOpen(index)) {
				const removeIndex = this.openPresets.indexOf(index)
				this.openPresets.splice(removeIndex, 1)
			} else this.openPresets.push(index)
		},
		isPresetOpen(index: number): boolean {
			return this.openPresets.includes(index)
		},
		copy(name: string) {
			copyToCB(JSON.stringify(presets[name]))
		},
		apply(name: string) {
			setOptions(presets[name])
		},
	},
})
</script>

<template>
	<div class="aside-list">
		<div
			v-for="(value, name, index) in presets"
			class="preset aside-list--item item-style"
			:key="name"
			:class="{ 'details-hidden': !isPresetOpen(index) }"
			:style="{ '--list-delay': index * 0.05 + 's' }"
		>
			<div class="preset-header">
				<h6>{{ name }}</h6>
				<div class="buttons">
					<CustomButton @click="apply(name)" class="btn--apply"
						>Apply</CustomButton
					>
					<button @click="setActiveIndex(index)" class="btn--open">
						<inline-svg :src="`./svg/chevron.svg`" />
					</button>
				</div>
			</div>
			<div class="preset-details">
				<div
					class="preset-details__row text-sm"
					:key="name"
					v-for="(value, name) in value"
				>
					<p>{{ name }}</p>
					<p class="max-w-[200px]">
						{{ typeof value === 'string' ? `"${value}"` : value }}
					</p>
				</div>
				<CustomButton icon="copy" class="btn--copy mt-4" @click="copy(name)"
					>Copy</CustomButton
				>
			</div>
		</div>
	</div>
	<div class="action-buttons">
		<IconButton icon="close" class="close" @click="closeTab" />
	</div>
</template>
<style lang="scss" scoped>
.preset-header {
	@apply flex justify-between items-center;
}
.buttons {
	@apply flex space-x-3;
}
.btn--open {
	@apply transform rotate-180;
}
.preset-details {
	@apply pt-2;
	.preset-details__row {
		@apply flex justify-between whitespace-nowrap overflow-hidden;
	}
}
.details-hidden {
	.btn--open {
		@apply transform rotate-0;
	}
	.preset-details {
		@apply hidden;
	}
}
</style>
