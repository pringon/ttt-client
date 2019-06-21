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

// Implementation required!
const isFinished = ({ position: [x, y] }: Move) => x === 99 && y === 99;

export const boardReducer = (state = initialState, action: TakeMoveAction) => {
 switch (action.type) {
   case TAKE_MOVE:
    const newBoard = takeMove(state.board, action.payload);
    return {
      ...state,
      board: newBoard,
      finished: isFinished(action.payload),
    };
   default:
    return state;
 }
};