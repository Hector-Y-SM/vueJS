<script setup lang="ts">
  import { ref } from 'vue';
  
  interface Character {
    life: number;
    turn: boolean;
    limit_cures: number;
  }

  const yourCharacter = ref<Character>({
    life: 100,
    turn: true,
    limit_cures: 5,
  });

  const enemyCharacter = ref<Character>({
    life: 100,
    turn: false,
    limit_cures: 5,
  });

  /**
   * Reusable function for basic and special attacks by player 1 and CPU/player 2
   * @param player player who will make the atatck
   * @param probability possibility of causing harm to the other player
   * @param damage amount of damage done by the basic or special attack
   */
  const attack = ( player: number, probability: number, damage: number) => {
    if (!validateTurn(player)) {
      return;
    }

    if (Math.floor((Math.random() * 10) + 1) > probability){
      if (!player){
        enemyCharacter.value.life -= damage;
        endTurn(player)
      } else {
        yourCharacter.value.life -= damage;
        endTurn(player)
      }
    } else {
      endTurn(player);
    }
  }; 

  const validateTurn = (player: number) => {
    if (!player && !yourCharacter.value.turn) {
      console.log('turn p2');
      return false;
    }

    if (player && !enemyCharacter.value.turn) {
      console.log('turn p1');
      return false;
    }

    return true;
  };

  const endTurn = (player: number) => {
    if(!player){
      console.log('atack p1');
      yourCharacter.value.turn = false;
      enemyCharacter.value.turn = true;
    } else {
      console.log('atack p2');
      enemyCharacter.value.turn = false;
      yourCharacter.value.turn = true;
    }
  };

  const healing = (player: number, character: Character) => {
    if (!validateTurn(player)) {
      return;
    }

    if (!validateCures(character)){
      console.log('te quedaste sin curaciones');
      return;
    }

    if (limitLife(character)){
      console.log('salud al maximo');
      return;
    }

    if (player == 0){
      yourCharacter.value.life += 10
      yourCharacter.value.limit_cures--
      endTurn(player)
    } else {
      enemyCharacter.value.life += 10;      
      enemyCharacter.value.limit_cures--
      endTurn(player)
    }
  };

  const validateCures = (character: Character) => {
    return character.limit_cures > 0
  }

  const limitLife = (character: Character) => {
    return character.life == 100;
  }
</script>

<template>
  <header class="bg-blue-900">
    <h1 class="text-3xl p-4 text-center text-white">RPG</h1>
  </header>

  <main class="p-10 flex justify-center items-start gap-10">
    <!-- Player 1 -->
    <section class="w-80 bg-white rounded-xl shadow-lg border-2 border-black p-4 flex flex-col items-center">
      <h1 class="text-lg font-bold mb-2">Player 1</h1>
      <!-- barra de vida -->
      <div class="w-full bg-gray-300 rounded-md overflow-hidden h-6 mb-2">
        <div 
            class="bg-green-500 h-full text-center text-white font-bold transition-all duration-300"
            :style="{ width: yourCharacter.life + '%' }"
          >
            {{ yourCharacter.life }}
          </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <button 
          @click="attack(0, 8, 10)"
          class="bg-red-500 py-2 rounded-lg text-white"
        >Attack</button>
        <button 
          @click="attack(0, 3, 20)"
          class="bg-blue-500 py-2 rounded-lg text-white"
        >Special Attack</button>
        <button 
          @click="healing(0, yourCharacter)"
          class="bg-green-200 py-2 rounded-lg"
        >Sanity {{ yourCharacter.limit_cures }} / 5</button>
      </div>
    </section>
    <section>
      <div>
        <h1>{{ yourCharacter.turn ? 'turno del jugador 1' : 'turno del jugador 2'}}</h1>
      </div>
    </section>
    <!-- Player 2 -->
    <section class="w-80 bg-white rounded-xl shadow-lg border-2 border-black p-4 flex flex-col items-center">
      <h1 class="text-lg font-bold mb-2">Player 2</h1>
      <!-- barra de vida enemigo-->
      <div class="w-full bg-gray-300 rounded-md overflow-hidden h-6 mb-2">
        <div 
            class="bg-indigo-700 h-full text-center text-white font-bold transition-all duration-300"
            :style="{ width: enemyCharacter.life + '%' }"
          >
            {{ enemyCharacter.life }}
          </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <button 
          @click="attack(1, 5, 10)"
          class="bg-red-500 py-2 rounded-lg text-white"
        >Attack</button>
        <button 
          @click="attack(1, 3, 20)"
          class="bg-blue-500 py-2 rounded-lg text-white"
        >Special Attack</button>
        <button 
          @click="healing(1, enemyCharacter)"
          class="bg-green-200 py-2 rounded-lg"
        >Sanity {{ enemyCharacter.limit_cures }} / 5</button>
      </div>
    </section>
  </main>
</template>


