import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const About = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu />
            </View>
        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 40,
    },
});
