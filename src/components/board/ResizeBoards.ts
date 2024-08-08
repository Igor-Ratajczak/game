import { useStore } from '../data/state'

const state = useStore()
let ht = state.resizeValue.value // current height
let y: number
let dy: number

// start resize
const startResize = (event: MouseEvent) => {
  y = event.screenY
}

// resize board height
const resize = (event: MouseEvent) => {
  dy = event.screenY - y
  y = event.screenY
  ht -= dy
  if (ht < 0) {
    ht = 0
  }
  if (ht < 750) {
    state.resizeValue.value = ht
  }
}

// stop resize
const stopResize = () => {
  document.body.removeEventListener('mousemove', resize)
  document.body.removeEventListener('mouseup', stopResize)
  document.body.removeEventListener('click', stopResize)
}

/**
 * Function to resize board
 * @param event Event of the mouse
 */
export const handleResize = (event: MouseEvent) => {
  startResize(event)
  document.body.addEventListener('mousemove', resize)
  document.body.addEventListener('mouseup', stopResize)
  document.body.addEventListener('click', stopResize)
}
