import React, { useState, useContext, useEffect } from "react";
import ProjectContext from "../../context/project/projectContext";

const ProjectForm = () => {
  const projectContext = useContext(ProjectContext);

  const { addProject, current, clearCurrent, updateProject } = projectContext;

  // Note: useEffect mimics the life cycle method of componentDidMount.
  useEffect(() => {
    if (current !== null) {
      setProject(current);
    } else {
      setProject({
        name: "",
        details: "",
        type: "personal",
      });
    }
  }, [projectContext, current]);

  const clearAll = () => {
    clearCurrent();
  };

  const [project, setProject] = useState({
    name: "",
    details: "",
    type: "personal",
  });

  const { name, details, type } = project;

  const onChange = (event) =>
    setProject({ ...project, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    if (current === null) {
      addProject(project);
    } else {
      updateProject(project);
    }
    setProject({
      name: "",
      details: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Editer projet" : "Ajouter projet"}
      </h2>
      <input
        type="text"
        placeholder="Nom du projet"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="details"
        name="details"
        value={details}
        onChange={onChange}
      />
      <h5>Type de projet</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update Project" : "Add Project"}
          className="btn btn-primary brn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ProjectForm;
