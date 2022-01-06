import React, { useContext } from "react";
import PropTypes from "prop-types";
import ProjectContext from "../../context/project/projectContext";

const ProjectItem = ({ project }) => {
  const projectContext = useContext(ProjectContext);
  const { deleteProject, setCurrent, clearCurrent } = projectContext;

  const { _id, name, details, type } = project;

  const onDelete = () => {
    deleteProject(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {/* The charAt/slice javascript capitalizes the first letter and then adds on the remaining letters to reconstruct the word "professional" or "personal".*/}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {details && (
          <li>
            <i className="fas fa-envelope-open-text"></i> {details}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(project)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
