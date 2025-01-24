import React from "react";
// import Register from "./screens/auth/Register";
// import { StyleSheet, Text, View } from "react-native";
// import Login from "./screens/auth/Login";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { AuthProvider } from "./context/authContext";
// import Home from "./screens/Home";
import RootNavigation from "./navigation";

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    );
}
