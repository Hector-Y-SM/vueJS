import type { Character } from "@/types/Character";
import type { Ref } from 'vue';

export   const validateTurn = (player: number, yourCharacter: Character, enemyCharacter: Character) => {
    if (!player && !yourCharacter.turn) {
      console.log('turn p2');
      return false;
    }

    if (player && !enemyCharacter.turn) {
      console.log('turn p1');
      return false;
    }

    return true;
  };

export const validateCures = (character: Character) => {
    return character.limit_cures > 0
};

export const limitLife = (character: Character) => {
    return character.life == 100;
};

export const initGame= (yourCharacter: Ref<Character>, enemyCharacter: Ref<Character>) => {
  Math.floor((Math.random() * 10) + 1) > 5? yourCharacter.value.turn = true : enemyCharacter.value.turn = true;
}

export const statusGame = (yourCharacter: Ref<Character>, enemyCharacter: Ref<Character>) => {
  if(yourCharacter.value.life <= 0 || enemyCharacter.value.life <= 0){
    return false;
  }
  return true;
}