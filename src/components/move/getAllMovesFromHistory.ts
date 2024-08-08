import { board } from '../board/board3d-box'
import { useStore } from '../data/state'

const state = useStore()
/**
 * Retrieves all moves from the temporary history and updates the game board accordingly.
 */
export const getAllMovesFromHistory = () => {
  const temporaryHistory = state.temporaryHistory.value
  if (temporaryHistory.length > 0) {
    // Loop through each move in the temporary history
    temporaryHistory.forEach((move, index) => {
      const id = move.id
      const position = move.position
      const rect = document.querySelectorAll('.main .rect')[position]

      // Set the background color of the latest move
      if (index === temporaryHistory.length - 1) {
        // set the background color of the board 3D
        board.value[position].color = state.backgroundNewMove.value
        // set the background color of the board 2D
        rect.classList.add('new-move')
      }
      // Set the text of the board 3D
      board.value[position].text = id

      // Set the text of the board 2D
      rect.innerHTML = id
      rect.classList.add('checked')
      rect.classList.add(move.id === 'x' ? 'x' : 'o')
    })
  }
}
