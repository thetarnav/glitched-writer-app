import startCase from 'lodash.startcase'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Tab } from './types'

// define your typings for the store state
export interface State {
	/**
	 * List of available tabs, in camelCase
	 */
	tabs: Tab[]
	/**
	 * index of opened Tab
	 *
	 * -1 when none is open
	 */
	openTab: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	state: {
		tabs: ['options', 'presets', 'queue', 'about'],
		openTab: -1,
	},
	getters: {
		openTabName: ({ openTab, tabs }, { isTabOpen }) =>
			isTabOpen ? tabs[openTab] : null,
		openTabCapital: (state, { openTabName }) => startCase(openTabName),
		isTabOpen: ({ openTab, tabs }) => (tab?: Tab | number) => {
			if (tab === undefined) return openTab !== -1
			if (typeof tab === 'number') return openTab === tab
			return tabs[openTab] === tab
		},
	},
	mutations: {
		setTab(state, tab: Tab | number) {
			if (typeof tab === 'number') state.openTab = tab
			else state.openTab = state.tabs.findIndex(name => name === tab)
		},
	},
	actions: {
		toggleTab({ commit, state, getters: { isTabOpen } }, tab: Tab | number) {
			if (state.openTab !== -1 && isTabOpen(tab)) commit('setTab', -1)
			else commit('setTab', tab)
		},
	},
})

// define your own `useStore` composition function
export function useStore() {
	return baseUseStore(key)
}
