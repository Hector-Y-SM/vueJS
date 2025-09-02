import { defaultCharacter, type Character } from '../types/Character.ts';
import { validateTurn, validateCures, limitLife, initGame, statusGame, limitSpecialAttack } from './game-logic.ts';

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
    yourCharacter: Character, 
    enemyCharacter: Character) => {
        if(!statusGame(yourCharacter, enemyCharacter)){
          return '';
        }

        if (!validateTurn(player, yourCharacter, enemyCharacter)) {
          return '';
        }

        if (!player && damage == 20) {
          if(!limitSpecialAttack(yourCharacter)){
            return `You have no special attacks left, player 1`
          }
        } else if (player && damage == 20){
          if(!limitSpecialAttack(enemyCharacter)){
            return `You have no special attacks left, player 2`
          }
        }

        if (Math.floor((Math.random() * 10) + 1) > probability){
          if (!player){
            enemyCharacter.life -= damage;
            damage == 20? yourCharacter.limit_special_attack -=1 : null;
            endTurn(player, yourCharacter, enemyCharacter)
            return `Player 1 landed their ${damage == 10? 'basic': 'special'} attack`
          } else {
            yourCharacter.life -= damage;
            damage == 20? enemyCharacter.limit_special_attack -=1 : null;
            endTurn(player, yourCharacter, enemyCharacter);
            return `Player 2 landed their ${damage == 10? 'basic': 'special'} attack`
          }
        } else {
          endTurn(player, yourCharacter, enemyCharacter);
          damage == 20 ? 
                      !player? 
                      yourCharacter.limit_special_attack -=1
                      :
                      enemyCharacter.limit_special_attack -=1
          : null;  
          return `Player ${!player ? '1' : '2'} missed her ${damage == 10? 'basic': 'special'} attack`
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
    yourCharacter: Character, 
    enemyCharacter: Character) => {
        if (!statusGame(yourCharacter, enemyCharacter)){
          return '';
        }

        if (!validateTurn(player, yourCharacter, enemyCharacter)) {
          return '';
        }

        if (!validateCures(character)){
          return `you ran out of healing items ${!player ? '1' : '2'}, make another move`;
        }

        if (limitLife(character)){
          return `You have maximum health, player. ${!player ? '1' : '2'}, make another move`;
        }

        if (!player){
          yourCharacter.life += 10;
          yourCharacter.limit_cures--;
          endTurn(player, yourCharacter, enemyCharacter);
          return `Player 1 regained 10 health points.`;
        } else {
          enemyCharacter.life += 10;      
          enemyCharacter.limit_cures--;
          endTurn(player, yourCharacter, enemyCharacter);
          return `Player 2 regained 10 health points.`;
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
    yourCharacter: Character, 
    enemyCharacter: Character) => {
        if (!player) {
          yourCharacter.turn = false;
          enemyCharacter.turn = true;
        } else {
          enemyCharacter.turn = false;
          yourCharacter.turn = true;
        }
};

/**
 * Resets the game to its initial values
 * @param yourCharacter - Reference to player 1's character
 * @param enemyCharacter - Reference to player 2's character
 */
export const restartGame = (    
  yourCharacter: Character, 
  enemyCharacter: Character) => {
    Object.assign(yourCharacter, defaultCharacter);
    Object.assign(enemyCharacter, defaultCharacter);

    initGame(yourCharacter, enemyCharacter);
}