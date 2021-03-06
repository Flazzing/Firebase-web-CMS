import React, { useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Table, Menu, Icon, Button, Header, Modal } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../../Page";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";
import projectCustomerFinder from "../../../../helpers/ProjectCustomerFinder";
function useProject(projectid) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore
      .collection("Task")
      .where("projectID", "==", projectid)
      .onSnapshot((snapshot) => {
        const newProject = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(newProject);
      });
  }, []);
  return projects;
}

function convertToDayTime(timeStamp) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = timeStamp.toDate();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return months[month] + " " + day + ", " + year;
}

const TaskTable = (props) => {
  let { projectid } = useParams();
  let { customerid } = useParams();

  const projects = useProject(projectid);
  const useCustomerName = projectCustomerFinder.useCustomerName;
  const useProjectName = projectCustomerFinder.useProjectName;

  let customerName = useCustomerName(customerid);
  let projectName = useProjectName(projectid);
  return (
    <div>
      <Header as="h1">
        {customerName} -> {projectName} -> Tasks
      </Header>
      <Helmet>
        <title>Task</title>
      </Helmet>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Check</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Ordered By</Table.HeaderCell>
            <Table.HeaderCell>Due date</Table.HeaderCell>
            <Table.HeaderCell>Edit Task</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <input
                  type="checkbox"
                  key={project.id}
                  onChange={() => props.clickToDelete(project.id)}
                />
              </Table.Cell>
              <Table.Cell>{project.taskName}</Table.Cell>
              <Table.Cell>{project.userID}</Table.Cell>
              <Table.Cell>{convertToDayTime(project.taskDueDate)}</Table.Cell>
              <Table.Cell>
                <Modal.Actions>
                  <Link
                    to={
                      "/home/" +
                      customerid +
                      "/" +
                      projectid +
                      "/" +
                      project.id +
                      "/editTask"
                    }
                  >
                    <Button>Edit</Button>
                  </Link>
                </Modal.Actions>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TaskTable;
