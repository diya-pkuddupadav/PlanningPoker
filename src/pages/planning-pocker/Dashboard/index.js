import React, { useEffect, useState } from 'react';
// import Search from '../../../components/Search';
import StoriesList from '../../../components/stories-List';
import './index.css';
// import data from '../../../helpers/constants';
import {getProjectPeople, searchIsuue, getAllData} from '../../../api/apiCalls';

const Dashboard = ({ project }) => {
    const [s_Project, setS_Project] = useState({});
    const [people,setPeople] = useState([]);
    const [issue,setIssue] = useState({});
    const [allData, setAllData] = useState({});

    useEffect(()=>{
        getAllData().then((data)=>{
            setAllData(data);
            console.log('allData',data);
        });
    },[])

    useEffect(() => {
        if (Array.isArray(project) && project.length > 0) {
            setS_Project(project[0]);
            getPeopleList();
            getIssueList(project[0]);
            
        }
    }, [project])

    useEffect(()=>{
        getPeopleList();
        getIssueList(s_Project);
    },[s_Project])

    const getPeopleList = ()=>{
        getProjectPeople(s_Project.id).then((data)=>{
            setPeople(data)
        })
    }

    const getIssueList = (project) =>{
        searchIsuue(project).then((data)=>{
            setIssue(data);
        });
    }

    return (
        <div className="main-div"> 
            <div className="container-head container-fluid">
                <div className="row">
                    <div className="col-md-9">
                       <div className="backButton">
                         <button className="back-btn" onClick={(ev) => { window.history.back()}}>
                           <i class="fa fa-arrow-left" aria-hidden="true"></i>
                         </button>
                         <h3>Planning Poker</h3>
                       </div>
                    </div> 
                    {
                        Array.isArray(project) && project.length > 0 &&
                        <div className="col-md-3 text-right">Select Project: 
                            <select defaultValue={s_Project.name} onChange={(event) => { setS_Project(project[event.target.value]) }}>
                                {project.map((data, i) => <option value={i}>{data.name}</option>)}
                            </select>
                        </div>
                    }
                </div>
            </div>
            <div className="container-stories container-fluid">
                <div className="row">
                    {issue && issue.issues && <StoriesList data={issue.issues || []} people={people}/>}
                   
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
