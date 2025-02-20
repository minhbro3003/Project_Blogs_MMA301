import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { PostContext } from "../context/PostContext";
import { ScrollView } from "react-native-web";
import PostCard from "../components/PostCard";

const Home = () => {
    const [posts] = useContext(PostContext)
    return (
        <View style={styles.container}>
            <ScrollView>
                <PostCard post={posts} />
                <Text>{JSON.stringify(posts, null, 4)}</Text>
            </ScrollView>
            <View style={{ backgroundColor: "ffffff" }}></View>
            <FooterMenu />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 20,
    },
});
