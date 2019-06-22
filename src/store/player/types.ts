export interface PlayerState {
  acting: boolean;
  wins: number;
  losses: number;
  draws: number;
}

export type Record = 'wins' | 'losses' | 'draws';
export const GAME_ENDED = 'GAME_ENDED';
export interface GameEndedAction {
  type: typeof GAME_ENDED;
  payload: Record;
};