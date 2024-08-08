<template>
  <div id="root">
    <ReloadPrompt></ReloadPrompt>
    <playGame />
    <windowsContainer></windowsContainer>
    <NewMenu></NewMenu>
    <canvas :width="canvasWidth" :height="canvasHeight" />
  </div>
</template>

<script setup lang="ts">
  import ReloadPrompt from './components/ReloadPrompt.vue'
  import playGame from './components/logic/playGame.vue'
  import NewMenu from './components/menu/NewMenu.vue'
  import { onMounted } from 'vue'
  import windowsContainer from './components/windowsContainer.vue'

  const canvasWidth = window.innerWidth
  const canvasHeight = window.innerHeight

  onMounted(() => {
    if (localStorage.getItem('temporary_history')) {
      return true
    } else {
      return false
    }
  })
</script>

<style scoped lang="less">
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  #root {
    display: grid;
    grid-template: calc(100% - 5em) 5em / 100%;
    width: 100vw;
    height: 100vh;
  }
</style>
