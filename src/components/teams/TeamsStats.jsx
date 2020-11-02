import { displayTeam, listPlaces } from "../../services/api.service";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";

// const chartTheme = {
//   axis: {
//     style: {
//       tickLabels: {
//         // this changed the color of my numbers to white
//         fill: 'white',
//       },
//     },
//   },
// };

export default function TeamList({ onLogOut }) {
  const [userList, setUserList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    displayTeam()
      .then((user) => setUserList(user))
      .catch((e) => {
        if (e.response.status === 401) {
          onLogOut();
        } else {
          setError(true);
        }
      });
  }, []);

  useEffect(() => {
    listPlaces()
      .then((place) =>
        setPlacesList(
          place.map(function (x) {
            return x.owner;
          })
        )
      )
      .catch((e) => {
        if (e.response.status === 401) {
          onLogOut();
        } else {
          setError(true);
        }
      });
  }, []);

  const place = placesList;

  const yellow = place.filter((y) => y === "yellow").length;

  const purple = place.filter((y) => y === "purple").length;

  const none = place.filter((y) => y === "none").length;

  // console.log(none)
  // for(let i=0; i<place.length; i++){
  //   if(place[i] == "purple"){
  //     place[i] = 1;
  //   }else if(place[i] == "yellow"){
  //     place[i] = -1;
  //   }else {
  //     place[i] = 2;
  //   }
  // }

  console.log(placesList);
  // console.log(userList)
  const data = userList;

  console.log(none);

  if (error) {
    return <div>There was an error sending the request</div>;
  }

  if (userList.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="background-theme">
          <div>Nodes hacked</div>

          <VictoryPie
            colorScale={["yellow", "purple", "grey"]}
            data={[
              { x: 1, y: yellow, label: "Yellow" },
              { x: 2, y: purple, label: "Purple" },
              { x: 3, y: none, label: "Not hacked" },
            ]}
          />
        </div>
        <div className="myContainer">
        <div className="title">Nodes hacked</div>
          {userList.map((p) => (
            <UserCard
              key={p.id}
              username={p.username}
              team={p.team}
              avatar={p.avatar}
              counter={p.counter}
              id={p.id}
            />
          ))}
        </div>
      </div>
    );
  }
}
