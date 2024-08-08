<template>
  <div v-if="inputName" class="save-container">
    <input
      type="text"
      v-model="saveName"
      :class="saveName === '' && message ? 'error' : null"
      placeholder="Nazwa zapisu gry"
    />
    <div
      class="button"
      @click="closeSaveMode()"
      @keydown.enter="closeSaveMode()"
      tabindex="0"
    >
      Anuluj
    </div>
    <div
      class="button"
      @click="saveName === '' ? (message = true) : saveButton()"
      @keydown.enter="saveName === '' ? (message = true) : saveButton()"
      tabindex="0"
    >
      Zapisz gre
    </div>
  </div>
  <div v-if="isMobile" class="show-menu" @click="menuOpen = true">|||</div>
  <div v-if="!isMobile" class="new-menu">
    <SaveGame @click="showSaveMode()"></SaveGame>
    <savedGamesIcon @click="handleClick('saved-games')"></savedGamesIcon>
    <NewGameFriend @click="newGame('friend')"></NewGameFriend>
    <NewGameBot @click="newGame('bot')"></NewGameBot>
    <settingsIcon @click="handleClick('settings')"></settingsIcon>
    <RulesIcon @click="handleClick('rules')"></RulesIcon>
    <historyIcon @click="handleClick('history')"></historyIcon>
  </div>
  <div v-else v-if="menuOpen" class="mobile-menu">
    <div class="close" @click="menuOpen = false">X</div>
    <div>
      <SaveGame @click="showSaveMode(), (menuOpen = false)"></SaveGame
      ><b>Zapisz gre</b>
    </div>
    <div>
      <savedGamesIcon
        @click="handleClick('saved-games'), (menuOpen = false)"
      ></savedGamesIcon
      ><b>Wczytaj gre</b>
    </div>
    <div>
      <NewGameFriend
        @click="newGame('friend'), (menuOpen = false)"
      ></NewGameFriend>
      <b>Nowa gra z przyjacielem</b>
    </div>
    <div>
      <NewGameBot @click="newGame('bot'), (menuOpen = false)"></NewGameBot
      ><b>Nowa gra z botem</b>
    </div>
    <div>
      <settingsIcon
        @click="handleClick('settings'), (menuOpen = false)"
      ></settingsIcon>
      <b>Ustawienia</b>
    </div>
    <div>
      <RulesIcon @click="handleClick('rules'), (menuOpen = false)"></RulesIcon
      ><b>Zasady</b>
    </div>
    <div>
      <historyIcon
        @click="handleClick('history'), (menuOpen = false)"
      ></historyIcon
      ><b>Historia</b>
    </div>
  </div>
</template>

<script setup lang="ts">
  import settingsIcon from '../icons/settingsIcon.vue'
  import RulesIcon from '../icons/RulesIcon.vue'
  import historyIcon from '../icons/historyIcon.vue'
  import NewGameBot from '../icons/NewGameBot.vue'
  import NewGameFriend from '../icons/NewGameFriend.vue'
  import savedGamesIcon from '../icons/savedGamesIcon.vue'
  import SaveGame from '../icons/SaveGame.vue'
  import { windows } from './windowsState'
  import { ref, watchEffect } from 'vue'
  import { useStore } from '../data/state'
  import { board } from '../board/board3d-box'

  const state = useStore()
  const menuOpen = ref(false)
  const inputName = ref(false)
  const saveName = ref('')
  const message = ref(false)
  type WindowsKeys = 'settings' | 'rules' | 'history' | 'saved-games'

  const handleClick = (type: WindowsKeys) => {
    if (!windows.opened.value.includes(type)) {
      windows.opened.value.push(type)
      windows.active.value = type
    }
  }

  const newGame = (type: string) => {
    resetValues()
    switch (type) {
      case 'friend':
        state.actualOpponent.value = 'friend'
        break
      case 'bot':
        state.actualOpponent.value = 'ai'
        break
      default:
        break
    }
  }
  const resetValues = () => {
    state.actualMove.value = 0
    state.gameOver.value = false
    state.temporaryHistory.value = []
    state.actualPlayer.value = 'x'
    Array.from(
      document.querySelectorAll(`.main .rect`) as NodeListOf<HTMLElement>
    ).map((rect) => {
      rect.removeAttribute('style')
      rect.classList.remove('checked', 'x', 'o', 'new-move')
      rect.innerHTML = ''
    })
    board.value.map((item) => {
      item.isClicked = false
      item.color = null
      item.text = ''
    })
  }
  const showSaveMode = () => {
    inputName.value = true
  }
  const closeSaveMode = () => {
    inputName.value = false
    saveName.value = ''
  }

  const saveButton = () => {
    inputName.value = false
    const actualMove = state.actualMove.value
    const moves = [...state.temporaryHistory.value]
    state.saveGames.value.push([
      {
        id: state.saveGames.value.length + 1,
        title: saveName.value,
        date: `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`,
        actualMove: actualMove,
        moves: [...moves],
      },
    ])
    saveName.value = ''
  }

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
</script>

<style lang="less">
  .save-container {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    width: 50%;
    height: 20%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: -1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
      background-image: var(--background-o);
      background-image: var(--background-standard);
      border: 10px solid white;
      border-radius: 20px;
      z-index: -1;
    }

    input {
      grid-row: 1;
      grid-column: 1/3;
      border-radius: 25px;
      width: 80%;
      height: 50%;
      place-self: center;
      color: black;
      text-align: center;
      position: relative;

      &.error {
        border: 3px solid red;
      }
    }
    div.button {
      border: 5px solid black;
      place-self: center;
      padding: 10px;
      border-radius: 50px;
    }
  }
  .new-menu {
    display: flex;
    gap: 3em;
    padding: 1em 2em 1em 2em;
    width: max-content;
    height: max-content;
    position: relative;
    grid-row: 2;
    background-color: #ffffffa6;
    justify-self: center;
    border-radius: 50px;
    justify-content: center;
  }
  .mobile-menu {
    display: grid;
    background-color: #000000b4;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;

    & > div.close {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 25px;
      margin: 20px;
      cursor: pointer;
      height: max-content;
    }

    & > div {
      align-self: center;
      display: flex;
      height: 100%;
      gap: 20px;
      place-items: center;

      > div {
        flex: 1;
        text-align: -webkit-center;
      }
      > b {
        width: 100%;
        align-content: center;
        overflow-wrap: break-word;
        flex: 1;
      }
    }
  }
  .show-menu {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25px;
    margin: 5px;
    cursor: pointer;
    transform: rotate(90deg);
    letter-spacing: -0.2em;
  }
</style>
