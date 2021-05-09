<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { finishEmitter } from '../../../modules/event-bus'
import GlitchedWriter from 'vue-glitched-writer'
import { presets } from 'glitched-writer'

interface Log {
	text: string
	id: number
}

export default defineComponent({
	components: {
		GlitchedWriter,
	},
	setup() {
		const logs: Ref<Log[]> = ref([])
		let lastId = -1

		finishEmitter.listen(text => {
			if (!text) return
			logs.value.unshift({
				text: text.trim(),
				id: ++lastId,
			})
			logs.value.length > 20 && logs.value.pop()
		})

		return {
			logs,
			options: { ...presets.terminal, interval: [35, 40], html: true },
		}
	},
})
</script>

<template>
	<transition-group tag="ul" class="logs">
		<li v-for="{ text, id } in logs" :key="id" class="mono">
			<GlitchedWriter :text="text" :options="options" appear />
		</li>
	</transition-group>
</template>

<style lang="scss" scoped>
@import '../../../assets/scss/utils/variables';
.logs {
	@apply fixed left-6 lg:left-8;
	top: $v-position;
	@apply text-2;
	@apply flex flex-col space-y-2;
	@apply h-60 pl-4 -ml-4 overflow-hidden;

	@apply transition-base duration-500;

	&:after {
		content: '';
		@apply absolute inset-x-0 bottom-px h-18 bg-gradient-to-t from-0 to-transparent;
	}

	&:before {
		content: '';
		@apply absolute left-4 right-0 bottom-0 h-px bg-2;
	}
}

li {
	@apply relative w-40 min-h-[1rem] flex-shrink-0;
	transition: all 0.8s ease;

	&:before {
		content: '';
		@apply absolute bg-1 w-2 h-px right-full top-2 mr-1;
	}
}

.tab-open .logs {
	@apply opacity-0 transform -translate-x-20;
}
</style>

<style lang="scss">
.logs li {
	.glitched-writer * {
		font-weight: 500 !important;
		font-style: normal !important;
		text-size: 0.75rem !important;
	}
	.gw-writing {
		&:after {
			content: '_';
		}
	}
}
</style>
