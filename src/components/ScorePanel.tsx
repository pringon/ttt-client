import React from 'react';

import './ScorePanel.css'

interface Props {
  style?: React.CSSProperties;
}

const ScorePanel: React.FunctionComponent<Props> = ({ style }) => (
  <div
    className='score-panel'
    style={style} 
  >
    Wins: 0 Draws: 0 Losses: 0
  </div>
);

export default ScorePanel;