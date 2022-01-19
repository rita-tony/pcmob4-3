import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";

import firebase from '../database/firebaseDB';

const db = firebase.firestore();
const auth = firebase.auth();

const SignUpScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");


	function signUp() {
		console.log("Input email value : " + email);
		console.log("Input password value :" + password);

		Keyboard.dismiss();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then (({userCredential}) => {
				console.log('Signed up');
				setError("Signed up successfully!");
				setEmail("");
				setPassword("");
			})
			.then (() => navigation.navigate("Login"))
			.catch((error) => {
				setError("Error Message: " + error.message);
			});
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={styles.titleStyle}>Chat-App</Text>
                <Text style={[styles.labelStyle, {marginBottom: 10, color: "green"}]}>Sign Up for New User</Text>

				<Text style={styles.labelStyle}>Email:</Text>
				<TextInput
					style={styles.textInputStyle}
					placeholder='Please enter Email'
					value={email}
					onChangeText={(txtEmail) => { setEmail(txtEmail) }}
				>
				</TextInput>

				<Text style={styles.labelStyle}>Password:</Text>
				<TextInput
					secureTextEntry={true}
					style={styles.textInputStyle}
					placeholder='Please enter password'
					value={password}
					onChangeText={(txtPassword) => { setPassword(txtPassword) }}
				>
				</TextInput>

				<View style={styles.buttonsStyle}>
					<TouchableOpacity
						style={styles.buttonStyle}
						onPress={signUp}
					>
						<Text style={styles.buttonTextStyle}>Sign up</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.errorLabelStyle}>{error}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default SignUpScreen;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		marginLeft: 20,
	},

	titleStyle: {
        color: "green",
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
        color: "green",
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
		backgroundColor: 'cadetblue',
		//alignItems: "center",
		justifyContent: 'space-between',

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