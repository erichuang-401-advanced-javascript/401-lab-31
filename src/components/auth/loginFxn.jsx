import superagent from "superagent";
import React, { useState } from "react";
import { LoginContext } from "./context.js";

const API = process.env.REACT_APP_API;

const If = props => {
  return !!props.condition ? props.children : null;
};

const LoginFxn = function(props) {
  const [username, setUserName] = useState("username");
  const [password, setPassword] = useState("password");

  function changeUserName(event) {
    setUserName(event.target.value);
  }

  function changePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event, loginMethodFromContext) {
    event.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then(response => {
        let token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  }

  return (
    <LoginContext.Consumer>
      {context => {
        return (
          <>
            <If condition={context.loggedIn}>
              <button onClick={context.logout}>Log Out</button>
            </If>
            <If condition={!context.loggedIn}>
              <div>
                <form onSubmit={e => handleSubmit(e, context.login)}>
                  <input
                    placeholder="username"
                    name="username"
                    onChange={changeUserName}
                  />
                  <input
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={changePassword}
                  />
                  <input type="submit" value="login" />
                </form>
              </div>
            </If>
          </>
        );
      }}
    </LoginContext.Consumer>
  );
};

export default LoginFxn;
