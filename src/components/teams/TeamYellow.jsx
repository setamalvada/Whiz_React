import { yellowTeam } from "../../services/api.service";
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard'
import * as V from 'victory';
import { VictoryBar } from 'victory';

export default function YellowList({ onLogOut }) {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState();
  
    useEffect(() => {
      yellowTeam()      
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

    const data =userList


  
    if (error) {
      return <div>There was an error sending the request</div>;
    }
  
    if (userList.length === 0) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <div className="YellowList">
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

      


        </div>
      );
    }
  }