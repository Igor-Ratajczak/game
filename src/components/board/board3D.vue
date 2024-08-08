<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="[0, 0,8] as any"
      :look-at="[0, 0, 0] as any"
    />
    <OrbitControls></OrbitControls>

    <TresGroup v-for="(item, itemId) in lines as Lines[]" :key="itemId">
      <Line2
        v-for="line in item.lines"
        :key="line.id"
        :line-width="10"
        :color="color_border"
        :points="line.points"
      >
      </Line2>
    </TresGroup>
    <TresMesh
      v-for="(item, itemId) in board"
      :key="itemId"
      @click="(event) => (item.text === '' ? handleClick(event, item) : null)"
      @pointer-enter="(event) => onPointerMove(event, item)"
      @pointer-leave="() => onPointerLeave(item)"
      :position="[item.x, item.y, item.z] as any"
    >
      <TresBoxGeometry :args="[item.width, item.height, item.depth]" />
      <TresMeshBasicMaterial
        :color="item.color === null ? background_fields as any : item.color as any"
      />
      <Suspense>
        <Text3D
          font="/FiraCodeRegular.json"
          :text="item.text"
          :size="0.8"
          :rotation="[0, item.width === 0.1 ? 80 : 0, 0]"
        >
          <TresMeshBasicMaterial
            :color="item.text === 'x' ? colorX as any : colorO as any"
          />
        </Text3D>
      </Suspense>
    </TresMesh>
    <TresMesh>
      <TresBoxGeometry :args="[4, 4, 4]" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script setup lang="ts">
  import { Text3D, Line2, OrbitControls } from '@tresjs/cientos'
  import { ThreeEvent, TresCanvas } from '@tresjs/core'
  import { useStore } from '../data/state'
  import { Box, board, createLines, Lines } from './board3d-box'
  import { checkGameOver } from '../logic/checkIsEndGame'
  import { Ref, ref } from 'vue'

  const state = useStore()
  const background_fields = state.backgroundFields
  const color_border = state.borderFields
  const colorX = state.colorX
  const colorO = state.colorO
  const lines: Lines[] = createLines()
  const activeHover: Ref<Box | null> = ref(null)

  /**
   * Handles the pointer move event.
   * @param {ThreeEvent<PointerEvent>} event - The pointer move event.
   * @param {{ isHovered: boolean }} item - The item being hovered.
   */
  const onPointerMove = (event: ThreeEvent<PointerEvent>, item: Box) => {
    if (state.gameOver.value) return
    event.stopPropagation()
    if (item.color === state.backgroundNewMove.value) return
    if (item.isClicked === true) return
    item.color = 'grey'
    activeHover.value = item
  }
  /**
   * Sets the `isHovered` property of the given `item` object to `false`.
   * @param {Object} item - The item object.
   */
  const onPointerLeave = (item: Box) => {
    if (state.gameOver.value) return
    if (item.color === state.backgroundNewMove.value) return
    if (item.isClicked) return

    item.color = null
  }
  /**
   * Handles the click event on a 3D box.
   * @param {ThreeEvent<MouseEvent>} event - The click event.
   * @param {Box} clickedItem - The box that was clicked.
   * @return {void}
   */
  const handleClick = (event: ThreeEvent<MouseEvent>, clickedItem: Box) => {
    // If the game is already won, return
    if (state.gameOver.value) return
    else {
      // Stop the event from propagating further
      event.stopPropagation()

      // Set the clicked box to clicked state
      clickedItem.isClicked = true

      // Increment the current move
      state.actualMove.value += 1

      // Find the clicked box in the box array and push it to temporary history
      board.value.forEach((item, index) => {
        if (item.isClicked === clickedItem.isClicked) {
          state.temporaryHistory.value.push({
            id: state.actualPlayer.value, // Current player's id
            position: index, // Position of the box
            move: state.actualMove.value, // Current move
          })
        }
      })

      // Toggle the player
      state.actualPlayer.value = state.actualPlayer.value === 'x' ? 'o' : 'x'

      // Reset the clicked box state
      clickedItem.isClicked = false

      // Check if the game is won and update the state accordingly
      const check_win = checkGameOver(state.temporaryHistory.value)
      if (check_win.combination.length > 0) {
        state.gameOver.value = true
      }
    }
  }
</script>

<style scoped>
  canvas {
    width: 100%;
    height: 120em;
  }
</style>
