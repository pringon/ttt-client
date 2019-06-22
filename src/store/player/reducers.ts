import { 
  PlayerState,
  GAME_ENDED,
  GameEndedAction,
} from './types';
import { TakeMoveAction, TAKE_MOVE } from '../board/types';
import { objectTypeSpreadProperty } from '@babel/types';

export const initialState: PlayerState = {
  acting: true,
  wins: 0,
  losses: 0,
  draws: 0,
};

type PlayerAction = TakeMoveAction | GameEndedAction;

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case TAKE_MOVE:
      return Object.assign({}, state, {
        acting: action.payload.symbol === 'X' ? false : true,
      });
    case GAME_ENDED:
      return Object.assign({}, state, {
        acting: true,
        [action.payload]: state[action.payload] + 1,
      });
    default:
      return state;
  }
};