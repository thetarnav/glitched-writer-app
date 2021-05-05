<script lang="ts">
import { computed, defineComponent } from 'vue'
import { presets } from '../../modules/options'
import SwitchButton from '../common/SwitchButton.vue'
import IconButton from '../common/IconButton.vue'
import CustomButton from '../common/CustomButton'
import copyToCB from 'copy-to-clipboard'
import { setOptions } from '../../modules/options'

Object.keys(presets).forEach(preset => {
	const acutalPreset = presets[preset]
	if (typeof acutalPreset.oneAtATime === 'boolean') {
		if (acutalPreset.oneAtATime === true) acutalPreset.oneAtATime = 1
		else acutalPreset.oneAtATime = 0
	}
})

export default defineComponent({
	components: { SwitchButton, IconButton },
	name: 'Presets',
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},

		setActiveIndex(index: number) {
			if (this.isPresetOpen(index)) {
				const eleIndex = this.listOfIndex.indexOf(index)
				if (eleIndex > -1) {
					this.listOfIndex.splice(eleIndex, 1)
				}
			} else this.listOfIndex.push(index)
		},
		isPresetOpen(index?: number) {
			if (this.listOfIndex.includes(index)) return true
			return false
		},
		copy(name: string) {
			//@ts-ignore
			copyToCB(JSON.stringify(presets[name]))
		},
		apply(name: string) {
			setOptions(presets[name])
		},
	},
	setup() {},
	data: function () {
		return {
			Presets: presets,
			iconTransform: '',
			listOfIndex: [],
		}
	},
})
</script>

<template>
	<div class="aside-list">
		<div
			v-for="(value, name, index) in Presets"
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
					<button @click="setActiveIndex(index)">
						<inline-svg :src="`./svg/chevron.svg`" />
					</button>
				</div>
			</div>
			<div class="preset-details">
				<div
					class="preset-details__row"
					:key="name"
					v-for="(value, name, index) in value"
				>
					<p>{{ name }}</p>
					<p>{{ value }}</p>
				</div>
				<CustomButton icon="copy" class="btn--copy" @click="copy(name)"
					>Copy</CustomButton
				>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.preset-header {
	@apply flex justify-between  p-1;
}
.buttons {
	@apply flex;
	button {
		@apply ml-3 transform rotate-180;
	}
}
.preset-details {
	@apply pt-2;
	.preset-details__row {
		@apply flex justify-between whitespace-nowrap overflow-hidden;
	}
}
.details-hidden {
	.buttons button {
		@apply transform rotate-0;
	}
	.preset-details {
		@apply hidden;
	}
}
</style>
