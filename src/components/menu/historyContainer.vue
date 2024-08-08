<template>
  <div class="history">
    <div v-for="(item, index) in state.history.value" :key="index">
      <div class="title">{{ item.date }}</div>
      <Board2D
        v-bind:id="index + 'history'"
        v-bind:moves="item.moves"
        v-bind:actual-move="item.actualMove"
        v-bind:action-click="false"
      ></Board2D>
      <div class="options">
        <div
          class="button"
          :class="item.actualMove === 0 ? 'disabled' : null"
          @click="previousMove(index)"
        >
          cofnij ruch
        </div>
        <div class="current-move">
          {{ item.actualMove }}
        </div>
        <div
          class="button"
          :class="item.actualMove === item.moves.length ? 'disabled' : null"
          @click="nextMove(index)"
        >
          następny ruch
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Board2D from '../board/board2D.vue'
  import { useStore } from '../data/state'

  const state = useStore()
  // undo one move
  const previousMove = (index: number) => {
    if (state.history.value[index].actualMove > 0) {
      state.history.value[index].actualMove -= 1
    }
  }

  // next one move
  const nextMove = (index: number) => {
    if (
      state.history.value[index].actualMove <
      state.history.value[index].moves.length
    ) {
      state.history.value[index].actualMove += 1
    }
  }
</script>

<style lang="less">
  .history {
    overflow-y: auto;
    height: 100%;
    color: white;
    z-index: 100;

    .options {
      display: flex;
      flex-direction: row;
      align-items: center;

      .button.button {
        color: black;
      }
    }
    .title {
      text-align: center;
    }
    .boards {
      margin-bottom: 5em;
    }
    .rect {
      font-size: 16px !important;
      line-height: 16px !important;
    }
  }
</style>
