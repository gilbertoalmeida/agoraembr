import React, { Fragment } from "react";
import { withLocalize, Translate } from "react-localize-redux";
import { Link } from "react-router-dom";
import LoginPage from "./auth/LoginPage";

const PleaseLogin = () => {
  window.scrollTo(0, 0);
  return (
    <Fragment>
      <header className="App-header"></header>
      {/* header just here to make the space of the authnavbar */}
      <div className="please-login-main-box-element">
        <div className="please-login-title">
          <Translate id="general.please_login" />
        </div>
        <div className="please-login-body">
          <Translate id="general.please_login_text" />
          <div className="please-login__login-form">
            <LoginPage />
          </div>
          <div className="please-login__register-call-to-action">
            <div className="please-login__privicy_policy">
              <Link to="/privacy-policy">
                <Translate id="general.privacy_policy" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withLocalize(PleaseLogin);
