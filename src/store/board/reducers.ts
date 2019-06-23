import {
  Board,
  Square,
  Move,
  BoardState,
  TakeMoveAction,
  TAKE_MOVE,
} from './types';
import {
  GameEndedAction,
  GAME_ENDED,
} from '../player/types';

const clearBoard: Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const wipeBoard = (): Board => clearBoard.map(row => Array.from(row));

const takeMove = (board: Board, move: Move): Board => {
  const { symbol, position: [x, y] } = move;
  if (x === 99 || y === 99) {
    return board;
  }
  if (board[x][y] !== '') {
    throw Error('Cannot take move on non-empty square');
  }
  const newBoard = Array.from(board);
  newBoard[x][y] = symbol;
  return newBoard;
};

export const initialState: BoardState = {
  board: wipeBoard(),
};

type BoardAction = TakeMoveAction | GameEndedAction
export const boardReducer = (state = initialState, action: BoardAction) => {
  switch (action.type) {
    case TAKE_MOVE:
      const newBoard = takeMove(state.board, action.payload);
      return Object.assign({}, state, {
        board: newBoard,
      });
    case GAME_ENDED:
      return Object.assign({}, state, {
        board: wipeBoard(),
      });
    default:
      return state;
 }
};