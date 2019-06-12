import { initialState, boardReducer } from './board/reducers';
import { BoardState } from './board/types';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  board: boardReducer,
});

interface RootState {
  board: BoardState;
}
const defaultState: RootState = {
  board: initialState
};

export const configureStore = (state: RootState = defaultState): Store => {
  return createStore(rootReducer, state);
};

export type AppState = ReturnType<typeof rootReducer>;