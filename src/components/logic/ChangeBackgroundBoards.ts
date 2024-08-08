import { board } from '../board/board3d-box'
import { useStore } from '../data/state'

const state = useStore()
/**
 * Function to update the background color of the winning fields to the main color
 */
export const updateBackgroundColorOnWin = () => {
  const winningFields = state.winningFields.value
  if (winningFields.length > 0) {
    Array.from(
      document.querySelectorAll(`.main .rect`) as NodeListOf<HTMLElement>
    ).map((rect, index) => {
      winningFields.forEach((item) => {
        if (index === item) {
          // Update the background color of the winning fields in board 3D
          board.value[item].color = state.backgroundWin.value
          // Add the 'winning-field' class to the winning fields in board 2D
          rect.classList.add('winning-field')
        }
      })
    })
  }
}

/**
 * Function to reset the background color of the winning fields to the default color
 */
export const resetBackgroundColorOnBoard = () => {
  // Reset the background color of the winning fields in board 3D
  board.value.forEach((item) => {
    item.color = state.backgroundFields.value
  })
  // Remove the 'winning-field' class from the winning fields in board 2D
  document
    .querySelectorAll('.main .rect.winning-field')
    .forEach((rect) => rect.classList.remove('winning-field'))
}
