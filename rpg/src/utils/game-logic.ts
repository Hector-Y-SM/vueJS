import type { Character } from "@/types/Character";
import type { Ref } from 'vue';

/**
 * Validates if it is the current player's turn
 * @param player - Number identifying the player (0 for player 1, 1 for player 2)
 * @param yourCharacter - Player 1's character
 * @param enemyCharacter - Player 2's character
 * @returns true if it is the player's turn, false otherwise
 */
export   const validateTurn = (player: number, yourCharacter: Character, enemyCharacter: Character) => {
    if (!player && !yourCharacter.turn) {
      return false;
    }

    if (player && !enemyCharacter.turn) {
      return false;
    }

    return true;
  };

/**
 * Checks if the character has healing actions available
 * @param character - Character to check
 * @returns true if healing actions are available, false otherwise
 */
export const validateCures = (character: Character) => {
    return character.limit_cures > 0
};

/**
 * Checks if the character's health is at maximum (100)
 * @param character - Character to check
 * @returns true if health is at maximum, false otherwise
 */
export const limitLife = (character: Character) => {
    return character.life == 100;
};

/**
 * Checks if the character has special attacks available
 * @param character - Character to check
 * @returns true if special attacks are available, false otherwise
 */
export const limitSpecialAttack = (character: Character) => {
  return character.limit_special_attack > 0;
};

/**
 * Starts the game by randomly assigning the first turn to one of the players
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 */
export const initGame= (yourCharacter: Ref<Character>, enemyCharacter: Ref<Character>) => {
  Math.floor((Math.random() * 10) + 1) > 5? yourCharacter.value.turn = true : enemyCharacter.value.turn = true;
}

/**
 * Checks if the game should continue (both players have life > 0)
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 * @returns true if the game should continue, false if a player has lost
 */
export const statusGame = (yourCharacter: Ref<Character>, enemyCharacter: Ref<Character>) => {
  if(yourCharacter.value.life <= 0 || enemyCharacter.value.life <= 0){
    return false;
  }
  return true;
}