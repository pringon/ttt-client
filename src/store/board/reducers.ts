import {
  Board,
  Move,
  BoardState,
  TakeMoveAction,
  TAKE_MOVE,
} from './types';

export const initialState: BoardState = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  finished: false,
};

const takeMove = (board: Board, move: Move): Board => {
  const { symbol, position: [x, y] } = move;
  if (board[x][y] !== '') {
    throw Error('Cannot take move on non-empty square');
  }
  const newBoard = Array.from(board);
  newBoard[x][y] = symbol;
  return newBoard;
};

// Implementation required!
const isFinished = (board: Board): boolean => false;

export const boardReducer = (state = initialState, action: TakeMoveAction): BoardState => {
 switch (action.type) {
   case TAKE_MOVE:
    const newBoard = takeMove(state.board, action.payload);
    return {
      ...state,
      board: newBoard,
      finished: isFinished(newBoard),
    };
   default:
    return state;
 }
};