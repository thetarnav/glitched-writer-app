<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'

export default defineComponent({
	components: {
		draggable,
	},
	setup() {
		const texts = [
				'Welcome',
				'To the Glitched Writer!',
				'An NPM Package for text writing animation.',
				'Test options and presets',
				'Create unique effects',
				'And Enjoy!',
			],
			list = ref(texts.map((text, id) => ({ text, id })))

		return { list }
	},
})
</script>

<template>
	<draggable tag="ul" :list="list" class="list" handle=".handle" item-key="id">
		<template #item="{ element }">
			<li class="item">
				<auto-textarea v-model="element.text" />
				<!-- <input type="text" v-model="element.text" /> -->

				<i class="drag-handle">
					<inline-svg src="./svg/draggable.svg" />
				</i>
				<!-- <i class="fa fa-times close" @click="removeAt(index)"></i> -->
			</li>
		</template>
	</draggable>
</template>
