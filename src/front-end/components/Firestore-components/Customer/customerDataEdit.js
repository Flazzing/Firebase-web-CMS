import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";

import { Table, Form, Grid, Button, Modal, Icon } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route, useParams } from "react-router-dom";
import { SpellInput } from "../../home/CustomerAction/editDeleteCustomer";
import style from "./style.css";
var id;

// the helper function to hook customer informations and fill in
// input fields.
function useProject() {
  const [projects, setProjects] = useState([]);
  let { customerid } = useParams();
  id = customerid;

  let citiesRef = firestore.collection("Customer").doc(customerid);
  var data = new Array();
  citiesRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        document.getElementById("userName").value = doc.data().customerUsername;
        document.getElementById("email").value = doc.data().customerEmail;
        document.getElementById(
          "firstName"
        ).value = doc.data().customerFirstName;
        document.getElementById("lastName").value = doc.data().customerLastName;
        document.getElementById(
          "phoneNumber"
        ).value = doc.data().customerPhoneNumber;
        document.getElementById("address").value = doc.data().customerAddress;
        if (doc.data().customerType === "active") {
          document.getElementById("customerTypeActive").checked = true;
        } else {
          document.getElementById("customerTypeUnactive").checked = true;
        }
      }
    })
    .catch((err) => {
      console.log("Error getting document", err);
    });
}

// helper function to perform the firestore update
function onSubmit(e) {
  var radioValue;
  if (document.getElementById("customerTypeActive").checked) {
    radioValue = "active";
  } else {
    radioValue = "unactive";
  }
  console.log(id);
  e.preventDefault();
  //   perfor an update in fire store
  firestore
    .collection("Customer")
    .doc(id)
    .update({
      customerEmail: document.getElementById("email").value,
      customerLastName: document.getElementById("lastName").value,
      customerFirstName: document.getElementById("firstName").value,
      customerPhoneNumber: document.getElementById("phoneNumber").value,
      customerAddress: document.getElementById("address").value,
      customerUsername: document.getElementById("userName").value,
      customerType: radioValue,
    })
    .then(() => {
      // if successfully update the customer
      alert("Successfully update the customer");
    })
    .catch((err) => {
      //   catch any throwed error
      console.err(err);
    });
}

// the compent of the update interface
const ProjectList = () => {
  const projects = useProject();
  console.log(projects + "Outer");
  return (
    <Modal open dimmer="blurring">
      <div style={{ float: "right" }}>
        <Link to="/home">
          <Icon name="close" size="large" />
        </Link>
      </div>

      <Modal.Header>Update Customer</Modal.Header>
      <Modal.Description>
        <Page title="Update Customer">
          <Helmet>
            <title>Update Customer</title>
          </Helmet>
          <Grid.Column width={6} />
          <Grid.Column width={4}>
            <Form>
              <Form.Input
                className="customerEditing"
                inline
                label="Username"
                type="userName"
                id="userName"
                name="userName"
                placeholder="Username..."
              />
              <Form.Input
                className="customerEditing"
                inline
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="Email..."
              />

              <Form.Input
                className="customerEditing"
                inline
                label="First Name"
                type="firstName"
                id="firstName"
                name="firstName"
                placeholder="First Name..."
              />
              <Form.Input
                className="customerEditing"
                inline
                label="Last Name"
                name="lastName"
                id="lastName"
                placeholder="Last Name..."
              />
              <Form.Input
                className="customerEditing"
                inline
                label="Phone Number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="e.g. 1231234599"
              />
              <Form.Input
                className="customerEditing"
                inline
                label="Address"
                name="address"
                id="address"
                placeholder="address..."
              />
              <Form.Group inline>
                <label>Customer Type</label>
                <Form.Radio
                  label="Active"
                  name="customerType"
                  id="customerTypeActive"
                  value="active"
                />
                <Form.Radio
                  label="Unactive"
                  name="customerType"
                  id="customerTypeUnactive"
                  value="unactive"
                />
              </Form.Group>
              <Form.Button
                type="submit"
                onClick={onSubmit}
                className="cutomerEditConfirm"
              >
                Update!
              </Form.Button>
            </Form>
          </Grid.Column>
        </Page>
      </Modal.Description>
      <Modal.Actions>
        <Link to="/home">
          <Button>Close</Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default ProjectList;
