import React from 'react';

import { Square as SquareType, TakeMoveAction } from '../store/board/types';

interface Props {
  className: string;
  action?: () => TakeMoveAction;
  symbol: SquareType;
  acting: boolean;
}

const Square: React.FC<Props> = ({ className, symbol, acting, action }) => (
  <div 
    className={className}
    onClick={acting ? action : undefined}
  >
    { symbol }
  </div>
);

export default Square;