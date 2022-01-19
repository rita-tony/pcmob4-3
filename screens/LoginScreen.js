import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";

import firebase from '../database/firebaseDB';

const db = firebase.firestore();
const auth = firebase.auth();

const LoginScreen = ( {navigation} ) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	function login() {
		console.log("Input email value : " + email);
		console.log("Input password value :" + password);

		Keyboard.dismiss()
       auth
           .signInWithEmailAndPassword(email, password)
           .then(({userCredential}) => {
               console.log('signed in!')
			   setError("");
               //navigation.navigate("Chat", { email })
           })
           .catch((error) => {
               setError("Error Message: " + error.message);
           })
	}
	

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<View style={styles.container}>
			<Text style={styles.titleStyle}>Chat-App</Text>

			<Text style={styles.labelStyle}>Email:</Text>
			<TextInput
				style={styles.textInputStyle}
				placeholder='Please enter Email'
				value = {email}
				onChangeText={(txtEmail) => {setEmail(txtEmail)}}
			>
			</TextInput>

			<Text style={styles.labelStyle}>Password:</Text>
			<TextInput
				secureTextEntry={true}
				style={styles.textInputStyle}
				placeholder='Please enter password'
				value = {password}
				onChangeText={(txtPassword) => {setPassword(txtPassword)}}
			>
			</TextInput>

			<View style={styles.buttonsStyle}>
				<TouchableOpacity
					style={styles.buttonStyle}
					onPress={login}
				>
					<Text style={styles.buttonTextStyle}>Login</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.errorLabelStyle}>{error}</Text>
		</View>
		</TouchableWithoutFeedback>
	);
}

export default LoginScreen;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		//alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 20,
	},

	titleStyle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},

	dismissStyle: {
		color: "orange",
	},

	labelStyle: {
		fontSize: 18,
		fontWeight: "bold",
	},

	errorLabelStyle: {
		fontSize: 12,
		color: "red",
	},

	textInputStyle: {
		marginBottom: 20,
		marginRight: 20,
		borderWidth: 1,
		padding: 10,
		borderColor: '#ccc'
	},

	buttonsStyle: {
		flexDirection: 'row',
		marginBottom: 20,
	},

	buttonStyle: {
		padding: 10,
		backgroundColor: 'blue',
		alignItems: "center",
		justifyContent: "space-around",

	},

	submitButtonStyle: {
		backgroundColor: 'orange',
	},

	cancelButtonStyle: {
		backgroundColor: 'red',
	},

	buttonTextStyle: {
		fontWeight: 'bold',
		color: 'white',
	},

});