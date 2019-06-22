import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import './Board.css';

import Square from './Square';

import { AppState } from '../store';
import { takeMove } from '../store/board/actions';
import { gameEnded } from '../store/player/actions';
import {
  BoardState,
  Position,
  Move,
  Board as BoardType,
  Square as SquareType,
  TakeMoveAction,
} from '../store/board/types';
import { 
  PlayerState,
  Record,
  GameEndedAction
} from '../store/player/types';

const mapStateToProps = (state: AppState) => ({
  ...state.board,
  acting: state.player.acting,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  takeMove: (payload: Move) => dispatch(takeMove(payload)),
  gameEnded: (payload: Record) => dispatch(gameEnded(payload)),
});

type TakeMoveDispatcher = (payload: Move) => TakeMoveAction;
type GameEndedDispatcher = (payload: Record) => GameEndedAction;

interface Props extends BoardState {
  style?: React.CSSProperties;
  acting: PlayerState['acting'];
  takeMove: TakeMoveDispatcher;
  gameEnded: GameEndedDispatcher;
}

interface EngineResponse {
  winner?: SquareType;
  move?: Position;
  draw: boolean;
}

const genMove = (symbol: SquareType) => 
  (x: number, y: number): Move => ({
    symbol,
    position: [x, y],
});

const validateBody = (body: any): EngineResponse => {
  if (!body) {
    throw Error('Request body could not be properly parsed.');
  }
  const { draw, winner, move } = body;
  if (typeof draw != 'boolean') {
    throw Error(`Property draw is expected to be a boolean. It is instead a ${typeof draw}.`);
  }
  if (!!winner && winner != 'X' && winner != 'O') {
    throw Error('Unexpected winner symbol. Expecting either X or O.');
  }
  if (!!move && !Array.isArray(move) && (move.length != 2 || typeof move[0] != 'number' || typeof move[1] != 'number')) {
    throw Error('Unexpected move type. Expecting a tuple of the form [number, number].');
  }
  return body;
};

const handleMove = (takeMove: TakeMoveDispatcher, movePosition: Position) => {
  const move = genMove('O')(...(movePosition));
  takeMove(move);
}

const handleRecord = (gameEnded: GameEndedDispatcher,draw: boolean, winner?: SquareType,) => {
  if (!!winner) {
    return gameEnded(winner == 'X' ? 'wins' : 'losses');
  }
  if (draw) {
    return gameEnded('draws');
  }
}

const takeEngineMove = async (
  board: BoardType, takeMove: TakeMoveDispatcher, gameEnded: GameEndedDispatcher
) => {
  const options: RequestInit = { 
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(board),
  };
  const response = await fetch('http://localhost:3001/', options);
  const rawBody = await response.text();
  const body: EngineResponse = validateBody(JSON.parse(rawBody));
  const { winner, move, draw } = body;
  if (!!move) {
    handleMove(takeMove, move);
  }
  handleRecord(gameEnded, draw, winner,);

};

const Board: React.FunctionComponent<Props> = ({ style, board, acting, takeMove, gameEnded }) => {
  const genPlayerMove = genMove('X');
  if (!acting) {
    takeEngineMove(board, takeMove, gameEnded);
  }
  return (
    <div 
      className='board'
      style={style}
    >
      {
        board.map((line, row) => (
          <div
            key={row}
            className='row'
          >
            { line.map((square, col) => {
                let action = undefined;
                if (square === '') {
                  action = () => takeMove(genPlayerMove(row, col));
                }
                return (
                  <Square 
                    className='square'
                    acting={acting} 
                    action={action} 
                    key={`${row}-${col}`} 
                    symbol={square} 
                  />
                );
              })
            }
          </div>
        ))
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);