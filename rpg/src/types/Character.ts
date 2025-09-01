export interface Character {
    life: number;
    turn: boolean;
    limit_cures: number;
    limit_special_attack: number;
}
  
export const defaultCharacter: Character = {
    life: 100,
    turn: false,
    limit_cures: 7,
    limit_special_attack: 5,
}