import { Record, GAME_ENDED, GameEndedAction } from './types';

export const gameEnded = (record: Record): GameEndedAction => ({
  type: GAME_ENDED,
  payload: record,
})