import { yellowTeam } from "../../services/api.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";

import "./userCard.scss";

export default function YellowList({ onLogOut }) {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    yellowTeam()
      .then((user) => setUserList(user))
      .catch((e) => {
        debugger;
        if (e.response.status === 401) {
          onLogOut();
        } else {
          setError(true);
        }
      });
  }, []);

  const data = userList;

  const result = data.sort();

  const result2 = result.slice(0, 3);

  console.log(result2);

  if (error) {
    return <div>There was an error sending the request</div>;
  }

  if (userList.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="background-theme">
          <div>Top 3 hackers</div>
          <VictoryChart domainPadding={50}>
            <VictoryBar
              style={{
                data: { fill: "yellow" },
                parent: { border: "1px solid purple" },
              }}
              data={result2}
              x="username"
              y="counter"
            />
          </VictoryChart>
        </div>
        <div className="PurpleList">
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
