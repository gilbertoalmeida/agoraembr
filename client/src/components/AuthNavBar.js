import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthNavBar = ({ auth }) => {
  return (
    <nav className="authnavbar-top-fixer">
      <div className="authnavbar-main-box-element">
        <div className="authnavbar__main-content">
          <div className="authnavbar__favi-brand-wrapper">
            <Link to="/">
              <div>AgoraEm</div>
              <img
                alt="favicon of the website"
                src="/android-chrome-192x192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Link>
          </div>
          <div className="authnavbar__logged-content">
            {auth.isAuthenticated ? (
              <Logout />
            ) : (
              <Link to="/conectar">
                <Button type="primary">Conectar</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

AuthNavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AuthNavBar);
