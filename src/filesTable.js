import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Document").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

const ProjectList = () => {
  const projects = useProject();
  return (
    <div>
      {projects.map(project => (
        <a href={project.documentLink}>File </a>
      ))}
    </div>
  );
};

export default ProjectList;