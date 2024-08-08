<template>
  <div
    class="boards"
    :data-id="String($props.id)"
    :class="isMobile ? 'flex' : 'grid'"
  >
    <div v-for="n in board" :key="n[0].name" class="board-container">
      <b>{{ n[0].name }}</b>
      <div class="row">
        <p v-for="row in n[0].row" :key="row">{{ row }}</p>
      </div>
      <div class="col">
        <p v-for="col in n[0].col" :key="col">{{ col }}</p>
      </div>
      <div class="board">
        <div
          v-for="rect in 16"
          :key="rect"
          class="rect"
          @click="props.actionClick ? handleClick($event) : null"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref, watch, watchEffect } from 'vue'
  import { board } from '../logic/logicGame'
  import { useStore } from '../data/state'
  import { checkGameOver } from '../logic/checkIsEndGame'

  const state = useStore()
  const background_fields = state.backgroundFields
  const border_fields = state.borderFields
  const background_win = state.backgroundWin
  const background_new_move = state.backgroundNewMove
  const colorX = state.colorX
  const colorO = state.colorO

  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const isMobile = ref(false)

  const updateDimensions = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  window.addEventListener('resize', updateDimensions)

  watchEffect(() => {
    isMobile.value = width.value < height.value ? true : false
  })

  interface Moves {
    id: string
    position: number
    move: number
  }
  const props = defineProps<{
    moves: Moves[] | null
    actualMove: number
    id: number | string
    actionClick: boolean
  }>()
  /**
   * Function to set id to all rect on board
   */
  const setIdRect = () => {
    Array.from(
      document.querySelectorAll('.board .rect') as NodeListOf<HTMLDivElement>
    ).map((rect: HTMLDivElement, index: number) => {
      rect.setAttribute('data-id', String(index))
    })
  }

  /**
   * Sets the items in the board based on the provided moves.
   * @return {void}
   */
  const setItems = () => {
    Array.from(
      document.querySelectorAll(
        `.boards[data-id="${props.id}"] .rect`
      ) as NodeListOf<HTMLDivElement>
    ).map((rect: any, index) => {
      if (props.moves) {
        props.moves.forEach((move, i) => {
          if (i < props.actualMove) {
            if (rect) {
              if (index === move.position) {
                rect.innerHTML = move.id
                rect.classList.add(move.id === 'x' ? 'x' : 'o')
                // if (props.moves.length - 1 includes(move.position)) {
                //   rect.classList.add('winner')
                // }
              }
            }
          } else {
            if (index === move.position) {
              rect.innerHTML = ''
              rect.classList.remove('checked', 'winner', 'o', 'x')
            }
          }
        })
      }
    })
  }
  watch(
    () => props.actualMove,
    () => {
      setItems()
    }
  )
  /**
   * Handles the click event on the board and sets a new move.
   * @param {Event} event - The click event.
   * @return {Promise<void>} - A promise that resolves when the function completes.
   */
  const handleClick = async (event: Event): Promise<void> => {
    // If the game is already won or tied, return early
    if (state.gameOver.value) return
    // Get the element of the clicked rectangle
    const rect = event.target as HTMLDivElement
    // Check if the clicked rectangle is not already checked
    if (!rect.classList.contains('checked')) {
      // Get the position of the clicked rectangle
      const position = Number(rect.getAttribute('data-id') as string)

      // Add a new move to the temporary history
      state.temporaryHistory.value.push({
        id: state.actualPlayer.value, // Current player's id
        position: position, // Position of the rectangle
        move: state.actualMove.value + 1, // Current move number
      })

      // Increment the current move number
      state.actualMove.value += 1

      // Toggle the player
      state.actualPlayer.value = state.actualPlayer.value === 'x' ? 'o' : 'x'

      // Check if the game is won
      const check_win = checkGameOver(state.temporaryHistory.value)
      if (check_win.combination.length > 0) {
        state.gameOver.value = true
      }

      // Wait for the DOM and reactive updates to complete
      await nextTick()
    }
  }

  onMounted(() => {
    setIdRect()
    setItems()
  })
</script>

<style scoped lang="less">
  .boards {
    align-items: center;
    width: 100%;
    height: 100%;

    &.grid {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      grid-template-rows: 100%;
    }
    &.flex {
      display: flex;
      flex-direction: column;
      overflow: auto;
      gap: 2em;

      .board-container {
        height: 15em !important;
      }
    }
    .board-container {
      display: grid;
      grid-template-rows: 20% 80%;
      grid-template-columns: 20% 80%;
      aspect-ratio: 1;
      max-height: 27em;
      height: 100%;
      place-self: center;
      position: relative;
      margin-top: 3em;

      b {
        text-align: center;
        align-self: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        position: absolute;
        top: -2em;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      .row {
        grid-column: 2 / 3;
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        p {
          text-align: center;
          font-size: 85%;
          user-select: none;
        }
      }

      .col {
        grid-row: 2 / 3;
        display: grid;
        grid-template-rows: repeat(4, 1fr);

        p {
          text-align: center;
          align-content: center;
          font-size: 85%;
          user-select: none;
        }
      }

      .board {
        grid-column: 2 / 3;
        display: grid;
        grid-template: repeat(4, 25%) / repeat(4, 25%);
        height: 100%;
        aspect-ratio: 1;
        min-height: 5em;

        .rect {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: v-bind(background_fields);
          border: 2px solid v-bind(border_fields);
          color: black;
          cursor: pointer;
          text-align: center;
          font-size: v-bind('state.resizeValue.value / 10 + "px"');
          line-height: v-bind('state.resizeValue.value / 10 + "px"');
          aspect-ratio: 1;
          max-height: 100%;

          &.x {
            color: v-bind(colorX);
          }

          &.o {
            color: v-bind(colorO);
          }
          &.winning-field.winning-field {
            background-color: v-bind(background_win);
          }
          &.new-move {
            background-color: v-bind(background_new_move);
          }
        }
      }
    }
  }
</style>
