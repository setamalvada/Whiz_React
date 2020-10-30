import "./Header.css";
import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from "../../services/api.service";

const Header = () => {
  const authContext = useAuthContext();

  if (!authContext.user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();

      authContext.logout();
    } catch (err) {
      console.error(err);
    }
  };

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
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/signup">
              Signup
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/map">
              Go to Map
            </a>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={handleLogout}>
              Logout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
