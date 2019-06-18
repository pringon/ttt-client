import { boardReducer } from './board/reducers';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  board: boardReducer,
});

export const store = createStore(rootReducer);

export type AppState = ReturnType<typeof rootReducer>;