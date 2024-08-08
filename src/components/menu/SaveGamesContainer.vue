<template>
  <div class="save-games-container">
    <div
      v-for="(item, index) in state.saveGames.value"
      :key="index"
      class="save-game"
    >
      <div class="remove" @click="removeSaveGame(item[0].id)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <rect
            x="13"
            y="15"
            width="75"
            height="75"
            rx="5"
            ry="5"
            fill="none"
            stroke="#fff"
            stroke-width="10"
          />
          <line
            class="stroke-line"
            stroke="#fff"
            x1="0"
            y1="0"
            x2="100"
            y2="0"
          />
          <line stroke="#fff" x1="30" y1="30" x2="30" y2="70" />
          <line stroke="#fff" x1="50" y1="30" x2="50" y2="70" />
          <line stroke="#fff" x1="70" y1="30" x2="70" y2="70" />
        </svg>
      </div>
      <div class="title">{{ item[0].title }}</div>
      <div class="date">{{ item[0].date }}</div>
      <Board2D
        v-bind:id="item[0].id + 'save-game'"
        v-bind:moves="item[0].moves"
        v-bind:actual-move="item[0].actualMove"
        v-bind:action-click="false"
      ></Board2D>
      <div class="button" @click="loadGame(item[0])">Wczytaj</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '../data/state'
  import Board2D from '../board/board2D.vue'
  import { SaveGames } from '../data/state'
  import { board } from '../board/board3d-box'

  const state = useStore()

  const removeSaveGame = (id: number) => {
    state.saveGames.value = state.saveGames.value.filter(
      (item) => item[0].id !== id
    )
  }

  const loadGame = (item: SaveGames) => {
    const movesCopy = JSON.parse(JSON.stringify(item.moves))
    const actualMoveCopy = item.actualMove
    state.temporaryHistory.value = movesCopy
    state.gameOver.value = false
    state.actualMove.value = actualMoveCopy
    state.actualPlayer.value =
      item.moves[item.moves.length - 1].id === 'x' ? 'o' : 'x'

    Array.from(
      document.querySelectorAll(`.main .rect`) as NodeListOf<HTMLElement>
    ).map((rect) => {
      rect.removeAttribute('style')
      rect.innerHTML = ''
    })
    board.value.map((item) => {
      item.isClicked = false
      item.text = ''
    })
    item.moves.forEach((item) => {
      const id = item.id
      const position = item.position
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
    })
  }
</script>

<style lang="less">
  .save-games-container {
    overflow: auto;
    height: 100%;

    .save-game {
      position: relative;
      display: grid;
      gap: 2em;

      div.title.title {
        font-weight: bold;
        font-size: 25px;
        text-align: center;
      }
      .rect {
        font-size: 16px !important;
        line-height: 16px !important;
      }
      .remove {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;

        svg {
          width: 30px;
          height: 30px;

          line {
            stroke-width: 5px !important;
          }
          line.stroke-line {
            stroke-width: 20px !important;
          }
        }
      }
      div.button.button {
        color: black;
      }
    }
  }
</style>
