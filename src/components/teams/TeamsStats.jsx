import { displayTeam } from "../../services/api.service";
import React, { Component ,useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard'


export default function TeamList({ onLogOut }) {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState();
  
    useEffect(() => {
      displayTeam()      
        .then((user) => setUserList(user))
        .catch((e) => {
            debugger
          if (e.response.status === 401) {
            onLogOut();
          } else {
            setError(true);
          }
        });
    }, []);
  
    if (error) {
      return <div>There was an error sending the request</div>;
    }
  
    if (userList.length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="TeamList">
          {userList.map((p) => (
            <UserCard
              key={p.id}
              username={p.username}
              team={p.team}
              avatar={p.avatar}
              counter={p.counter}
            />
          ))}
        </div>
      );
    }
  }