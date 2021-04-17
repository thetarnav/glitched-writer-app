import startCase from 'lodash.startcase'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Tab, TabAction } from './types'

// define your typings for the store state
export interface State {
	/**
	 * List of available tabs, in camelCase
	 */
	tabs: Tab[]
	tabActions: Map<Tab, Set<TabAction>>
	/**
	 * index of opened Tab
	 *
	 * -1 when none is open
	 */
	openTab: number
}

export interface Getters {
	openTabName: Tab | null
	openTabCapital: string
	isTabOpen: (tab?: Tab | number) => boolean
	tabActions: Set<TabAction>
	hasTabAction: (name: TabAction) => boolean
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	/**
	 * STATE
	 */
	state: {
		tabs: ['options', 'presets', 'queue', 'about'],
		tabActions: new Map([
			['options', new Set(['copy', 'reset'])],
			['presets', new Set()],
			['queue', new Set(['reset'])],
			['about', new Set()],
		]),
		openTab: -1,
	},
	/**
	 * GETTERS
	 */
	getters: {
		openTabName: ({ openTab, tabs }, { isTabOpen }): Getters['openTabName'] =>
			isTabOpen ? tabs[openTab] : null,
		openTabCapital: (state, { openTabName }): Getters['openTabCapital'] =>
			startCase(openTabName ?? ''),
		isTabOpen: ({ openTab, tabs }): Getters['isTabOpen'] => (
			tab?: Tab | number,
		) => {
			if (tab === undefined) return openTab !== -1
			if (typeof tab === 'number') return openTab === tab
			return tabs[openTab] === tab
		},
		tabActions: ({ tabActions }, { openTabName }): Getters['tabActions'] =>
			tabActions.get(openTabName as Tab) ?? new Set(),
	},
	/**
	 * MUTATIONS
	 */
	mutations: {
		setTab(state, tab: Tab | number) {
			if (typeof tab === 'number') state.openTab = tab
			else state.openTab = state.tabs.findIndex(name => name === tab)
		},
	},
	/**
	 * ACTIONS
	 */
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
