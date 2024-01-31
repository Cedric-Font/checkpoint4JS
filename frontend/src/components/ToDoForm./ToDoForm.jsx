import "./ToDoForm.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TodoForm({ addTodo, home, personal, work }) {
  const [value, setValue] = useState("");
  const [categorie, setCategorie] = useState("");

  const handleSubmits = async (event) => {
    event.preventDefault();
    try {
      // Appel à l'API pour créer un nouvel utilisateur
      await fetch("http://localhost:3310/api/listes", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: value,
          names: categorie,
          user: 1,
          categorie: 1,
        }),
      });
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
    if (value) {
      // add todo
      if (categorie === "Home") {
        addTodo(value, home);
      }
      if (categorie === "Personal") {
        addTodo(value, personal);
      }
      if (categorie === "Work") {
        addTodo(value, work);
      }
      // clear form after submission
    }
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="todo-input"
          placeholder="What is the task today?"
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
        <select
          className="select"
          name="categories"
          id="category-select"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="">category</option>
          <option value="home">Home</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>
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
