import React from "react";

import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { homeState: false };
    this.jumpToHomePage = this.jumpToHomePage.bind(this);
  }

  jumpToHomePage() {
    this.setState((prev) => {
      return { homeState: !prev.homeState };
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.homeState ? (
          <HomePage jumpToHomePage={this.jumpToHomePage} />
        ) : (
          <LoginPage jumpToHomePage={this.jumpToHomePage} />
        )}
      </div>
    );
  }
}

export default App;
