import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const Post = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu />
            </View>
        </View>
    );
};

export default Post;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 40,
    },
});
