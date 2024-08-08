import { useStore, TemporaryHistory } from '../data/state'
import { showConfetti } from './CreateConfetti'
import { getWinningCombinations } from './logicGame'

const state = useStore()

/**
 * Function to check win if win return true
 */
export const checkGameOver: (temporary_history: TemporaryHistory[]) => {
  combination: number[]
} = (temporary_history: TemporaryHistory[]) => {
  if (temporary_history.length < 4) return { combination: [] }

  const winningCombinations = getWinningCombinations()

  for (const combination of winningCombinations) {
    const positions = combination.map((num) =>
      temporary_history.find((item) => item.position === num)
    )
    // Check if all items in positions have the same id
    const allSameId = positions.every((pos, _index, array) => {
      return pos !== undefined && array.every((p) => p?.id === pos.id)
    })

    if (positions.every((pos) => pos !== undefined) && allSameId) {
      state.winningFields.value = combination
      showConfetti()
      return { combination }
    }
  }

  return { combination: [] }
}

/**
 * Function to check tie if tie return true
 */
export const checkTie = () => {
  const board = Array.from(document.querySelectorAll('.main .rect')).map(
    (rect) => rect.innerHTML
  )
  for (const cell of board) {
    if (cell === '') {
      return false
    }
  }
  setHistory()
  return true
}
export const setHistory = () => {
  state.history.value.push({
    date: `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`,
    actualMove: state.temporaryHistory.value.length,
    winnerFields: state.winningFields.value,
    moves: state.temporaryHistory.value,
  })
  state.history.value = [...state.history.value]
  state.temporaryHistory.value = []
  localStorage.removeItem('temporary_history')
}
