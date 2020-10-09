import React, { Component, useEffect, useState } from 'react';
import {getPoints, deletePoints} from '../../api/apiCalls';
import './index.scss';

const PeopleList = ({ data, s_issue }) => {

    const [points,setPoints] = useState({});
    const [view,setView] = useState(false);
    const [tpoints,setTotalPoints] = useState(0);

    const getData = ()=>{
        setView(false);
        setTotalPoints(0);
        if(s_issue && s_issue.id){
            getPoints(s_issue.id).then((data)=>{
              setPoints(data.data.length > 0?data.data[0]:{});
            })
        }
    }

    useEffect(()=>{
        getData();
    },[s_issue])
    
    const Calculate = () =>{
        let total = 0;
        let totalPeople = 0;
        Object.keys(points.people).map((key)=>{
            if(points.people.hasOwnProperty(key)){
            total += parseInt(points.people[key]);
            totalPeople++;
            }
        })
        setTotalPoints(parseInt(total/totalPeople));
        deletePoints(s_issue)
    }

    return (
        <div className="col-md-4">
            <div className="people_list boxbg container">
                <div className="row heading">
                    Members
                    <div className="action-icons">
                      <ul>
                        {s_issue && s_issue.id && <li><button onClick={()=>setView(true)}><i className={`fa ${view?'fa-toggle-on':'fa-toggle-off'}`}></i></button></li>}
                        {s_issue && s_issue.id && <li><button onClick={getData}><i class="fa fa-refresh"></i></button></li>}
                        <li><button><i class="fa fa-user-plus" aria-hidden="true"></i></button></li>
                        <li><button><i class="fa fa-user-times" aria-hidden="true"></i></button></li>
                      </ul>
                    </div>
                </div>
                <ul className="list">
                    {
                        data && data.length > 0 && 
                        data.map((user,i)=>user.accountType == 'atlassian' && <li><img src={user.avatarUrls['16x16']}/>{user.displayName}
                        {s_issue && Object.keys(s_issue).length> 0 && !view && <i class={`fa fa-thumbs-up ${(points && points.people && points.people.hasOwnProperty(user.accountId))?'active':'' }`}></i>}
                        {s_issue && Object.keys(s_issue).length> 0 && view && <span className="points">{(points && points.people && points.people.hasOwnProperty(user.accountId))? points.people[user.accountId] :'-'}</span>}
                        </li>)
                    }
                    
                </ul>
            </div>
        {s_issue && s_issue.id && ( tpoints <= 0 ?<button onClick={Calculate}>Calculate</button>:<span>Calculated Points: {tpoints}</span>)}
        </div>
    );
}

export default PeopleList;