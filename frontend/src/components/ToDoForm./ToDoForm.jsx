import "./ToDoForm.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TodoForm({ addTodo, home, personal, work }) {
  const [values, setValues] = useState("");
  const [categorie, setCategorie] = useState("");

  const handleSubmits = async (event) => {
    if (values.length > 0) {
      event.preventDefault();
      try {
        await fetch("http://localhost:3310/api/listes", {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: values,
            names: categorie,
            user: 1,
            categorie: 1,
          }),
        });
      } catch (err) {
        // Log des erreurs possibles
        console.error(err);
      }
      if (values) {
        // add todo
        if (categorie === "home") {
          addTodo(values, home);
        } else if (categorie === "personal") {
          addTodo(values, personal);
        } else if (categorie === "work") {
          addTodo(values, work);
        } else {
          return null;
        }
        // clear form after submission
      }
      setValues("");
    }
    return null;
  };

  return (
    <div className="formContainer">
      <form
        onSubmit={handleSubmits}
        className="TodoForm"
        action=""
        method="post"
      >
        <input
          type="text"
          value={values}
          onChange={(e) => setValues(e.target.value)}
          className="todo-input"
          // placeholder="What is the task today?"
        />
        <select
          className="select"
          name="categories"
          id="category-select"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        >
          <option value="">category</option>
          <option value="home">Home</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  home: PropTypes.string.isRequired,
  personal: PropTypes.string.isRequired,
  work: PropTypes.string.isRequired,
};
