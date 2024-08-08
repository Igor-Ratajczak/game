import { ref, Ref } from 'vue'

export type WindowsKeys = 'settings' | 'rules' | 'history' | 'saved-games'

interface WindowsState {
  opened: Ref<Array<WindowsKeys>>
  active: Ref<string>
}
export const windows: WindowsState = {
  opened: ref([]),
  active: ref(''),
}
