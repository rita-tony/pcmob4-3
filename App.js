import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './screens/LoginScreen'
import ChatScreen from './screens/ChatScreen'
import SignUpScreen from './screens/SignUpScreen'

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login"
					component={LoginScreen}
					options={{
						headerShown: false,
					}} />

				<Stack.Screen name="Chat"
					component={ChatScreen} />

				<Stack.Screen name="Sign Up"
					component={SignUpScreen}
					options={{
						headerShown: false,
					}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});


