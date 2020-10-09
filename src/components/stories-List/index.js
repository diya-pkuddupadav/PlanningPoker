import React, { useState } from 'react';
import IssueDescription from '../issue-description';
import PeopleList from '../people-list';
import PointsBoard from '../points-board';
import './index.css';

const StoriesList = ({ data , people}) => {
    const [s_issue, set_issue] = useState({});
    const [storyType, setSToryType] = useState("pending");
    const showSTory = (points)=>{
        if(storyType == 'pending'){
            if(points && points > 0){
                return false;
            } else{
                return true;
            }
        }else{
            if(points && points > 0){
                return true;
            } else{
                return false;
            }
        }
    }

    return (
        <>
        <div className="col-md-8">
            <div className="stories_list boxbg container">
            {(!s_issue || Object.keys(s_issue).length == 0) &&
                <>
               <div className="row heading">
                <div className="col-md-8 col-sm-6">
                    <ul className="nav nav-tabs tab">
                        <li className="nav-item" onClick={()=>setSToryType('pending')}><a className={`${storyType =='pending'?'active':''} nav-link`}>Pending</a></li>
                        <li className="nav-item" onClick={()=>setSToryType('ready')}><a className={`${storyType =='ready'?'active':''} nav-link`}>Ready</a></li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6">
                    <button className="sync"><i class="fa fa-spin fa-refresh" aria-hidden="true"></i></button>
                </div>
            </div>
            <ul className="list-section">
            {Array.isArray(data) && data.length > 0 && 
                data.map((o,i)=>showSTory(o.fields.customfield_10032) && <li key={o.id}><a onClick={()=>{set_issue(o)}}>{o.key}</a><span className="summary">{o.fields.summary}</span><span className="points">{o.fields.customfield_10032}</span></li>)}
            </ul>
                </>
            }
            {s_issue && Object.keys(s_issue).length > 0 && <>
                <PointsBoard issue={s_issue}/>
                <IssueDescription issue={s_issue} set_issue={set_issue}/>
            </>}
            </div>
        </div>
        <PeopleList data={people} s_issue={s_issue}/>
        </>
    );
}

export default StoriesList;