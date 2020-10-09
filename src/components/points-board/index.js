import React from 'react';
import './index.css';
import {savePoints} from '../../api/apiCalls';

const PointsBoard = ({issue})=>{
    const points = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100, `?`];

    const updatePoints = (point)=>{
        let user_detail = JSON.parse(localStorage.getItem('user_details'))
        let data ={
            "issue": issue.key,
            "people":{}
        }
        data.people[user_detail.account_id] = point;
        savePoints(data).then((res)=>{
            console.log('saved');
        })
    }

    return(
        <div className="points-table">
          <h3>Points</h3>  
            {points.map((o)=><button value={o} onClick={()=>{updatePoints(o)}}>{o}</button>)}
        </div>
    )
}

export default PointsBoard;