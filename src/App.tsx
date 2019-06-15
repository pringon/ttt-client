import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from './store';
import { BoardState, Move } from './store/board/types';
import { takeMove } from './store/board/actions';

import logo from './logo.svg';
import './App.css';

const mapStateToProps = (state: AppState) => state.board;
const mapDispatchToProps = (dispatch: Dispatch) => ({
  takeMove: (payload: Move) => dispatch(takeMove(payload)),
});

interface AppProps extends BoardState {
  takeMove: typeof takeMove;
}

const App: React.FC<AppProps> = ({ board, finished, takeMove }) => {
  return (
    <div className="App">
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
