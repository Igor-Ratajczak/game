<template>
  <div class="game-rules">
    <div v-for="rule in rules" class="rules">
      <b>{{ rule.description }}</b>
      <img :src="rule.url" :alt="rule.alt" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import rules_1 from '/src/assets/rules-1.png'
  import rules_2 from '/src/assets/rules-2.png'
  import rules_3 from '/src/assets/rules-3.png'
  import rules_4 from '/src/assets/rules-4.png'
  import rules_5 from '/src/assets/rules-5.png'
  import rules_6 from '/src/assets/rules-6.png'
  const rules = [
    {
      url: rules_1,
      alt: 'rules 1',
      description:
        'Wygrać można ustawiając 4 X lub O na lini poziomej w kwadracie A, B, C lub D.',
    },
    {
      url: rules_2,
      alt: 'rules 2',
      description: 'Oczywiście to samo dotyczy lini pionowej',
    },
    {
      url: rules_3,
      alt: 'rules 3',
      description: 'Jak również lini na skos',
    },
    {
      url: rules_4,
      alt: 'rules 4',
      description:
        'Tutaj jest pierwsza dodatkowa zasada w kółko i krzyżyk 3D, a mianowicie jeżeli X lub O są na tej samej lini poziomej czyli jak np. na zdjęciu lini b oraz znajdują się na tej samej lini pionowej czyli w przypadku zdjęcia 2 to jest wygrana ',
    },
    {
      url: rules_5,
      alt: 'rules 5',
      description:
        'kolejna zasada jest troche trudniejsza albowiem wszystkie X lub O muszą znajdować się na tej samej lini poziomej, ale musza być poukładane po kolei czyli jeżeli ustawimy X lub O na np. 1a w kwadracie A to nastepny musi być w kwadracie B ale już 2a następny w kwadracie C i 3a i w końcu kwadrat D i 4a. W przypadku zdjęcia jest odwrotnie czyli zaczynamy od 4d potem jest 3d itd.',
    },
    {
      url: rules_6,
      alt: 'rules 6',
      description:
        'Ostania zasada jest bardzo trudna do wypatrzenia ponieważ X lub O przechodza przez każdy kwadrat na ukos czyli jak w przypadku zdjecia A-1a, B-2b, C3-c i ostatni D-4d oczywiście może być również z dołu do góry czyli A-1d, B2-c, C-3b oraz D-4a.',
    },
  ]
</script>

<style scoped lang="less">
  .game-rules {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
    height: 100%;
    color: white;
    z-index: 100;

    .rules {
      text-align: center;
      justify-items: center;
      display: grid;
      width: 100%;
      font-size: 10px;
      margin: 1em;
      gap: 2em;

      img {
        width: 350px;
        height: auto;
      }
      @media screen and (max-width: 600px) {
        img {
          width: 100%;
        }
      }
      @media screen and (max-width: 400px) {
        img {
          width: 50%;
        }
      }
      @media screen and (max-width: 300px) {
        img {
          width: 100%;
        }
      }
      @media screen and (max-width: 200px) {
        img {
          width: 75%;
        }
      }
    }
  }
</style>
