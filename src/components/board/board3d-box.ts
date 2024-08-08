import { ref, Ref } from 'vue'

interface Line {
  id: number
  points: Array<[number, number, number]>
}

export interface Lines {
  lines: Line[]
}

/**
 * Creates an array of lines for a 3D box. Each line is defined by its id and points.
 * The lines are divided into four walls: front, left, back, and right.
 * Each wall has three lines: two vertical lines and two horizontal lines.
 * The lines are created for each wall and appended to the lines array.
 * The lines array is then pushed into the lines array.
 *
 * @return {Lines[]} An array of lines for a 3D box.
 */
export const createLines = () => {
  let lines: Lines[] = []
  for (let wallIndex = 0; wallIndex < 4; wallIndex++) {
    let linesArray: Line[] = []

    for (let i = 0; i < 3; i++) {
      switch (wallIndex) {
        case 0: // Front wall
          // vertical lines
          linesArray.push({
            id: wallIndex * 6 + i,
            points: [
              [-2, -1 + i, 2.1],
              [2, -1 + i, 2.1],
            ],
          })
          // horizontal lines
          linesArray.push({
            id: wallIndex * 6 + i + 3,
            points: [
              [-1 + i, -2, 2.1],
              [-1 + i, 2, 2.1],
            ],
          })
          break
        case 1: // Left wall
          // vertical lines
          linesArray.push({
            id: wallIndex * 6 + i,
            points: [
              [-2.1, -2, -1 + i],
              [-2.1, 2, -1 + i],
            ],
          })
          // horizontal lines
          linesArray.push({
            id: wallIndex * 6 + i + 3,
            points: [
              [-2.1, -1 + i, -2],
              [-2.1, -1 + i, 2],
            ],
          })
          break
        case 2: // Back wall
          // vertical lines
          linesArray.push({
            id: wallIndex * 6 + i,
            points: [
              [-2, -1 + i, -2.1],
              [2, -1 + i, -2.1],
            ],
          })
          // horizontal lines
          linesArray.push({
            id: wallIndex * 6 + i + 3,
            points: [
              [-1 + i, -2, -2.1],
              [-1 + i, 2, -2.1],
            ],
          })
          break
        case 3: // Right wall
          // vertical lines
          linesArray.push({
            id: wallIndex * 6 + i,
            points: [
              [2.1, -2, -1 + i],
              [2.1, 2, -1 + i],
            ],
          })
          // horizontal lines
          linesArray.push({
            id: wallIndex * 6 + i + 3,
            points: [
              [2.1, -1 + i, -2],
              [2.1, -1 + i, 2],
            ],
          })
          break
        default:
          break
      }
    }

    lines.push({
      lines: linesArray,
    })
  }
  return lines
}

export interface Box {
  width: number
  height: number
  depth: number
  x: number
  y: number
  z: number
  text: string
  color: string | null
  isClicked: boolean
  isHovered: boolean
}
const createBox = () => {
  let box: Ref<Box[]> = ref([])
  for (let wallIndex = 0; wallIndex < 4; wallIndex++) {
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        let width = 1,
          height = 1,
          depth = 1,
          x = 0,
          y = 0,
          z = 0
        switch (wallIndex) {
          // Front wall
          case 0:
            x = -1.5 + columnIndex
            y = 1.5 - rowIndex
            z = 2
            depth = 0.1
            break
          // Left wall
          case 1:
            x = -2.04
            y = 1.5 - rowIndex
            z = -1.5 + columnIndex
            width = 0.1
            break
          // Back wall
          case 2:
            x = 1.5 - columnIndex
            y = 1.5 - rowIndex
            z = -2
            depth = 0.1
            break
          // Right wall
          case 3:
            x = 2.04
            y = 1.5 - rowIndex
            z = 1.5 - columnIndex
            width = 0.1
            break
          default:
            break
        }
        box.value.push({
          width,
          height,
          depth,
          x,
          y,
          z,
          text: '',
          color: null,
          isClicked: false,
          isHovered: false,
        })
      }
    }
  }
  return box
}
export const board = createBox()
