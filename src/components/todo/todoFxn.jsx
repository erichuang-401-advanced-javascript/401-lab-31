import React, { useReducer } from "react";

import Auth from "../auth/authFxn.jsx";

import styles from "./todo.module.scss";

//intiial state
const initialState = {
  item: "",
  toDoItems: []
};

//dispatch function
function dispatchFxn(state, dispatchAction) {
  switch (dispatchAction.type) {
    case "toggle":
      return { ...state, toDoItems: dispatchAction.data };
    case "changeValue":
      return { ...state, item: dispatchAction.data };
    case "addItem":
      return { ...state, toDoItems: dispatchAction.data };
    default:
      throw new Error();
  }
}

//main reduce function
function ToDoFxn(props) {
  const [state, dispatchAction] = useReducer(dispatchFxn, initialState);

  function toggle(event, id) {
    event.preventDefault();
    let toDoItems = state.toDoItems.map((item, idx) =>
      idx === id ? { title: item.title, status: !item.status } : item
    );
    dispatchAction({ type: "toggle", data: toDoItems });
  }

  function handleChange(event) {
    dispatchAction({ type: "changeValue", data: event.target.value });
  }

  function handleForm(event) {
    event.preventDefault();
    event.target.reset();
    let item = { title: state.item, status: false };
    dispatchAction({ type: "addItem", data: [...state.toDoItems, item] });
  }

  return (
    <section className={styles.todo}>
      <Auth capability="read">
        {state.toDoItems.map((item, idx) => (
          <div key={idx} onClick={e => toggle(e, idx)}>
            <span className={styles[`complete-${item.status}`]}>
              {" "}
              {item.title}{" "}
            </span>
          </div>
        ))}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleForm}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>
    </section>
  );
}

export default ToDoFxn;
