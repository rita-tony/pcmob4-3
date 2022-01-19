import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat } from 'react-native-gifted-chat';

import firebase from '../database/firebaseDB';

const db = firebase.firestore().collection("messages");

const ChatScreen = ({ navigation }) => {
	const [messages, setMessages] = useState([]);

	// Handle logging in and out and setting up the db

	useEffect(() => {
		const unsubscribe = db
			.orderBy('createdAt', 'desc')
			.onSnapshot((collectionSnapshot) => {
				const serverMessages = collectionSnapshot.docs.map((doc) => {
					const data = doc.data();
					console.log(data);

					//above show us that createAt is now an object with "seconds"
					//and "nanoseconds". If we just take the former x 1000, we can recreate a JS note..

					const jsDate = new Date(data.createdAt.seconds * 1000);
					const newDoc = {
						...data,
						createdAt: jsDate, //this overwrite the existing createAt
					};
					return newDoc;
				});

				setMessages(serverMessages)
			});

		firebase.auth().onAuthStateChanged((user) => {
			console.log("user: " + user)
			if (user) {
				console.log("login state user: " + user)
				// logged in 
				navigation.navigate("Chat", { id: user.id, email: user.email })
			} else {
				console.log("logout state user: " + user)
				// logged out, get kicked back to the login page
				navigation.navigate('Login')
			}
		});

		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={logout}>
					<MaterialCommunityIcons
						name='logout'
						size={24}
						color='grey'
						style={{ marginRight: 20}}
					/>
				</TouchableOpacity>
			)
		});

		return unsubscribe;

	}, [])

	const logout = () => {
		firebase.auth().signOut();
	}

	function sendMessages(newMessages) {
		//let's see what is inside
		console.log(newMessages);
		//send the message to db
		db.add(newMessages[0]);
	}

	//console.log(firebase.auth());

	return (
		<GiftedChat
			messages={messages}
			onSend={(newMessages) => sendMessages(newMessages)}
			renderUsernameOnMessage={true}
			listViewProps={{
				style: {
				  backgroundColor: "#777",
				},
			}}
			user={{
				_id: firebase.auth().currentUser?.uid,
				name: firebase.auth().currentUser?.email,
			}}
		/>
	);
}


export default ChatScreen;
