<script setup lang="ts">
  import { ref} from 'vue';
  import type { Character } from './types/Character';
  import { defaultCharacter } from './types/Character';
  import { attack, healing, restartGame } from './utils/game-actions';
  import { initGame } from './utils/game-logic';

  const information = ref<String>('');
  const yourCharacter = ref<Character>({
    ...defaultCharacter
  });

  const enemyCharacter = ref<Character>({
    ...defaultCharacter
  });

  initGame(yourCharacter.value, enemyCharacter.value); //select a player at random attack first

  // wrapper functions for the template
  const performAttack = (player: number, probability: number, damage: number) => {
    information.value = attack(player, probability, damage, yourCharacter.value, enemyCharacter.value);
  };

  const performHealing = (player: number, character: Character) => {
    information.value = healing(player, character, yourCharacter.value, enemyCharacter.value);
  };

  const performRestart = () => {
    information.value = ''
    restartGame(yourCharacter.value, enemyCharacter.value);
  };
</script>

<template>
  <header class="bg-blue-900">
    <h1 class="text-3xl p-4 text-center text-white">RPG</h1>
  </header>

  <main class="p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start justify-center text-center">
    <section
      class="w-full max-w-xs bg-white rounded-xl border-2 border-black p-4 flex flex-col items-center mx-auto"
      :style="{ 
        boxShadow: (yourCharacter.turn && yourCharacter.life > 0) 
          ? '0px 0px 20px 5px rgba(32,102,240,0.8)' 
          : '' 
      }"
    >
      <h1 class="text-lg font-bold mb-2">Player 1</h1>

      <div class="w-full bg-gray-300 rounded-md overflow-hidden h-6 mb-2">
        <div 
          class="bg-green-500 h-full text-center text-white font-bold transition-all duration-300"
          :style="{ width: yourCharacter.life + '%' }"
        >
          {{ yourCharacter.life <= 0 ? '0' : yourCharacter.life }}
        </div>
      </div>

      <div class="flex flex-col w-full gap-2">
        <button 
          @click="performAttack(0, 4, 10)"
          class="bg-red-500 py-2 rounded-lg text-white"
        >Attack</button>

        <button 
          @click="performAttack(0, 3, 20)"
          class="bg-blue-500 py-2 rounded-lg text-white"
        >Special Attack {{ yourCharacter.limit_special_attack }} / 5</button>

        <button 
          @click="performHealing(0, yourCharacter)"
          class="bg-green-200 py-2 rounded-lg"
        >
          Sanity {{ yourCharacter.limit_cures }} / 7
        </button>
      </div>
    </section>

    <section class="flex flex-col items-center justify-center gap-4">
      <h1 v-if="yourCharacter.life <= 0 || enemyCharacter.life <= 0"
          class="text-lg text-red-500 font-semibold uppercase">
        {{ yourCharacter.life <= 0 ? 'Player 2 Wins' : 'Player 1 Wins' }}
      </h1>

      <h2 class="text-lg text-gray-700 font-semibold uppercase">{{ information }}</h2>
      <h2 v-if="yourCharacter.life > 0 && enemyCharacter.life > 0"
        class="text-lg uppercase">
        {{ yourCharacter.turn ? 'Player 1 turn' : 'Player 2 turn' }}
      </h2>

      <img src="./assets/vs.png" alt="versus image" class="w-24 sm:w-32 my-4" />

      <button 
        @click="performRestart()"
        class="text-xl sm:text-2xl text-gray-700 font-semibold uppercase"
      >
        Restart 🗘
      </button>
    </section>

    <section
      class="w-full max-w-xs bg-white rounded-xl border-2 border-black p-4 flex flex-col items-center mx-auto"
      :style="{ 
        boxShadow: (enemyCharacter.turn && enemyCharacter.life > 0) 
          ? '0px 0px 20px 5px rgba(135,0,255,0.8)' 
          : '' 
      }"
    >
      <h1 class="text-lg font-bold mb-2">Player 2</h1>

      <div class="w-full bg-gray-300 rounded-md overflow-hidden h-6 mb-2">
        <div 
          class="bg-indigo-700 h-full text-center text-white font-bold transition-all duration-300"
          :style="{ width: enemyCharacter.life + '%' }"
        >
          {{ enemyCharacter.life <= 0 ? '0' : enemyCharacter.life }}
        </div>
      </div>

      <div class="flex flex-col w-full gap-2">
        <button 
          @click="performAttack(1, 4, 10)"
          class="bg-red-500 py-2 rounded-lg text-white"
        >Attack</button>

        <button 
          @click="performAttack(1, 3, 20)"
          class="bg-blue-500 py-2 rounded-lg text-white"
        >Special Attack {{ enemyCharacter.limit_special_attack }} / 5</button>

        <button 
          @click="performHealing(1, enemyCharacter)"
          class="bg-green-200 py-2 rounded-lg"
        >
          Sanity {{ enemyCharacter.limit_cures }} / 7
        </button>
      </div>
    </section>
  </main>
</template>