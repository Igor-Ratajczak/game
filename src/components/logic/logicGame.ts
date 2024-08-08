interface Board {
  name: string
  row: number[]
  col: string[]
}

interface Direction {
  start: number[]
  move: number
}
// Array of winning combinations
const winningCombinations: Array<number>[] = []

// Direction array for winning combinations
const direction: Direction[] = [
  {
    start: [0, 1, 2, 3, 16, 17, 18, 19, 32, 33, 34, 35, 48, 49, 50, 51],
    move: 4,
  },
  {
    start: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60],
    move: 1,
  },
  { start: [0, 16, 32, 48], move: 5 },
  { start: [3, 19, 35, 51], move: 3 },
  { start: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], move: 16 },
  { start: [0, 4, 8, 12], move: 17 },
  { start: [3, 7, 11, 15], move: 15 },
  { start: [0], move: 21 },
  { start: [3], move: 19 },
  { start: [12], move: 13 },
  { start: [15], move: 11 },
]

// Board array
export const board: Board[][] = [
  [{ name: 'A', row: [1, 2, 3, 4], col: ['a', 'b', 'c', 'd'] }],
  [{ name: 'B', row: [1, 2, 3, 4], col: ['a', 'b', 'c', 'd'] }],
  [{ name: 'C', row: [1, 2, 3, 4], col: ['a', 'b', 'c', 'd'] }],
  [{ name: 'D', row: [1, 2, 3, 4], col: ['a', 'b', 'c', 'd'] }],
]

/**
 * Function to create all winning combinations
 * @returns Returns all winning combinations
 */
export const getWinningCombinations = (): Array<number>[] => {
  // if winningCombinations array is empty
  if (winningCombinations.length === 0) {
    // for each item in direction array for winning combinations
    for (const dir of direction) {
      // for each item in dir.start
      dir.start.forEach((start) => {
        const move = dir.move
        // push all winning combinations to winningCombinations array
        winningCombinations.push([
          start,
          start + move,
          start + move * 2,
          start + move * 3,
        ])
      })
    }
  }
  // return all winning combinations
  return winningCombinations
}

/**
 * Function to check if a player has won
 * @param board Actual state of the board
 * @param number Index which represents the move
 * @param id Identifier of the player
 * @param depth Depth of the algorithm minmax
 * @returns Returns move and score or if tie return tie or if not win and tie return null.
 */
export const checkWinner = (
  board: string[],
  number: number,
  id: string,
  depth: number
): { move: string | number | null; score: number } => {
  // for each winning combination
  for (const combination of getWinningCombinations()) {
    // if all cells combination is equal to id
    if (
      board[combination[0]] === id &&
      board[combination[1]] === id &&
      board[combination[2]] === id &&
      board[combination[3]] === id
    ) {
      // if all cells combination is equal innerHtml
      if (
        board[combination[0]] === board[combination[1]] &&
        board[combination[1]] === board[combination[2]] &&
        board[combination[2]] === board[combination[3]]
      ) {
        // if combination is equal number
        if (
          combination[0] === number ||
          combination[1] === number ||
          combination[2] === number ||
          combination[3] === number
        ) {
          // return move and score
          return { move: number, score: depth }
        }
      }
    }
  }

  // if all cells are filled and no one won
  if (board.every((cell) => cell !== '')) {
    // return tie
    return { move: 'tie', score: 0 }
  }
  // return null
  return { move: null, score: 0 }
}
