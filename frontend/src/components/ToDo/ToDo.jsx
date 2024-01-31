import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function Todo({ task, names }) {
  return (
    <div className={names}>
      <div
        className={`${task.completed ? "completed" : "incompleted"}`}
        role="button"
        tabIndex={0}
      >
        {task.task}
      </div>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} />
      </div>
    </div>
  );
}

Todo.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  names: PropTypes.string.isRequired,
};

Todo.defaultProps = {
  task: "bel inconnu",
};
