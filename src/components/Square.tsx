import React from 'react';

import { Square as SquareSymbol, TakeMoveAction } from '../store/board/types';

interface Props {
  action?: () => TakeMoveAction;
  symbol: SquareSymbol;
}

const Square: React.FC<Props> = ({ symbol, action }) => (
  <div className='square'
    style={{
      width: '100px',
      height: '100px',
      border: '2px solid black',
      float: 'left',
    }}
    onClick={action}
  >
    { symbol }
  </div>
);

export default Square;