import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import fire from "../../config/Fire";
import firestoreDB from "../../config/firestore";
import genUID from "../../helpers/idGenerator";

class customerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      phoneNumber: "",
      address: "",
      registrationStatus: "",
      userName: "",
      status: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    console.log(
      document.querySelector('input[name="adminType"]:checked').value
    );
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        firestoreDB
          .collection("Admin")
          .add({
            adminID: genUID(),
            adminEmail: this.state.email,
            adminLastName: this.state.lastName,
            adminFirstName: this.state.firstName,
            adminPhoneNumber: this.state.phoneNumber,
            adminAddress: this.state.address,
            adminType: document.querySelector('input[name="adminType"]:checked')
              .value,
            adminUsername: this.state.userName,
          })
          .then((docRef) => {
            firestoreDB
              .collection("Admin")
              .doc(docRef.id)
              .update({ adminID: docRef.id })
              .catch((error) => {
                console.log(error);
                return this.setState({ status: error });
              });
            console.log("Successfully created: ", docRef.id);
            document.getElementById("userName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("phoneNumber").value = "";
            document.getElementById("address").value = "";
            // document.getElementById("adminType").checked = false;
          })
          .catch((error) => {
            console.log(error);
            return this.setState({ status: error });
          });
      })
      .catch((error) => {
        console.log(error);
        return this.setState({ status: error });
      });
    return this.setState({ status: "Account created Successfully" });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        {/* <navbar /> */}
        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form error={error} onSubmit={this.onSubmit}>
            <Header as="h2">Create admin account</Header>
            {this.state.status && (
              <Message error={error} content={this.state.status.message} />
            )}
            {this.state.status && <Message content={this.state.status} />}
            <Form.Input
              inline
              label="Username"
              type="userName"
              id="userName"
              name="userName"
              placeholder="Username..."
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Email..."
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="password..."
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="First Name"
              type="firstName"
              id="firstName"
              name="firstName"
              placeholder="First Name..."
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Last Name"
              name="lastName"
              id="lastName"
              placeholder="Last Name..."
              onChange={this.handleChange}
            />{" "}
            <Form.Input
              inline
              label="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="e.g. 1231234599"
              onChange={this.handleChange}
            />{" "}
            <Form.Input
              inline
              label="Address"
              name="address"
              id="address"
              placeholder="address..."
              onChange={this.handleChange}
            />{" "}
            <b>
              <label>Admin Type</label>
            </b>
            <Form.Group>
              <Form.Radio
                label="Active"
                name="adminType"
                id="adminType_active"
                value="active"
                defaultChecked
              />
              <Form.Radio
                label="Unactive"
                name="adminType"
                id="adminType_unactive"
                value="unactive"
              />
            </Form.Group>{" "}
            <Form.Button type="submit">Create!</Form.Button>
          </Form>
        </Grid.Column>
      </div>
    );
  }
}

export default customerRegistration;
