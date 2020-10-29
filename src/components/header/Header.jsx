import "./Header.css";
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header({ user, onLogOut }) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
      <p className="navbar-brand maze">WHIZ</p>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-list-2"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbar-list-2">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Login <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Signup
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Blog
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
