import "./Header.css";
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from "../../services/api.service";

const Header = () => {
  const authContext = useAuthContext();

  // if (!authContext.user) {
  //   return null;
  // }

  const handleLogout = async () => {
    try {
      await logout();

      authContext.logout();
    } catch (err) {
      console.error(err);
    }
  };

  if (!authContext.user) {
    return (
      <nav className="navbar navbar-dark bg-danger navbar-expand-sm">

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-list-2"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""><h1 className="logo">W</h1></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-list-2">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="/login">
                Login <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/signup">
                Signup
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/map">
                Go to Map
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-dark bg-danger navbar-expand-sm">
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-list-2"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=""><h1 className="logo">W</h1></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-list-2">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link text-white text-white" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/signup">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/map">
                Go to map
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/team/general">
                Stats
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to={`/team/${authContext.user.team}`}>
                Your team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to={`/user/${authContext.user.id}`}>
                Your profile
              </Link>
            </li>
            <li className="nav-item">
              <p className="nav-link text-white" onClick={handleLogout}>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Header;
