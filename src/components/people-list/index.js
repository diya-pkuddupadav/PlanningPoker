import React, { Component } from 'react';
import './index.scss';

const PeopleList = ({ data }) => {
    return (
        <div className="col-md-4">
            <div className="people_list boxbg container">
                <div className="row heading">
                    Members
                    <div className="action-icons">
                      <ul>
                        <li><button><i class="fa fa-user-plus" aria-hidden="true"></i></button></li>
                        <li><button><i class="fa fa-user-times" aria-hidden="true"></i></button></li>
                      </ul>
                    </div>
                </div>
                <ul className="list">
                    {
                        data && data.length > 0 && 
                        data.map((user,i)=>user.accountType == 'atlassian' && <li><img src={user.avatarUrls['16x16']}/>{user.displayName}</li>)
                    }
                    
                </ul>
            </div>
        </div>
    );
}

export default PeopleList;