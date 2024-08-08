import { useStore } from '../data/state'
import { checkGameOver } from '../logic/checkIsEndGame'
import { getBestMove } from './minmax'
const state = useStore()

/**
 * Executes a bot move on the given board.
 *
 * @param {string[]} board - The current state of the game board.
 * @return {Promise<void>} - A promise that resolves when the bot move is executed.
 */
export const bot = async (board: string[]) => {
  // get best move for bot
  const bestMove = getBestMove(
    board,
    state.actualPlayer.value === 'x' ? 'o' : 'x'
  )
  // get element of best move
  const bestRect = document.querySelector(
    `.rect[data-id="${bestMove}"]`
  ) as HTMLDivElement

  // check if best move is not empty and game is not over
  if (bestRect && !state.gameOver.value) {
    // add new move to temporary history
    state.temporaryHistory.value.push({
      id: state.actualPlayer.value,
      position: bestMove,
      move: state.actualMove.value + 1,
    })
    state.actualMove.value += 1

    const check_win = checkGameOver(state.temporaryHistory.value)
    if (check_win.combination.length > 0) state.gameOver.value = true
    else {
      // change player
      state.actualPlayer.value = state.actualPlayer.value === 'x' ? 'o' : 'x'
    }
  }
}
