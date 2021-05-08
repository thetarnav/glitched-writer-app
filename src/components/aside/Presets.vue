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
			v-for="(presetDetails, preset, index) in presets"
			class="preset aside-list--item"
			:key="preset"
			:class="{ 'details-hidden': !isPresetOpen(index) }"
			:style="{ '--list-delay': index * 0.05 + 's' }"
		>
			<div class="preset-header item-style">
				<h6>{{ preset }} :</h6>
				<div class="buttons">
					<CustomButton @click="apply(preset)" class="btn--apply"
						>Apply</CustomButton
					>
					<button @click="setActiveIndex(index)" class="btn--open">
						<inline-svg :src="`./svg/chevron.svg`" />
					</button>
				</div>
			</div>
			<div class="preset-details item-style">
				<div
					class="preset-details__row mono"
					v-for="(optionValue, option) in presetDetails"
					:key="option"
				>
					<span>{{ option }} :</span>
					<span>
						{{
							typeof optionValue === 'string'
								? `"${
										optionValue.length > 30
											? optionValue.substring(0, 30) + '&#8230;'
											: optionValue
								  }"`
								: optionValue
						}}
					</span>
				</div>
				<CustomButton
					leadingIcon="copy"
					class="btn--copy"
					@click="copy(preset)"
					>Copy options object</CustomButton
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
	@apply border-t border-gray;
	@apply flex flex-col items-stretch;

	&__row {
		@apply flex space-x-10 justify-between whitespace-nowrap overflow-hidden;
	}

	.btn--copy {
		@apply self-end mt-3 hidden lg:flex;
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
