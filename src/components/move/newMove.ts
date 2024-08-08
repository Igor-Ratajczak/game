import { useStore } from '../data/state'
import { board } from '../board/board3d-box'
import { setHistory } from '../logic/checkIsEndGame'

const state = useStore()
/**
 * Sets the text of the board at the last position in the temporary history to the id of the last move.
 */
export const setNewMove = () => {
  // Get the temporary history
  const temporaryHistory = state.temporaryHistory.value

  if (temporaryHistory.length === 0) return
  // Get the id and position of the last move
  const id = temporaryHistory[temporaryHistory.length - 1].id

  const position = temporaryHistory[temporaryHistory.length - 1].position

  // Set the text of the board at the last position to the id of the last move
  board.value.map(
    (item) =>
      (item.color =
        item.color === state.backgroundNewMove.value
          ? state.backgroundFields.value
          : item.color)
  )
  board.value[position].text = id
  board.value[position].color = state.backgroundNewMove.value

  Array.from(
    document.querySelectorAll(`.main .rect`) as NodeListOf<HTMLElement>
  ).map((rect, index) => {
    if (index === position) {
      rect.innerHTML = id
      rect.classList.add('checked')
      rect.classList.add('new-move')
      rect.classList.add(id === 'x' ? 'x' : 'o')
    } else {
      rect.classList.remove('new-move')
    }
  })
  // This function does not return anything
  checkIsEndGame()
}

/**
 * Checks if the game is over and updates the color of the winning fields.
 * If the game is not over, resets the color of all fields in the board array.
 *
 * @return {void}
 */
const checkIsEndGame = () => {
  // If the game is over, check if there are any winning fields
  if (state.gameOver.value) {
    const winningFields = state.winningFields.value
    if (winningFields.length > 0) {
      // Iterate over the winning fields and update their color to the background win color
      winningFields.forEach((item) => {
        // Update the background color of the winning fields in board 3D
        board.value[item].color = state.backgroundWin.value
      })
      Array.from(
        document.querySelectorAll(`.main .rect`) as NodeListOf<HTMLElement>
      ).map((rect, index) => {
        winningFields.forEach((item) => {
          if (index === item) {
            rect.classList.add('winning-field')
          }
        })
      })
    }
    setHistory()
  }
}
