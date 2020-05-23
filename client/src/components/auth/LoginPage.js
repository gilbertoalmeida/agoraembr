/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { login } from "../../actions/authActions";
import RegisterModal from "./RegisterModal";

const LoginPage = ({ error, auth, login }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setErrorMsg(error.msg.msg); //comes from the routes in the backend
    } else {
      setErrorMsg(null);
    }
  }, [error]);

  const onChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //attempt to login
    login(loginForm);
  };

  const devSubmit = () => {
    //attempt to login
    login({
      email: "test@gmail.com",
      password: "123456"
    });
  };

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 8
    }
  };

  const validateMessages = {
    required: "${label} é obrigatório!",
    types: {
      email: "não é um email válido!"
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onSubmit}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="email"
        label="Email"
        onChange={onChange}
        rules={[
          {
            required: true,
            type: "email"
          }
        ]}
      >
        <Input name="email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Senha"
        onChange={onChange}
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input name="password" type="password" />
      </Form.Item>

      {errorMsg ? <Alert message={errorMsg} type="error" /> : null}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="button-form-top login"
          block
        >
          {auth.loggingin
            ? "Entrando..."
            : error.id === "LOGIN_FAIL"
            ? "Tentar de novo"
            : "Entrar"}
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <RegisterModal />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="dashed" onClick={devSubmit} block>
          Entrar como test
        </Button>
      </Form.Item>
      <div className="register-modal__body__privicy_policy">
        <Link to="/privacy-policy">Política de privacidade</Link>
      </div>
    </Form>
  );
};

LoginPage.propTypes = {
  error: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(LoginPage);
