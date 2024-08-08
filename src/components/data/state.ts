import { reactive, watch, toRefs } from 'vue'

export interface TemporaryHistory {
  id: string
  position: number
  move: number
}

export interface SaveGames {
  id: number
  title: string
  date: string
  actualMove: number
  moves: TemporaryHistory[]
}
interface History {
  date: string
  actualMove: number
  winnerFields: number[]
  moves: TemporaryHistory[]
}

interface Store {
  gameOver: boolean
  winningFields: number[]
  turnBoard3D: boolean
  turnBoard2D: boolean
  colorX: string
  colorO: string
  backgroundFields: string
  borderFields: string
  backgroundWin: string
  backgroundNewMove: string
  saveGames: SaveGames[][]
  temporaryHistory: TemporaryHistory[]
  history: History[]
  actualMove: number
  actualPlayer: string
  actualOpponent: string
  resizeValue: number
}

let store: Store | null = null

export const useStore = () => {
  if (store) return toRefs(store)

  const stateLocalStorage: Partial<Store> =
    JSON.parse(localStorage.getItem('store') as string) || {}

  const defaultState: Store = {
    gameOver: false,
    winningFields: [],
    turnBoard3D: true,
    turnBoard2D: true,
    colorX: '#ff0000',
    colorO: '#0000ff',
    backgroundFields: '#d3d3d3',
    borderFields: '#808080',
    backgroundWin: '#1aba1a',
    backgroundNewMove: '#ff59f4',
    saveGames: [],
    temporaryHistory: [],
    history: [],
    actualMove: 0,
    actualPlayer: 'x',
    actualOpponent: '',
    resizeValue: 450,
  }

  store = reactive({
    ...defaultState,
    ...Object.fromEntries(
      Object.entries(defaultState).map(([key, value]) => [
        key,
        stateLocalStorage[key as keyof Store] ?? value,
      ])
    ),
  })

  const saveStore = () => {
    const storeData = Object.fromEntries(
      Object.entries(store!).map(([key, value]) => [key, value])
    )
    localStorage.setItem('store', JSON.stringify(storeData))
  }

  watch(
    store,
    () => {
      saveStore()
    },
    { deep: true }
  )

  return toRefs(store)
}
