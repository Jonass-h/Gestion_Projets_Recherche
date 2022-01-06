import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { GiFoxHead } from "react-icons/gi";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ProjectContext from "../../context/project/projectContext";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearProjects } = projectContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearProjects();
  };

  const authLinks = (
    <Fragment>
      <li>Bonjour, {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <GiFoxHead />
        &nbsp;
        {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Gestion des projets de recherche",
};

export default Navbar;
