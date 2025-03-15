import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Tạo context
const PostContext = createContext();

// Tạo provider
const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/post/get-all-posts");
            console.log("Fetched Posts:", data?.posts); // Kiểm tra dữ liệu trả về
            setPosts(data?.posts || []); // Đảm bảo không set posts là undefined
        } catch (error) {
            console.log("Error fetching posts:", error);
            setPosts([]); // Set empty array in case of error
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllPosts();
    }, []); // Gọi getAllPosts khi component mount

    return (
        <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
            {children}
        </PostContext.Provider>
    );
};



// Export riêng
export { PostContext, PostProvider };
