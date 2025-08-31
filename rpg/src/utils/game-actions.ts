import type { Character } from '../types/Character.ts';
import { validateTurn, validateCures, limitLife } from './game-logic.ts';
import type { Ref } from 'vue';
  
  /**
   * Reusable function for basic and special attacks by player 1 and CPU/player 2
   * @param player player who will make the atatck
   * @param probability possibility of causing harm to the other player
   * @param damage amount of damage done by the basic or special attack
   */
export const attack = ( 
    player: number, 
    probability: number, 
    damage: number,   
    yourCharacter: Ref<Character>, 
    enemyCharacter: Ref<Character>) => {
        if (!validateTurn(player, yourCharacter.value, enemyCharacter.value)) {
          return;
        }

        if (Math.floor((Math.random() * 10) + 1) > probability){
          if (!player){
            enemyCharacter.value.life -= damage;
            endTurn(player, yourCharacter, enemyCharacter)
          } else {
            yourCharacter.value.life -= damage;
            endTurn(player, yourCharacter, enemyCharacter)
          }
        } else {
          endTurn(player, yourCharacter, enemyCharacter);
        }
}; 


export const healing = (
    player: number, 
    character: Character, 
    yourCharacter: Ref<Character>, 
    enemyCharacter: Ref<Character>) => {
        if (!validateTurn(player, yourCharacter.value, enemyCharacter.value)) {
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
          endTurn(player, yourCharacter, enemyCharacter)
        } else {
          enemyCharacter.value.life += 10;      
          enemyCharacter.value.limit_cures--
          endTurn(player, yourCharacter, enemyCharacter)
        }
};

export const endTurn = (
    player: number, 
    yourCharacter: Ref<Character>, 
    enemyCharacter: Ref<Character>) => {
        if (!player) {
          console.log('atack p1');
          yourCharacter.value.turn = false;
          enemyCharacter.value.turn = true;
        } else {
          console.log('atack p2');
          enemyCharacter.value.turn = false;
          yourCharacter.value.turn = true;
        }
};

export const restartGame = (    
  yourCharacter: Ref<Character>, 
  enemyCharacter: Ref<Character>) => {
    yourCharacter.value.life = 100;
    yourCharacter.value.limit_cures = 5;
    yourCharacter.value.turn = true;
    enemyCharacter.value.life = 100;
    enemyCharacter.value.limit_cures = 5;
    enemyCharacter.value.turn= false;
}