<template>
	<div class="wrapper">
		<a class="key-action mono">
			<span>(Space)</span>
			<span>Pause</span>
		</a>
		<a class="key-action mono">
			<span>(r)</span>
			<span>Reset</span>
		</a>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	@apply fixed md:static left-6 lg:left-8;
	@apply flex flex-col space-y-1 items-start md:items-end;
}

.key-action {
	> *:first-child {
		@apply mr-1;
	}
}
</style>
