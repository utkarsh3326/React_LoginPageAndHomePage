import Identity from "lodash/identity";
import PropTypes from "prop-types";
import React from "react";

import "../../App.css";

class Input extends React.Component {
  render() {
    const { className, name, onChange, placeholder, type } = this.props;
    return (
      <>
        <input
          className={className}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
      </>
    );
  }
}

Input.defaultProps = {
  name: "input",
  onChange: Identity,
  placeholder: "Input",
  type: "text",
};

Input.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
