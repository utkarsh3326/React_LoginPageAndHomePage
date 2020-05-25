import Identity from "lodash/identity";
import PropTypes from "prop-types";
import React from "react";

import Input from "./LoginInput";

import { InputData, UserData } from "../../utility/Data";

import "../../App.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buttonState: true,
      errorMessage: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  // for enabling and disabling login button
  buttonStateHandler() {
    if (
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.buttonState
    ) {
      this.setState({ buttonState: false });
    } else if (
      (this.state.email === "" || this.state.password === "") &&
      !this.state.buttonState
    ) {
      this.setState({ buttonState: true });
    }
  }

  // for updating state of email and password
  async changeHandler(e) {
    let key = e.target.name;
    let value = e.target.value;
    if (this.state.errorMessage !== "") {
      await this.setState({ errorMessage: "" });
    }
    await this.setState({ [key]: value });
    await this.buttonStateHandler();
  }

  // for checking credentials and jump to home page
  submitHandler(e) {
    e.preventDefault();
    if (
      this.state.email === UserData.email &&
      this.state.password === UserData.password
    ) {
      this.props.jumpToHomePage();
    } else {
      this.setState({ errorMessage: "Email or Password does not match" });
    }
  }

  // for returning login input field
  loginInputField() {
    let inputFieldData = InputData.map((input) => {
      return (
        <Input
          className={input.className}
          name={input.name}
          key={input.name}
          onChange={this.changeHandler}
          placeholder={input.placeholder}
          type={input.type}
        />
      );
    });
    return inputFieldData;
  }

  render() {
    const { buttonState, errorMessage } = this.state;
    const buttonStyle = !buttonState ? { backgroundColor: "green" } : null;

    return (
      <div className="login-page">
        <form className="login-form" onSubmit={this.submitHandler}>
          {this.loginInputField()}
          <input
            className="login-form-button"
            disabled={buttonState}
            style={buttonStyle}
            type="submit"
            value="Login"
          />
        </form>
        <p className="error-message">{errorMessage}</p>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  jumpToHomePage: Identity,
};

LoginPage.propTypes = {
  jumpToHomePage: PropTypes.func,
};

export default LoginPage;
