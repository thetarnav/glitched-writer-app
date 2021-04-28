<script lang="ts">
import { computed, defineComponent } from 'vue'
import { presets } from 'glitched-writer'
import SwitchButton from '../common/SwitchButton.vue'
import IconButton from '../common/IconButton.vue'
import CustomButton from '../common/CustomButton'
import copyToCB from 'copy-to-clipboard'

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

		setActiveIndex(index) {
			if (this.isPresetOpen(index)) this.activeIndex = -1
			else this.activeIndex = index
		},
		isPresetOpen(index?: number) {
			if (index === undefined) return this.activeIndex !== -1
			return this.activeIndex === index
		},
		setOpenIndex(index) {
			this.openIndex = index
		},
		copy(name: string) {
			//@ts-ignore
			copyToCB(JSON.stringify(presets[name]))
		},
	},
	setup() {},
	data: function () {
		return {
			openIndex: null,
			activeIndex: -1,
			Presets: presets,
			iconTransform: '',
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
				<h6>{{ name }} {{ activeIndex }} {{ isPresetOpen(index) }}</h6>
				<div class="buttons">
					<CustomButton class="btn--apply">Apply</CustomButton>
					<button @click="setActiveIndex(index)">
						<inline-svg :src="`./svg/chevron.svg`" />
					</button>
				</div>
			</div>
			<div
				:key="name"
				v-for="(value, name, index) in value"
				class="preset-details"
			>
				<div class="preset-details__row">
					<p>{{ name }}</p>
					<p>{{ value }}</p>
				</div>
			</div>
			<CustomButton class="btn--copy" @click="copy(name)">Copy</CustomButton>
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
