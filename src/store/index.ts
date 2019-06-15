import { initialState as boardState, boardReducer } from './board/reducers';
import { BoardState } from './board/types';
import { createStore, combineReducers, Store } from 'redux';

const rootReducer = combineReducers({
  board: boardReducer,
});

interface RootState {
  board: BoardState;
}
const defaultState: RootState = {
  board: boardState,
};

export const configureStore = (state: RootState = defaultState): Store<RootState> => {
  return createStore(rootReducer, state);
};

export type AppState = ReturnType<typeof rootReducer>;