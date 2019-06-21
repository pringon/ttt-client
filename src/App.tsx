import React from 'react';

import Board from './components/Board';
import ScorePanel from './components/ScorePanel';

const App = () => (
  <div
    style={{
      marginTop: '15vh',
    }}
  >
    <ScorePanel/>
    <Board />
  </div>
);

export default App;