import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreeMenu from "./components/Menus/ScreeMenu";

const RootNavigation = () => {
    return (
        <AuthProvider>
            <ScreeMenu />
        </AuthProvider>
    );
};

export default RootNavigation;
