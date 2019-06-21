import { boardReducer } from './board/reducers';
import { playerReducer } from './player/reducers';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  board: boardReducer,
  player: playerReducer,
});

export const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;