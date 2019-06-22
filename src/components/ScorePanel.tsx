import React from 'react';
import { connect } from 'react-redux';

import './ScorePanel.css'

import { AppState } from '../store';
import { PlayerState } from '../store/player/types';

const mapStateToProps = (state: AppState) => ({
  wins: state.player.wins,
  losses: state.player.losses,
  draws: state.player.draws,
});

interface Props {
  style?: React.CSSProperties;
  wins: PlayerState['wins'];
  losses: PlayerState['losses'];
  draws: PlayerState['draws'];
}

const ScorePanel: React.FunctionComponent<Props> = ({ style, wins, losses, draws }) => (
  <div
    className='score-panel'
    style={style} 
  >
    Wins: { wins } Draws: { draws } Losses: { losses }
  </div>
);

export default connect(mapStateToProps)(ScorePanel);