import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {EditIssueDetails,getIssueDetails,getMetaData} from '../../api/apiCalls';

import './index.css';


const IssueShowDetails = ({ issue,set_issue }) => {
    const [issue_data,setissue_data] = useState({});
    const [points,setPoints] = useState();

    useEffect(()=>{
        setissue_data(issue);
        setPoints(issue.fields.customfield_10032);
    },[issue]);

    const EditIsuueDetail = (points) =>{
        if(points && points > 0){
        const data ={
            "fields": {
                "customfield_10032": [
                    {"value":points}
                ]
            }
        }
        EditIssueDetails(issue_data.key,data).then(()=>{
            getIssueDetails(issue_data.id).then(res=>{
                setissue_data(res)
            });
        })
        }else{
            setPoints(issue_data.fields.customfield_10032)
        }

    }


    const openURL= ()=>{
        window.open(`/browse/${issue_data.key}`, '_blank');
    }
    
    return (
        <div>
            <div className="estimate">
                {/* <p>Estimate: <input value={points} type="number" onBlur={(e)=>EditIsuueDetail(points)} onChange={(e)=>setPoints(e.target.value)}/></p> */}
           </div>
            <div className="issue_desc">
                <button className="back-btn" onClick={()=>set_issue({})}><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            { issue_data && Object.keys(issue_data).length > 0 && <>
            <div  className="story-heading"><a onClick={openURL} >{issue_data.key}</a>
                <h3>{issue_data.fields.summary}</h3></div>
                <div><h6>Description: </h6>
                    <div class="field"><ReactMarkdown source={issue_data.fields.description} escapeHtml={false} /></div>
                    </div>
                
                </>}
            </div>
        </div>

    )
}

export default IssueShowDetails;