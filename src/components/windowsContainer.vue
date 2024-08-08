<template>
  <div v-if="windows.opened.value.length" class="windows-container">
    <div v-if="windows.opened.value.length > 1" class="navbar">
      <div class="tabs">
        <div
          v-for="window in windows.opened.value"
          class="tab"
          :class="window === windows.active.value ? 'active' : null"
          @click="ShowWindows(window)"
        >
          <div class="title">
            {{
              window !== 'settings'
                ? window !== 'history'
                  ? window !== 'rules'
                    ? 'Zapisane'
                    : 'Zasady'
                  : 'Historia'
                : 'Ustawienia'
            }}
          </div>
          <div class="close" @click="closeWindow(window, $event)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100"></line>
              <line x1="100" y1="0" x2="0" y2="100"></line>
            </svg>
          </div>
        </div>
      </div>
      <div class="close" @click="closeAllWindows()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <line x1="20" y1="20" x2="70" y2="70"></line>
          <line x1="70" y1="20" x2="20" y2="70"></line>
        </svg>
      </div>
    </div>
    <div
      v-for="window in windows.opened.value"
      :class="window !== windows.active.value ? 'hide-window' : ''"
      class="window"
    >
      <div class="navbar">
        <div class="title">
          {{
            (window !== 'settings'
              ? window !== 'history'
                ? window !== 'rules'
                  ? 'Zapisane'
                  : 'Zasady'
                : 'Historia'
              : 'Ustawienia') + ' gry'
          }}
        </div>
        <div class="close" @click="closeWindow(window, $event)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="70" y2="70"></line>
            <line x1="70" y1="20" x2="20" y2="70"></line>
          </svg>
        </div>
      </div>
      <SaveGamesContainer v-if="window === 'saved-games'"></SaveGamesContainer>
      <settingsContainer v-if="window === 'settings'"></settingsContainer>
      <historyContainer v-if="window === 'history'"></historyContainer>
      <gameRules v-if="window === 'rules'"></gameRules>
    </div>
  </div>
</template>

<script setup lang="ts">
  import settingsContainer from './menu/settingsContainer.vue'
  import historyContainer from './menu/historyContainer.vue'
  import gameRules from './menu/gameRules.vue'
  import SaveGamesContainer from './menu/SaveGamesContainer.vue'
  import { windows, WindowsKeys } from './menu/windowsState'
  import { ref, watchEffect } from 'vue'

  const closeAllWindows = () => {
    windows.opened.value = []
  }
  const closeWindow = (window: WindowsKeys, event: Event) => {
    event.stopPropagation()
    windows.opened.value.map((item, index) => {
      if (item === window) {
        windows.opened.value.splice(index, 1)
        windows.active.value = windows.opened.value[0]
      }
    })
  }
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const width_window = ref('60vw')
  const height_window = ref('90vw')

  const updateDimensions = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  window.addEventListener('resize', updateDimensions)

  watchEffect(() => {
    if (width.value < height.value || height.value < 600) {
      width_window.value = '100vw'
      height_window.value = '100vh'
    } else {
      width_window.value = '60vw'
      height_window.value = '90vh'
    }
  })
  const ShowWindows = (type: WindowsKeys) => {
    switch (type) {
      case 'settings':
        windows.active.value = 'settings'
        break
      case 'history':
        windows.active.value = 'history'
        break
      case 'rules':
        windows.active.value = 'rules'
        break
      case 'saved-games':
        windows.active.value = 'saved-games'
        break

      default:
    }
  }
</script>

<style lang="less" scoped>
  .windows-container {
    position: absolute;
    width: v-bind(width_window);
    height: v-bind(height_window);
    top: 0;
    right: 0;
    z-index: 1001;
    grid-row: 2/3;
    display: grid;
    grid-template: 6% 94% / 100%;
    gap: 10px;
    padding: 2em;
    background: #000000b4;

    > .navbar {
      display: grid;
      grid-template-columns: 25fr 2fr;
      grid-template-rows: 100%;
      place-items: center;
      justify-content: center;
      align-items: center;

      .tabs {
        display: flex;
        width: 100%;
        height: 100%;
        gap: 5px;
        user-select: none;

        .tab {
          cursor: pointer;
          height: 100%;
          width: 100%;
          padding: 0 1em;
          text-align: center;
          align-content: center;
          border: 5px solid black;
          display: grid;
          grid-template: 100% / 90% 10%;
          background: linear-gradient(
            to right,
            rgb(1, 46, 68),
            rgb(0, 255, 153)
          );
          border-radius: 50px;

          .title {
            grid-column: 1;
            grid-row: 1;
            font-size: 20px;
            font-weight: 600;
            align-content: center;
          }
          .close {
            grid-column: 2;
            grid-row: 1;
            position: relative;
            justify-self: end;
            font-size: 10px;
            font-weight: 600;
            width: 100%;
            height: 100%;
            font-family: fantasy;
            text-align: center;
            cursor: pointer;
            padding: 10px 0 10px 0;

            svg {
              height: 100%;
              width: 100%;

              > * {
                stroke: black;
                stroke-width: 10;
              }
            }
          }

          &.active {
            border-color: rgb(207, 194, 3);
          }
        }
      }
      > .close {
        grid-column: 2;
        grid-row: 1;
        justify-items: center;
        display: grid;
        width: 100%;
        height: 100%;
        cursor: pointer;

        svg {
          height: 100%;

          > * {
            stroke: white;
            stroke-width: 15;
          }
        }
      }
    }

    .window {
      display: grid;
      width: 100%;
      height: 100%;
      position: relative;
      grid-row: 2/3;
      grid-template: 10% 90% / 100%;
      * {
        color: white;
        stroke: white;
        stroke-width: 10;
      }
      &.active {
        z-index: 1001;
      }
      &.hide-window.hide-window {
        display: none;
      }
      .navbar {
        display: grid;
        grid-template-columns: 12fr 2fr;
        grid-template-rows: 100%;
        user-select: none;

        .title {
          grid-column: 1/3;
          grid-row: 1;
          justify-self: center;
          font-size: max(4vw, 2em, 2rem);
          font-weight: 600;
          height: max-content;
          font-family: fantasy;
        }

        .close {
          grid-column: 2;
          grid-row: 1;
          position: relative;
          justify-self: end;
          font-size: 10px;
          font-weight: 600;
          width: 100%;
          height: 100%;
          font-family: fantasy;
          text-align: center;
          cursor: pointer;
          padding: 10px;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
