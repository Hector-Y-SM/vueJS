<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import type { Character } from './types/Character';
  import { attack, healing, restartGame } from './utils/game-actions';
  import { initGame } from './utils/game-logic';

  const yourCharacter: Ref<Character> = ref({
    life: 100,
    turn: false,
    limit_cures: 5,
  });

  const enemyCharacter: Ref<Character> = ref({
    life: 100,
    turn: false,
    limit_cures: 5,
  });

  initGame(yourCharacter, enemyCharacter); //select a player at random attack first
  // Funciones wrapper para usar en el template
  const performAttack = (player: number, probability: number, damage: number) => {
    attack(player, probability, damage, yourCharacter, enemyCharacter);
  };

  const performHealing = (player: number, character: Character) => {
    healing(player, character, yourCharacter, enemyCharacter);
  };

  const performRestart = () => {
    restartGame(yourCharacter, enemyCharacter);
  }

</script>

<template>
  <header class="bg-blue-900">
    <h1 class="text-3xl p-4 text-center text-white">RPG</h1>
  </header>

  <main class="p-10 flex justify-center items-start gap-10">
    <section 
            class="w-80 bg-white rounded-xl border-2 border-black p-4 flex flex-col items-center"
            :style="{boxShadow: (yourCharacter.turn && yourCharacter.life > 0)? '0px 0px 20px 5px rgba(40,0,255,0.81)' : ''}">
      <h1 class="text-lg font-bold mb-2">Player 1</h1>
      <!-- barra de vida -->
      <div class="w-full bg-gray-300 rounded-md overflow-hidden h-6 mb-2">
        <div 
            class="bg-green-500 h-full text-center text-white font-bold transition-all duration-300"
            :style="{ width: yourCharacter.life + '%' }"
          >
            {{ yourCharacter.life <= 0? '0' : yourCharacter.life }}
          </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <button 
          @click="performAttack(0, 8, 10)"
          class="bg-red-500 py-2 rounded-lg text-white"
        >Attack</button>
        <button 
          @click="performAttack(0, 3, 20)"
          class="bg-blue-500 py-2 rounded-lg text-white"
        >Special Attack</button>
        <button 
          @click="performHealing(0, yourCharacter)"
          class="bg-green-200 py-2 rounded-lg"
        >Sanity {{ yourCharacter.limit_cures }} / 5</button>
      </div>
    </section>

    <section>
      <div>
        <h1 
            v-if="yourCharacter.life <= 0 || enemyCharacter.life <= 0">
          {{ yourCharacter.life <= 0 ? 'player 2 wins':'player 1 wins'}}
        </h1>
        <h1>{{ yourCharacter.turn ? 'turno del jugador 1' : 'turno del jugador 2'}}</h1>
        <img src="./assets/vs.png" alt="versus image"/>
        <button 
            @click="performRestart()"
            class="text-3xl">restart</button>
      </div>
    </section>

    <section 
              class="w-80 bg-white rounded-xl border-2 border-black p-4 flex flex-col items-center"
              :style="{boxShadow: (enemyCharacter.turn && enemyCharacter.life > 0)? '0px 0px 20px 5px rgba(135,0,255,0.8)' : ''}">  
      <h1 class="text-lg font-bold mb-2">Player 2</h1>
      <!-- barra de vida enemigo-->
      <div class="w-full bg-gray-300 rounded-md overflow-hidden h-6 mb-2">
        <div 
            class="bg-indigo-700 h-full text-center text-white font-bold transition-all duration-300"
            :style="{ width: enemyCharacter.life + '%' }"
          >
            {{ enemyCharacter.life <= 0? '0' : enemyCharacter.life}}
          </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <button 
          @click="performAttack(1, 5, 10)"
          class="bg-red-500 py-2 rounded-lg text-white"
        >Attack</button>
        <button 
          @click="performAttack(1, 3, 20)"
          class="bg-blue-500 py-2 rounded-lg text-white"
        >Special Attack</button>
        <button 
          @click="performHealing(1, enemyCharacter)"
          class="bg-green-200 py-2 rounded-lg"
        >Sanity {{ enemyCharacter.limit_cures }} / 5</button>
      </div>
    </section>
  </main>
</template>