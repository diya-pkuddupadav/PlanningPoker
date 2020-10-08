import React from 'react';
import './index.scss';

const PointsBoard = ()=>{
    const points = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, `?`];

    return(
        <div className="points-table">
          <h3>Points</h3>  
            {points.map((o)=><button value={o}>{o}</button>)}
        </div>
    )
}

export default PointsBoard;