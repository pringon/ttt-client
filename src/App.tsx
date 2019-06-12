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

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
