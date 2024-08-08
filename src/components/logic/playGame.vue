<template>
  <div class="main">
    <div class="text-5xl actual-player">
      <b v-if="state.gameOver.value">{{
        'WYGRAŁ GRACZ ' + (actualPlayer === 'x' ? 'X' : ' O')
      }}</b>
      <b v-else-if="tie">{{ 'REMIS. Nikt nie wygrał' }}</b>
      <b v-else class="text-5xl actual-player">
        Teraz gra {{ state.actualPlayer }} liczba ruchów
        {{ state.actualMove }}</b
      >
    </div>
    <div v-if="state.turnBoard3D.value" class="board-3D">
      <Suspense>
        <board3D></board3D>
      </Suspense>
    </div>
    <div
      v-if="!isMobile"
      class="resizable-line tooltip"
      @mousedown="handleResize"
      @mouseup="handleResize"
    >
      <div class="tooltip-content">Przesuwaj, aby zmienić rozmiar planszy</div>
      <div class="resize-button"><=></div>
    </div>
    <div
      v-if="state.turnBoard2D.value"
      class="board-2D"
      :style="{ height: board2DHeight + 'px' }"
    >
      <board2D
        v-bind:id="0"
        v-bind:moves="null"
        v-bind:actual-move="0"
        v-bind:action-click="true"
      ></board2D>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref, watch, watchEffect } from 'vue'
  import board2D from '../board/board2D.vue'
  import { useStore } from '../data/state'
  import board3D from '../board/board3D.vue'
  import { handleResize } from '../board/ResizeBoards'
  import { setNewMove } from '../move/newMove'
  import { getAllMovesFromHistory } from '../move/getAllMovesFromHistory'
  import { bot } from '../bot/bot'
  const state = useStore()

  const actualPlayer = ref(state.actualPlayer)
  const tie = ref(false)

  const board2DHeight = ref(state.resizeValue.value)
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
  // watch state resize value is changed an update board 2D height and update board 3D
  watch([state.resizeValue], () => {
    board2DHeight.value = state.resizeValue.value
  })

  watch(
    () => state.temporaryHistory.value.length,
    async () => {
      setNewMove()
      if (state.actualOpponent.value === 'ai') {
        // watch actual player if changes and is 'o' run bot
        if (state.actualPlayer.value === 'o') {
          await nextTick() // Ensure previous changes are applied
          const board = Array.from(
            document.querySelectorAll('.main .rect')
          ).map((rect) => rect.innerHTML)
          setTimeout(() => bot(board), 0) // Slight delay for UI update
        }
      }
    }
  )
  onMounted(() => {
    getAllMovesFromHistory()
  })
</script>

<style scoped lang="less">
  .main {
    display: grid;
    grid-template: 3em auto 5px max-content 5em / 100%;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;

    .actual-player {
      text-align: center;
      font-size: max(2vw, 1em, 1rem);
      line-height: 1;
      margin-top: 15px;
      margin-right: 0em;
    }
    .board-3D {
      grid-column: 1/2;
      grid-row: 2/3;
    }
    .board-3D,
    .board-2D {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .resizable-line {
      grid-column: 1/2;
      grid-row: 3/4;
      background-color: black;
      cursor: ns-resize;
      position: relative;
      height: 10px;

      .resize-button {
        position: absolute;
        left: 50%;
        top: -50%;
        width: 20px;
        height: 5em;
        background-color: black;
        border-radius: 15px;
        transform: rotate(90deg) translateX(-50%) translateY(50%);
        text-align: center;
        align-content: center;
        user-select: none;
        font-size: 8px;
        font-weight: 900;
      }
    }

    .board-2D {
      grid-column: 1/2;
      grid-row: 4/5;
      padding: 2em;
    }
    .options {
      grid-column: 1/2;
      grid-row: 5/6;
      display: flex;
      justify-content: space-evenly;
    }
  }
</style>
