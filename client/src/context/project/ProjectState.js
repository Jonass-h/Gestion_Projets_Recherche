import React, { useReducer } from "react";
import axios from "axios";
import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PROJECT,
  FILTER_PROJECTS,
  CLEAR_FILTER,
  PROJECT_ERROR,
  CLEAR_PROJECTS,
} from "../types";

const ProjectState = (props) => {
  const initialState = {
    projects: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Function to get all contacts for the user.
  const getProjects = async () => {
    try {
      const res = await axios.get("/api/projects");

      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Function to add a contact.
  const addProject = async (project) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/projects", project, config);

      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Function to delete a contact.
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Function to update the current contact.
  const updateProject = async (project) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/projects/${project._id}`,
        project,
        config
      );

      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Function to clear all contacts from the
  const clearProjects = () => {
    dispatch({ type: CLEAR_PROJECTS });
  };

  // Function to set the current contact.
  const setCurrent = (project) => {
    dispatch({ type: SET_CURRENT, payload: project });
  };

  // Function the clear the current contact.
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Function to filter contacts (based on what is inputted in search field).
  const filterProjects = (text) => {
    dispatch({ type: FILTER_PROJECTS, payload: text });
  };

  // Function to clear filter for contacts.
  const clearFilter = (text) => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addProject,
        deleteProject,
        setCurrent,
        clearCurrent,
        updateProject,
        filterProjects,
        clearFilter,
        getProjects,
        clearProjects,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
