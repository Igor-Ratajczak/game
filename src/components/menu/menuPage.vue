<!-- <template>
  <div class="backdrop-blur-xl menu-container">
    <div class="box" :class="current_wall">
      <div
        v-for="walls in box"
        :key="walls.name"
        :class="walls.id"
        class="wall"
      >
        <div class="name">
          <h1 class="text-2xl text-center rounded-3xl">
            {{ walls.name }}
          </h1>
        </div>
        <div
          v-for="item in walls.buttons"
          :key="walls.name"
          class="button"
          @click="
            item.current_wall === 'play_friend' ||
            item.current_wall === 'play_ai'
              ? item.current_wall === 'play_friend'
                ? playFriend()
                : playAI()
              : (current_wall = item.current_wall)
          "
        >
          {{ item.text }}
        </div>
        <settingsContainer v-if="walls.id === 'left'"></settingsContainer>
        <gameRules v-if="walls.id === 'bottom'"></gameRules>
        <historyContainer v-if="walls.id === 'right'"></historyContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import settingsContainer from './settingsContainer.vue'
  import gameRules from './gameRules.vue'
  import historyContainer from './historyContainer.vue'
  import { useStore } from '../data/state'

  const state = useStore()
  interface Button {
    text: string
    current_wall: string
  }

  interface Wall {
    id: string
    name: string
    buttons: Button[]
  }

  interface Box {
    front: Wall
    top: Wall
    bottom: Wall
    left: Wall
    right: Wall
  }
  const box: Ref<Box> = ref({
    front: {
      id: 'front',
      name: 'Kółko i krzyżyk w przestrzeni',
      buttons: [
        { text: 'Graj!', current_wall: 'top' },
        { text: 'Zasady gry', current_wall: 'bottom' },
        { text: 'Ustawienia', current_wall: 'left' },
        { text: 'Historia', current_wall: 'right' },
      ],
    },
    top: {
      id: 'top',
      name: 'Wybierz przeciwnika',
      buttons: [
        { text: 'Wróć na stronę główną', current_wall: 'front' },
        { text: 'Graj z przyjacielem', current_wall: 'play_friend' },
        { text: 'Graj z komputerem', current_wall: 'play_ai' },
      ],
    },
    bottom: {
      id: 'bottom',
      name: 'Zasady gry',
      buttons: [{ text: 'Wróć na stronę główną', current_wall: 'front' }],
    },
    left: {
      id: 'left',
      name: 'Ustawienia',
      buttons: [{ text: 'Wróć na stronę główną', current_wall: 'front' }],
    },
    right: {
      id: 'right',
      name: 'Historia',
      buttons: [{ text: 'Wróć na stronę główną', current_wall: 'front' }],
    },
  })
  const current_wall = ref<string>('front')
  const playFriend = () => {
    state.showMenu.value = false
    state.actualOpponent.value = 'friend'
  }
  const playAI = () => {
    state.showMenu.value = false
    state.actualOpponent.value = 'ai'
  }

  const width = window.innerWidth / 4 + 'px'
  const height = window.innerHeight / 2 + 'px'
</script>

<style lang="less" scoped>
  .menu-container {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000080;
    width: 100vw;
    height: 100vh;
    display: grid;
    perspective: 500px;

    div.box {
      width: v-bind(width);
      height: v-bind(width);
      position: relative;
      place-self: center;
      transform-style: preserve-3d;
      transition: transform 1s ease-in-out;

      &.front {
        transform: rotateY(0deg);
      }

      &.back {
        transform: rotateY(180deg);
      }

      &.left {
        transform: rotateY(90deg);
      }

      &.right {
        transform: rotateY(-90deg);
      }

      &.top {
        transform: rotateX(-90deg);
      }

      &.bottom {
        transform: rotateX(90deg);
      }

      div.wall {
        width: v-bind(width);
        height: v-bind(width);
        background-color: var(--background-box);
        color: black;
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: center;

        &.front {
          transform: rotateY(0deg) translateZ(calc(v-bind(width) / 2));
        }

        &.back {
          transform: rotateY(180deg) translateZ(calc(v-bind(width) / 2));
        }

        &.left {
          transform: rotateY(-90deg) translateZ(calc(v-bind(width) / 2));
          display: grid;
          grid-template-rows: 1fr 1fr 5fr;
        }

        &.right {
          transform: rotateY(90deg) translateZ(calc(v-bind(width) / 2));
          display: grid;
          grid-template-rows: 1fr 1fr 5fr;
        }

        &.top {
          transform: rotateX(90deg) translateZ(calc(v-bind(width) / 2));
        }

        &.bottom {
          transform: rotateX(-90deg) translateZ(calc(v-bind(width) / 2));
          display: grid;
          grid-template-rows: 1fr 1fr 5fr;
        }

        div.name {
          position: relative;
          z-index: 10;
          display: grid;
          margin: 10px;

          h1 {
            align-self: center;
            background: linear-gradient(
              135deg,
              rgb(0, 170, 255),
              rgb(0, 255, 153) 70%
            );
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 5px;
            z-index: 10;
            backface-visibility: hidden;
          }
        }
      }
    }
  }
</style> -->
