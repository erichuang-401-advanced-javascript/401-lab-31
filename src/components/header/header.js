import React from "react";
import Login from "../auth/loginFxn.jsx";

import styles from "./header.module.scss";

const Header = props => {
  return (
    <header className={styles.header}>
      <Login />
    </header>
  );
};

export default Header;
