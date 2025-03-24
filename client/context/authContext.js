import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Tạo context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    useEffect(() => {
        const loadLocalStorage = async () => {
            try {
                const data = await AsyncStorage.getItem("@auth");
                if (data) {
                    const loginData = JSON.parse(data);
                    setState({
                        user: loginData?.user,
                        token: loginData?.token,
                    });

                    // Cập nhật token vào axios sau khi state thay đổi
                    axios.defaults.headers.common['Authorization'] = `Bearer ${loginData?.token}`;
                }
            } catch (error) {
                console.error("Error loading auth data:", error);
            }
        };

        loadLocalStorage();
    }, []);

    // Cập nhật baseURL cho axios
    axios.defaults.baseURL = "https://react-native-post-server.onrender.com/api"; //http://192.168.1.11:3001    192.168.1.11 | 10.33.34.134

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
