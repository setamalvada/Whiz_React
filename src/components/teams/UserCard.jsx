
import React from "react";

export default function UserCard({ username, counter, team, avatar }) {
  return (
    <div className="UserCard">
      <div
        className="User__image"
        style={{ backgroundImage: `url(${avatar})` }}
      />
      <div className="User__name">{username}</div>
      <div className="User__price">{counter} places conquered</div>
      <div className="User__user">{team}</div>
      <button className="User__button">View detail</button>
    </div>
  );
}


