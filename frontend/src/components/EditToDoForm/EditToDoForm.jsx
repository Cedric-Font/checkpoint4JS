import React, { useState } from "react";
import PropTypes from "prop-types";

export default function EditToDoForm({
  editTodo,
  task,
  listeId,
  deleteTodo,
  setCheck,
  check,
  addTodo,
  home,
  personal,
  work,
}) {
  const [value, setValue] = useState(task.task);
  const [categorie, setCategorie] = useState("");

  const handleSubmits = async () => {
    try {
      await fetch(`http://localhost:3310/api/listes/${task.id}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
      deleteTodo(value, task.id);
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`http://localhost:3310/api/listes/${listeId}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: value,
          names: categorie,
        }),
      });
      editTodo(value, task.id);
      setCheck(!check);
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
    <form className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <button type="button" className="todo-btn" onClick={handleSubmit}>
        Update Task
      </button>
      <button type="button" onClick={handleSubmits}>
        test
      </button>
      <select
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
  );
}

EditToDoForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
  }),
  editTodo: PropTypes.func.isRequired,
  listeId: PropTypes.number.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  setCheck: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  addTodo: PropTypes.func.isRequired,
  home: PropTypes.string.isRequired,
  personal: PropTypes.string.isRequired,
  work: PropTypes.string.isRequired,
};
EditToDoForm.defaultProps = {
  task: "bel inconnu",
};
