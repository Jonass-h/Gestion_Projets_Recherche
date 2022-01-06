import React, { useContext, useEffect } from "react";
import Projects from "../projects/Projects";
import ProjectForm from "../projects/ProjectForm";
import ProjectFilter from "../projects/ProjectFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ProjectForm />
      </div>
      <div>
        <ProjectFilter />
        <Projects />
      </div>
    </div>
  );
};

export default Home;
