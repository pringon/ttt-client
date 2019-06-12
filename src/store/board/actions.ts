import { Move, TAKE_MOVE, TakeMoveAction } from './types';

export const takeMove = (move: Move): TakeMoveAction => {
  return {
    type: TAKE_MOVE,
    payload: move,
  };
};