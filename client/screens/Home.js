import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Home = () => {
    const [state, setState] = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>{JSON.stringify(state, null, 4)}</Text>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
    },
});
