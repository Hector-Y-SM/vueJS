import type { Character } from '../types/Character.ts';
import { validateTurn, validateCures, limitLife, initGame, statusGame, limitSpecialAttack } from './game-logic.ts';
import type { Ref } from 'vue';
  
/**
 * Executes an attack from one player against the other
 * @param player - Number identifying the player (0 for player 1, 1 for player 2)
 * @param probability - Probability that the attack will hit
 * @param damage - Amount of damage to deal (10 for basic attack, 20 for special)
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 * @returns Message indicating the result of the attack or an empty string if invalid
 */

export const attack = ( 
    player: number, 
    probability: number, 
    damage: number,   
    yourCharacter: Ref<Character>, 
    enemyCharacter: Ref<Character>) => {
        if(!statusGame(yourCharacter, enemyCharacter)){
          return '';
        }

        if (!validateTurn(player, yourCharacter.value, enemyCharacter.value)) {
          return '';
        }

        if (!player && damage == 20) {
          if(!limitSpecialAttack(yourCharacter.value)){
            return `te quedaste sin ataques especiales juagador 1`
          }
        } else if (player && damage == 20){
          if(!limitSpecialAttack(enemyCharacter.value)){
            return `te quedaste sin ataques especiales juagador 2`
          }
        }

        if (Math.floor((Math.random() * 10) + 1) > probability){
          if (!player){
            enemyCharacter.value.life -= damage;
            damage == 20? yourCharacter.value.limit_special_attack -=1 : null;
            endTurn(player, yourCharacter, enemyCharacter)
            return `jugador 1 acerto su ataque ${damage == 10? 'basico': 'especial'}`
          } else {
            yourCharacter.value.life -= damage;
            damage == 20? enemyCharacter.value.limit_special_attack -=1 : null;
            endTurn(player, yourCharacter, enemyCharacter);
            return `jugador 2 acerto su ataque ${damage == 10? 'basico': 'especial'}`
          }
        } else {
          endTurn(player, yourCharacter, enemyCharacter);
          damage == 20 ? 
                      !player? 
                      yourCharacter.value.limit_special_attack -=1
                      :
                      enemyCharacter.value.limit_special_attack -=1
          : null;  
          return `jugador ${!player ? '1' : '2'} fallo su ataque ${damage == 10? 'basico': 'especial'}`
        }
}; 
/**
 * Executes a healing action for the selected player
 * @param player - Number identifying the player (0 for player 1, 1 for player 2)
 * @param character - Character performing the healing
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 * @returns Message indicating the result of the healing or an error message
 */

export const healing = (
    player: number, 
    character: Character, 
    yourCharacter: Ref<Character>, 
    enemyCharacter: Ref<Character>) => {
        if (!statusGame(yourCharacter, enemyCharacter)){
          return '';
        }

        if (!validateTurn(player, yourCharacter.value, enemyCharacter.value)) {
          return '';
        }

        if (!validateCures(character)){
          return `te quedaste sin curaciones jugador ${!player ? '1' : '2'}, haz otro movimiento`;
        }

        if (limitLife(character)){
          return `tienes la salud al maximo jugador ${!player ? '1' : '2'}, haz otro movimiento`;
        }

        if (!player){
          yourCharacter.value.life += 10;
          yourCharacter.value.limit_cures--;
          endTurn(player, yourCharacter, enemyCharacter);
          return `jugador 1 recupero 10 puntos de vida`;
        } else {
          enemyCharacter.value.life += 10;      
          enemyCharacter.value.limit_cures--;
          endTurn(player, yourCharacter, enemyCharacter);
          return `jugador 2 recupero 10 puntos de vida`;
        }
};

/**
 * Ends the current turn and switches to the next player
 * @param player - Number identifying the current player (0 for player 1, 1 for player 2)
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 */

export const endTurn = (
    player: number, 
    yourCharacter: Ref<Character>, 
    enemyCharacter: Ref<Character>) => {
        if (!player) {
          yourCharacter.value.turn = false;
          enemyCharacter.value.turn = true;
        } else {
          enemyCharacter.value.turn = false;
          yourCharacter.value.turn = true;
        }
};

/**
 * Resets the game to its initial values
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 */

export const restartGame = (    
  yourCharacter: Ref<Character>, 
  enemyCharacter: Ref<Character>) => {
    yourCharacter.value.life = 100;
    yourCharacter.value.limit_cures = 6;
    yourCharacter.value.turn = false;
    yourCharacter.value.limit_special_attack = 4;
    enemyCharacter.value.life = 100;
    enemyCharacter.value.limit_cures = 6;
    enemyCharacter.value.turn= false;
    yourCharacter.value.limit_special_attack = 4;

    initGame(yourCharacter, enemyCharacter);
}