import "./userCard.scss";
import React from "react";

export default function UserCard({ username, counter, team, avatar }) {
  return (
  
       <div class="card">
          <div class="card-img-body">
          <img class="card-img" src={avatar} alt="Card image cap"/>
          </div>
          <div class="card-body">
      <h4 class="card-title">{username}</h4>
            <p class="card-text">{team}</p>
            <p class="card-text">{counter} places hacked</p>
            <a href="#" class="btn btn-outline-primary">Primary</a>
            </div>
     </div>
  );
}

