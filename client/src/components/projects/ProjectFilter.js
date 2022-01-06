import React, { useContext, useRef, useEffect } from "react";
import ProjectContext from "../../context/project/projectContext";

const ProjectFilter = () => {
  const projectContext = useContext(ProjectContext);
  const text = useRef("");

  const { filterProjects, clearFilter, filtered } = projectContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (event) => {
    if (text.current.value !== "") {
      filterProjects(event.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <form>
        <input
          ref={text}
          type="text"
          placeholder="recherche sur un projet ..."
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default ProjectFilter;
