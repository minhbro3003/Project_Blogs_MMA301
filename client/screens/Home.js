import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Home = () => {
    const [state, setState] = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(state, null, 4)}</Text>
            <FooterMenu></FooterMenu>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 40,
    },
});
