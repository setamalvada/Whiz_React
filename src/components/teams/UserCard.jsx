import "./userCard.scss";
import React from "react";

export default function UserCard({ username, counter, team, avatar, id }) {
  return (
    <div class="flex-container">
      <div>
        <img class="teamcard" src={avatar} alt="Card image cap" />
      </div>
      <div class="teamcard">
        <h4 class="username">{username}</h4>
        <p class="nowrap">Faction: {team}</p>
        <p class="nowrap">{counter} places hacked</p>
        <a href={`/user/${id}`} class="myButton">
          Vier profile
        </a>
      </div>
    </div>
  );
}
