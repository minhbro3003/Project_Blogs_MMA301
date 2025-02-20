import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import FooterMenu from '../components/Menus/FooterMenu'
import axios from "axios";
import PostCard from '../components/PostCard';

const Mypost = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    //get user post 
    const getUserPosts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/post/get-user-post');
            setLoading(false)
            setPosts(data?.userPosts)
        } catch (error) {
            setLoading(false)
            console.log(object)
            alert(error)
        }
    }
    //initial 
    useEffect(() => {
        getUserPosts();
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <PostCard post={posts} />
                <Text>{JSON.stringify(posts, null, 4)}</Text>
            </ScrollView>
            <View style={{ backgroundColor: "ffffff" }}></View>
            <FooterMenu />
        </View>
    )
}

export default Mypost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 20,
    },
});