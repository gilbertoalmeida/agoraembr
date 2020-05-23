/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const RegisterModal = ({
  error,
  auth,
  isAuthenticated,
  clearErrors,
  register
}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    completeName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cvSummary: ""
  });

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setErrorMsg(error.msg.msg); //comes from the routes in the backend
    } else {
      setErrorMsg(null);
    }
  }, [error]);

  const onChange = e => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //attempt to register
    register(registerForm);
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
        name="completeName"
        label="Nome completo"
        onChange={onChange}
        rules={[{ required: true }]}
      >
        <Input name="completeName" />
      </Form.Item>
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
      <Form.Item
        name="confirmPassword"
        label="Confirme a senha"
        onChange={onChange}
        rules={[
          {
            required: true
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("As duas senhas não batem!");
            }
          })
        ]}
      >
        <Input name="confirmPassword" type="password" />
      </Form.Item>
      <Form.Item
        name="cvSummary"
        label="Resumo do currículo"
        onChange={onChange}
      >
        <Input.TextArea name="cvSummary" />
      </Form.Item>

      {errorMsg ? <Alert message={errorMsg} type="error" /> : null}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="button-form-top submit-register"
          block
        >
          {auth.registering
            ? "Registrando..."
            : error.id === "REGISTER_FAIL"
            ? "Tentar de novo"
            : "Enviar"}
        </Button>
      </Form.Item>
      <div className="register-modal__body__privicy_policy">
        <Link to="/privacy-policy">Política de privacidade</Link>
      </div>
    </Form>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
