import React, { Component } from "react";
import fire from "./config/Fire";
import firestoreDB from "./config/firestore";
import genUID from "./util/idGenerator";
import { Helmet } from "react-helmet";

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.signUp = this.signUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			userID: "",
			email: "",
			password: "",
			lastName: "",
			firstName: "",
			phoneNumber: "",
			userType: "",
			registrationStatus: "",
			userName: ""
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	signUp(e) {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {
				firestoreDB
					.collection("Admin")
					.add({
						adminID: genUID(),
						adminEmail: this.state.email,
						adminLastName: this.state.lastName,
						adminFirstName: this.state.firstName,
						adminPhoneNumber: this.state.phoneNumber,
						adminAddress: this.state.userType,
						adminUsername: this.state.username
					})
					.then(function(docRef) {
						console.log("Document written with ID: ", docRef.id);
						this.setState({ registrationStatus: "Success" });
					})
					.catch(function(error) {
						var message = "Firestore".concat(error);
						this.setState({ registrationStatus: message });
					});
			})
			.catch(error => {
				this.setState({ registrationStatus: "Authentication".concat(error) });
			});
	}

	render() {
		let labelOutput;
		if (this.state.registrationStatus === "Success") {
			labelOutput = <label>Succesfully created the account.</label>;
		} else {
			labelOutput = <label>{this.state.registrationStatus}</label>;
		}

		return (
			<div id="registered-div" className="main-div">
				<h3>Register</h3>
				{/*
				email input
				*/}
				<input
					value={this.state.email}
					onChange={this.handleChange}
					type="email"
					name="email"
					placeholder="email..."
					id="email-field"
				/>
				{/*
				password input
				*/}
				<input
					value={this.state.password}
					onChange={this.handleChange}
					type="password"
					name="password"
					placeholder="password..."
					id="password-field"
				/>
				{/*
				firstName input
				*/}
				<input
					value={this.state.firstName}
					onChange={this.handleChange}
					type="firstName"
					name="firstName"
					placeholder="firstName..."
					id="firstName-field"
				/>
				{/*
				lastName input
				*/}
				<input
					value={this.state.lastName}
					onChange={this.handleChange}
					type="lastName"
					name="lastName"
					placeholder="lastName..."
					id="lastName-field"
				/>
				{/*
				phoneNumber input
				*/}
				<input
					value={this.state.phoneNumber}
					onChange={this.handleChange}
					type="phoneNumber"
					name="phoneNumber"
					placeholder="phoneNumber..."
					id="phoneNumber-field"
				/>
				{/*
				userType input
				*/}
				<input
					value={this.state.userType}
					onChange={this.handleChange}
					type="userType"
					name="userType"
					placeholder="userType..."
					id="userType-field"
				/>
				{labelOutput}
				<button onClick={this.signUp}>Sign up</button>
				<form action="/register">
					<input type="submit" value="Registration" />
				</form>
			</div>
		);
	}
}

export default Registration;
