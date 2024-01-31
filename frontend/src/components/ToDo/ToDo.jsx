import React from "react";
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
          onClick={() => deleteTodo(task.id)}
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
