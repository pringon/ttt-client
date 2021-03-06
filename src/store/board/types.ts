export type Square = 'X' | 'O' | '';
export type Board = Square[][];

export interface BoardState {
  board: Board;
}

// Tuple containing x and y position of square on the board.
export type Position = [number, number];
export interface Move {
  symbol: Square;
  position: Position;
}

export const TAKE_MOVE = 'TAKE_MOVE';
export interface TakeMoveAction {
  type: typeof TAKE_MOVE;
  payload: Move;
}