<template>
  <div class="settings">
    <div class="setting">
      <b>Włącz/Wyłącz planszę 3D</b>
      <div
        class="switch"
        :data-turn="state.turnBoard3D.value"
        @click="state.turnBoard3D.value = !state.turnBoard3D.value"
      ></div>
    </div>
    <div class="setting">
      <b>Kolor X</b>
      <input type="color" v-model="state.colorX.value" class="color-picker" />
    </div>
    <div class="setting">
      <b>Kolor O</b>
      <input type="color" v-model="state.colorO.value" class="color-picker" />
    </div>
    <div class="setting">
      <b>Tło pól</b>
      <input
        type="color"
        v-model="state.backgroundFields.value"
        class="color-picker"
      />
    </div>
    <div class="setting">
      <b>Tło pól wygrywających</b>
      <input
        type="color"
        v-model="state.backgroundWin.value"
        class="color-picker"
      />
    </div>
    <div class="setting">
      <b>Tło pola nowego ruchu</b>
      <input
        type="color"
        v-model="state.backgroundNewMove.value"
        class="color-picker"
      />
    </div>
    <div class="setting">
      <b>Kolor lini na planszy</b>
      <input
        type="color"
        v-model="state.borderFields.value"
        class="color-picker"
      />
    </div>
    <div
      class="setting"
      :class="state.history.value.length > 0 ? null : 'disabled'"
    >
      <b>Usuń całą historię</b>
      <button class="remove" @click="removeHistory()">Usuń historię</button>
    </div>
    <div
      class="setting"
      :class="state.history.value.length > 0 ? null : 'disabled'"
    >
      <b>Usuń całą historię</b>
      <input
        type="number"
        name="history_items"
        id="history_items"
        min="0"
        :max="state.history.value.length"
        v-model="number"
      />
      <button class="remove" @click="removeItemsHistory()">
        Usuń wybraną ilość historii
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from '../data/state'
  const state = useStore()

  const number = ref(0)
  const removeHistory = () => {
    state.history.value = []
  }
  const removeItemsHistory = () => {
    state.history.value.splice(0, number.value)
  }
</script>

<style scoped lang="less">
  .settings {
    display: flex;
    flex-direction: column;
    gap: 2em;
    place-items: center;
    overflow-y: auto;
    height: 100%;
    z-index: 100;

    .setting {
      color: black;
      display: flex;
      gap: 2em;
      position: relative;

      &.disabled::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        cursor: default;
        user-select: none;
        background-color: rgba(128, 128, 128, 0.421);
        width: 100%;
        height: 100%;
      }

      .color-picker {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;

        &::-webkit-color-swatch,
        &::-webkit-color-swatch-wrapper {
          border: none;
          border-radius: 50%;
          padding: 0;
        }
      }

      .switch {
        width: 40px;
        height: 20px;
        border-radius: 25px;
        background-color: #ccc;
        position: relative;
        cursor: pointer;

        &[data-turn='true']::before {
          background: blue;
          left: 20px;
        }

        &::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background: black;
          border-radius: 50%;
          transition: background 0.3s ease;
          transition: all 0.3s;
          left: 0;
        }
      }
    }
  }
</style>
