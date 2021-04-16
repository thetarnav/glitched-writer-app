<template>
	<aside class="aside">
		<header>
			<h3>Options</h3>
		</header>
		<div class="action-buttons">
			<IconButton icon="reload" />
			<IconButton icon="copy" />
			<IconButton icon="close" />
		</div>
	</aside>
</template>

<style lang="scss" scoped>
header {
	@apply p-5;
}
.action-buttons {
	@apply fixed right-0 bottom-16 m-3 flex space-x-2;
}
</style>
