import React from "react";
import "./ToDo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function Todo({
  task,
  deleteTodo,
  editTodo,
  toggleComplete,
  names,
}) {
  const handleSubmits = async () => {
    try {
      await fetch(`http://localhost:3310/api/listes/${task.id}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
      deleteTodo(task.id);
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };
  return (
    <div className={names}>
      <div
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task.id)}
        role="button"
        tabIndex={0}
        onKeyDown={toggleComplete}
      >
        {task.task}
      </div>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={handleSubmits}
          onKeyUp={deleteTodo}
        />
      </div>
    </div>
  );
}

Todo.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }),
  names: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  task: "bel inconnu",
};
