import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Square from './components/Square';

import { AppState } from './store';
import { BoardState, Move, Square as SquareSymbol, TakeMoveAction } from './store/board/types';
import { takeMove } from './store/board/actions';

const mapStateToProps = (state: AppState) => {
  console.log(state);
  return state.board;
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  takeMove: (payload: Move) => moveLogger(payload)(() => dispatch(takeMove(payload))),
});

const moveLogger = (move: Move) => (fn: () => TakeMoveAction) => () => {
  console.log(move);
  return fn();
}

interface AppProps extends BoardState {
  takeMove: (arg0: Move) => () => TakeMoveAction;
}

const genMove = (symbol: SquareSymbol) => 
  (x: number, y: number): Move => ({
    symbol,
    position: [x, y],
});

const App: React.FunctionComponent<AppProps> = (props) => {
  const genPlayerMove = genMove('X');
  console.log(props);
  return (
    <div className="App"
      style={{
        height: '312px',
        width: '312px',
      }}
    >
      {
        props.board.map((line, row) => (
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
                  action = props.takeMove(genPlayerMove(row, col));
                }
                return (<Square action={action} key={`${row}-${col}`} symbol={square} />);
              })
            }
          </div>
        ))
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
