import type { Character } from "@/types/Character";

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