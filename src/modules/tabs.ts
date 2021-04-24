import { startCase } from 'lodash'
import { ref, computed } from 'vue'

export type TabName = 'options' | 'presets' | 'queue' | 'about'

class Tabs {
	// PROPERTIES
	tabs: TabName[] = ['options', 'presets', 'queue', 'about']
	openTab = ref(-1)

	// GETTERS
	openTabName = computed(() => this.tabs[this.openTab.value] ?? null)
	openTabCapital = computed(() => startCase(this.openTabName.value ?? ''))
	openTabIndex = computed(() => tabs.openTab.value)

	// SETTERS
	set tab(tab: string | number) {
		if (typeof tab === 'number') tabs.openTab.value = tab
		else
			tabs.openTab.value = tabs.tabs.findIndex(
				(name: TabName) => name === tab,
			)
	}

	// METHODS
	isTabOpen(tab?: string | number): boolean {
		if (tab === undefined) return tabs.openTab.value !== -1
		if (typeof tab === 'number') return tabs.openTab.value === tab
		return tabs.openTabName.value === tab
	}
	toggleTab(tab: string | number) {
		if (tabs.openTabIndex.value !== -1 && tabs.isTabOpen(tab)) tabs.tab = -1
		else tabs.tab = tab
	}
}

const tabs = new Tabs()

export default tabs
