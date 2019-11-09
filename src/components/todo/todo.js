import React, { useState } from 'react';

import Auth from "../auth/authFxn.jsx";

import styles from "./todo.module.scss";

const Todo = () => {
  const [ item, setItem ] = useState('');
  const [ toDoItems, setToDoItems ] = useState([]);

  const handleForm = (event) => {
    event.preventDefault();
    event.target.reset();
    let item = { title:item, status:false };
    setToDoItems([ ...toDoItems, item ]);
  };

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const toggle = (event, id) => {
    event.preventDefault();
    let toDoItems = toDoItems.map( (item,idx) =>
      idx === id ? {title:item.title, status:!item.status} : item
    );
    setToDoItems(toDoItems);
  };

  return (
    <section className={styles.todo}>
      <Auth capability="read">
        {toDoItems.map((item, idx) =>
          <div key={idx} onClick={(event) => toggle(event, idx)}>
            <span className={styles[`complete-${item.status}`]}> {item.title} </span>
          </div>
        )}
      </Auth>
      <Auth capability="create">
        <form onSubmit={handleForm}>
          <input
            onChange={handleChange}
            value={item}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>
    </section>
  )

};

export default Todo;
