import { PlayerState } from './types';
import { TakeMoveAction, TAKE_MOVE } from '../board/types';

export const initialState: PlayerState = {
  acting: true,
};

export const playerReducer = (state = initialState, action: TakeMoveAction): PlayerState => {
  switch (action.type) {
    case TAKE_MOVE:
      return {
        ...state,
        acting: action.payload.symbol === 'X' ? false : true,
      }
    default:
      return state;
  }
};