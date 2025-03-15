import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { PostContext } from "../context/PostContext";
import PostCard from "../components/PostCard";
import axios from "axios";
import { FontAwesome } from "react-native-vector-icons";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (currentPage = 1) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/post/get-all-posts?search=${search}&page=${currentPage}&limit=10`);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            setPage(currentPage);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [search]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={18} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search posts..."
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Hiển thị bài viết */}
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {posts.length > 0 ? (
                        <PostCard post={posts} />
                    ) : (
                        <View style={styles.noPostsContainer}>
                            <FontAwesome name="exclamation-circle" size={50} color="#ccc" />
                            <Text style={styles.noPostsText}>No posts available.</Text>
                        </View>
                    )}
                </ScrollView>
            )}

            {/* Pagination */}
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[styles.pageButton, page <= 1 && styles.disabledButton]}
                    onPress={() => fetchPosts(page - 1)}
                    disabled={page <= 1}
                >
                    <Text style={styles.pageButtonText}>Prev</Text>
                </TouchableOpacity>

                <Text style={styles.pageText}>Page {page} / {totalPages}</Text>

                <TouchableOpacity
                    style={[styles.pageButton, page >= totalPages && styles.disabledButton]}
                    onPress={() => fetchPosts(page + 1)}
                    disabled={page >= totalPages}
                >
                    <Text style={styles.pageButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            <FooterMenu />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#f8f9fa", // Màu nền sáng nhẹ
        padding: 10,
        marginTop: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Hiệu ứng đổ bóng trên Android
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#333",
    },
    noPostsContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    noPostsText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    pageButton: {
        backgroundColor: "#007bff",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    pageButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    pageText: {
        fontSize: 16,
        color: "#333",
    },
});
