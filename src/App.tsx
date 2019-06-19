import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Square from './components/Square';

import { AppState } from './store';
import { BoardState, Move, Square as SquareSymbol, TakeMoveAction } from './store/board/types';
import { takeMove } from './store/board/actions';
import { PlayerState } from './store/player/types';

const mapStateToProps = (state: AppState) => ({
  ...state.board,
  acting: state.player.acting,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  takeMove: (payload: Move) => dispatch(takeMove(payload)),
});

interface AppProps extends BoardState, PlayerState {
  takeMove: (payload: Move) => TakeMoveAction;
}

const genMove = (symbol: SquareSymbol) => 
  (x: number, y: number): Move => ({
    symbol,
    position: [x, y],
});

const App: React.FunctionComponent<AppProps> = ({ board, finished, acting, takeMove }) => {
  const genPlayerMove = genMove('X');
  return (
    <div className="App"
      style={{
        height: '312px',
        width: '312px',
      }}
    >
      {
        board.map((line, row) => (
          <div
            key={row}
            style={{
              height: '104px',
              width: '312px',
            }}
          >
            { line.map((square, col) => {
                let action = undefined;
                if (square === '') {
                  action = () => takeMove(genPlayerMove(row, col));
                }
                return (<Square acting={acting} action={action} key={`${row}-${col}`} symbol={square} />);
              })
            }
          </div>
        ))
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
