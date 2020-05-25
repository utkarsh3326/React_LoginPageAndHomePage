import React from "react";

import "../../App.css";
import Identity from "lodash/identity";
import Input from "./LoginInput";
import { InputData, UserData } from "../../utility/Data";
import PropTypes from "prop-types";

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

  async changeHandler(e) {
    let key = e.target.name;
    let value = e.target.value;
    if (this.state.errorMessage !== "") {
      await this.setState({ errorMessage: "" });
    }
    await this.setState({ [key]: value });
    await this.buttonStateHandler();
  }

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
      <div className="loginPage">
        <form className="loginForm" onSubmit={this.submitHandler}>
          {this.loginInputField()}
          <input
            className="loginFormButton"
            disabled={buttonState}
            style={buttonStyle}
            type="submit"
            value="Login"
          />
        </form>
        <p className="errorMessage">{errorMessage}</p>
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
