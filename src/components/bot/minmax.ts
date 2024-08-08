import { checkWinner } from '../logic/logicGame'

/**
 * Minimax algorithm
 * @param board Represents the current state of the game board
 * @param depth Indicates the depth of recursion (how many moves ahead to explore).
 * @param isMaximizing  A boolean flag; true if it’s the maximizing player’s turn, false otherwise
 * @param number The index of the board position being checked (the move being considered).
 * @param id  The player identifier (‘x’ or ‘o’).
 * @param alpha The best value that the maximizer can guarantee at or above the current level.
 * @param beta The best value that the minimizer can guarantee at or below the current level.
 * @returns The best move for the bot.
 */
const minimax = (
  board: string[],
  depth: number,
  isMaximizing: boolean,
  number: number,
  id: string,
  alpha: number = -Infinity,
  beta: number = Infinity
): { __number: number; score: number } => {
  // check if game is over for player
  const winPlayer = checkWinner(board, number, id === 'x' ? 'x' : 'o', depth)

  // check if winPlayer is not null
  if (winPlayer !== null) {
    // check if winPlayer move is equal to number
    if (winPlayer.move === number) {
      // return winPlayer score
      return { __number: winPlayer.move, score: winPlayer.score }
    }
  }
  // check if game is over for bot
  const winBot = checkWinner(board, number, id === 'x' ? 'o' : 'x', depth)

  // check if winBot is not null
  if (winBot !== null) {
    // check if winBot move is equal to number
    if (winBot.move === number) {
      // return winBot score
      return { __number: winBot.move, score: winBot.score }
    }
  }

  // check if depth is greater than 3
  if (depth > 3) {
    // return 0 score
    return { __number: 0, score: 0 }
  }
  if (isMaximizing) {
    // Maximizing player: try to maximize the score
    let bestMove = 0
    let bestScore = 0
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        // Make a move
        board[i] = id === 'x' ? 'x' : 'o'
        // Recursively call minimax for the next move
        let score = minimax(
          board,
          depth + 1,
          false,
          i,
          id === 'x' ? 'o' : 'x',
          alpha,
          beta
        )
        // Undo the move
        board[i] = ''
        // Update the best move and score
        if (score.__number !== 0 && score.score !== 0) {
          bestMove = score.__number
          bestScore = score.score
        }
        // Update alpha
        alpha = Math.max(alpha, score.__number)
        // Alpha-beta pruning
        if (beta <= alpha) {
          break
        }
      }
    }
    return { __number: bestMove, score: bestScore }
  } else {
    // Minimizing player: try to minimize the score
    let bestMove = 0
    let bestScore = 0
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        // Make a move
        board[i] = id === 'x' ? 'o' : 'x'
        // Recursively call minimax for the next move
        let score = minimax(
          board,
          depth + 1,
          true,
          i,
          id === 'x' ? 'x' : 'o',
          alpha,
          beta
        )
        // Undo the move
        board[i] = ''
        // Update the best move and score
        if (score.__number !== 0 && score.score !== 0) {
          bestMove = score.__number
          bestScore = score.score
        }
        // Update beta
        beta = Math.min(beta, score.__number)
        // Alpha-beta pruning
        if (beta <= alpha) {
          break
        }
      }
    }
    return { __number: bestMove, score: bestScore }
  }
}
/**
 * Gets the best move for the bot.
 * @param board Represents the current state of the game board
 * @param id  The player identifier (‘x’ or ‘o’).
 * @returns Returns the best move for the bot.
 */
export const getBestMove = (board: string[], id: string): number => {
  // best move array
  let bestMove = []
  let move = -1
  // for each all cells in board
  for (let i = 0; i < board.length; i++) {
    // if cell is empty
    if (board[i] === '') {
      // make a move
      board[i] = id
      // call minimax
      let score = minimax(board, 0, false, i, id)
      // undo the move
      board[i] = ''
      // if score is not 0 push score to bestMove
      if (score.__number !== 0) bestMove.push(score)
      move = i
    }
  }
  // if bestMove is not empty
  if (bestMove.length > 0) {
    // for each item in bestMove
    bestMove.forEach((item) => {
      // make a move
      board[item.__number] = id
      // check is the best move
      let score = minimax(board, 0, false, item.__number, id)
      // undo the move
      board[item.__number] = ''
      // if score is not 0 push score to bestMove
      if (score.__number !== 0) bestMove.push(score)
    })
    // sort the best move by score
    bestMove.sort((a, b) => a.score - b.score)
    // set move to first item in bestMove
    move = bestMove[0].__number
  }
  // return move
  return move
}
