import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State as StoreState } from '../store'

declare module '@vue/runtime-core' {
	// declare your own store states
	interface State extends StoreState {}
	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<State>
	}
}
