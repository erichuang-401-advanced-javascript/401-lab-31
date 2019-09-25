import React from "react";
import PropTypes from "prop-types";

import { LoginContext } from "./context.js";

const If = props => {
  return props.condition ? props.children : null;
};

const AuthFxn = function(props) {
  return (
    <LoginContext.Consumer>
      {context => {
        console.log("Token:", context.token);
        let okToRender =
          context.loggedIn &&
          (props.capability
            ? context.user.capabilities &&
              context.user.capabilities.includes(props.capability)
            : true);
        return <If condition={okToRender}>{props.children}</If>;
      }}
    </LoginContext.Consumer>
  );
};

AuthFxn.propTypes = {
  capability: PropTypes.string.isRequired
};

export default AuthFxn;
