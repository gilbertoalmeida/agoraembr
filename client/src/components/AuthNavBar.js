import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./auth/Logout";

class AuthNavBar extends Component {
  render() {
    return (
      <nav className="authnavbar-top-fixer">
        <div className="authnavbar-main-box-element">
          <div className="authnavbar__main-content">
            <div className="authnavbar__favi-brand-wrapper">
              <Link to="/">
                <button>Página Principal</button>
              </Link>
              <Logout />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default AuthNavBar;
