import { createStore, combineReducers, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { boardReducer } from './board/reducers';
import { playerReducer } from './player/reducers';

const rootReducer = combineReducers({
  board: boardReducer,
  player: playerReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type AppState = ReturnType<typeof rootReducer>;