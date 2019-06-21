import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import './Board.css';

import Square from './Square';

import { AppState } from '../store';
import { takeMove } from '../store/board/actions';
import {
  BoardState,
  Move,
  Board as BoardType,
  Square as SquareType,
  TakeMoveAction
} from '../store/board/types';
import { PlayerState } from '../store/player/types';

const mapStateToProps = (state: AppState) => ({
  ...state.board,
  acting: state.player.acting,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  takeMove: (payload: Move) => dispatch(takeMove(payload)),
});

interface Props extends BoardState, PlayerState {
  style?: React.CSSProperties;
  takeMove: (payload: Move) => TakeMoveAction;
}

const genMove = (symbol: SquareType) => 
  (x: number, y: number): Move => ({
    symbol,
    position: [x, y],
});

const takeEngineMove = async (board: BoardType, takeMove: (payload: Move) => TakeMoveAction) => {
  console.log(JSON.stringify(board));
  const response = await fetch('http://localhost:3001/', { 
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(board),
  });
  const rawBody = await response.text();
  const movePosition: [number, number] = JSON.parse(rawBody);
  console.log(movePosition);
  if (!Array.isArray(movePosition) || movePosition.length !== 2) {
    throw Error('Backend service is unavailable.');
  }
  const move = genMove('O')(...movePosition);
  takeMove(move);
};

const Board: React.FunctionComponent<Props> = ({ style, board, finished, acting, takeMove }) => {
  const genPlayerMove = genMove('X');
  if (!acting) {
    takeEngineMove(board, takeMove);
  }
  if (finished) {
    return (<div>Congrats, you are a loser anyway!</div>)
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