<script lang="ts">
import { defineComponent } from 'vue'
import { presets } from 'glitched-writer'
import SwitchButton from '../common/SwitchButton.vue'
import IconButton from '../common/IconButton.vue'
import Button from '../common/Button.vue'
export default defineComponent({
	components: { SwitchButton, IconButton, Button },
	name: 'Presets',
	methods: {
		closeTab() {
			this.$store.commit('setTab', -1)
		},
		setActiveIndex(index) {
			this.activeIndex = index
			console.log(this.activeIndex)
		},
		setOpenIndex(index) {
			this.openIndex = index
		},
	},
	setup() {},
	data: function () {
		return {
			openIndex: 0,
			activeIndex: 0,
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
			:class="{ 'details-hidden': activeIndex !== index }"
		>
			<div class="preset-header">
				<h6>{{ name }}</h6>
				<div class="buttons">
					<switch-button
						class="input boolean"
						:modelValue="openIndex === index ? true : false"
						@click="setOpenIndex(index)"
					/>
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
