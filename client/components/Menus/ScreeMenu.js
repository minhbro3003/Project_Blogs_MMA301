import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/AuthContext";
import HeadrMenu from "./HeadrMenu";
import Post from "../../screens/Post";
import About from "../../screens/About";
import Account from "../../screens/Account";
import Mypost from "../../screens/Mypost";

const ScreeMenu = () => {
    //global state
    const [state] = useContext(AuthContext);
    //auth condition true false
    const authenticatedUser = state?.user && state.token;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Login">
            {authenticatedUser ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            title: "full app",
                            headerRight: () => <HeadrMenu />,
                        }}
                    />
                    <Stack.Screen
                        name="Post"
                        component={Post}
                        options={{
                            headerBackTitle: "Back",
                            headerRight: () => <HeadrMenu />,
                        }}
                    />
                    <Stack.Screen
                        name="Myposts"
                        component={Mypost}
                        options={{
                            headerBackTitle: "Back",
                            headerRight: () => <HeadrMenu />,
                        }}
                    />
                    <Stack.Screen
                        name="Account"
                        component={Account}
                        options={{
                            headerBackTitle: "Back",
                            headerRight: () => <HeadrMenu />,
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default ScreeMenu;

const styles = StyleSheet.create({});
