import "./Header.css";
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header({ user, onLogOut }) {
  return (
    <div className="Header">
      <div className="Header__title">Whiz</div>
      <div>
        {user ? (
          <div className="Header__userInfo">
            <div className="Header__userInfo__name">{user.name}</div>
            {/* <FontAwesomeIcon onClick={onLogOut} icon={faSignOutAlt} /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}