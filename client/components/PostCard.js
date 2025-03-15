import { StyleSheet, Text, View, Alert, Button } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ post, myPostScreen }) => {
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [postDetail, setPostDetail] = useState({});
    const navigation = useNavigation();
    //handle delete prompt
    const handleDeletePrompt = (id) => {
        Alert.alert(
            "Attention!",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    onPress: () => { console.log("Cancel Pressed") },
                },
                {
                    text: "Delete",
                    onPress: () => handleDeletePost(id),
                }
            ],
        );
    };

    //delete post data
    const handleDeletePost = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`/post/delete-post/${id}`)
            setLoading(false)
            alert(data?.message)
            navigation.push("Myposts")
        } catch (error) {
            setLoading(false)
            console.log(error)
            alert(error)
        }
    }

    return (
        <View>
            <Text style={styles.heading}>Total Posts: {post?.length || 0}</Text>
            {myPostScreen && <EditModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                post={postDetail}
            />}
            {post?.length > 0 ? (
                post.map((post, i) => (
                    <View style={styles.card} key={i}>
                        {myPostScreen && (
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text style={{ marginHorizontal: 20 }}>
                                    <FontAwesome5 name="pen" size={15} color="darkblue"
                                        onPress={() => { setPostDetail(post), setModalVisible(true) }} />
                                </Text>
                                <Text>
                                    <FontAwesome5 name="trash" size={15} color="red"
                                        onPress={() => handleDeletePrompt(post?._id)} />
                                </Text>
                            </View>
                        )}
                        <Text style={styles.title}>Title: {post?.title}</Text>
                        <Text style={styles.desc}>Description: {post?.description}</Text>
                        <View style={styles.footer}>
                            {post?.postedBy?.name && (
                                <Text>
                                    <FontAwesome5 name="user" color="orange" /> {post?.postedBy?.name}
                                </Text>
                            )}
                            <Text>
                                <FontAwesome5 name="clock" color="orange" /> {moment(post?.createdAt).format("DD/MM/YYYY")}
                            </Text>
                        </View>
                    </View>
                ))
            ) : (
                <View style={styles.noPostsContainer}>
                    <FontAwesome5 name="box-open" size={50} color="#999" />
                    <Text style={styles.noPostsText}>No posts available.</Text>
                </View>
            )}
        </View>

    );
};

export default PostCard;

const styles = StyleSheet.create({
    heading: {
        color: "green",
        textAlign: "center",
    },
    card: {
        width: "97%",
        backgroundColor: "white",
        borderWidth: 0.2,
        borderColor: "#ccc",
        padding: 20,
        borderRadius: 5,
        marginVertical: 5,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 8,
        borderBottomWidth: 0.3
    },
    desc: {
        marginTop: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    noPostsText: {
        marginTop: 10,
        fontSize: 18,
        color: "#666",
        fontWeight: "bold",
    },
});
