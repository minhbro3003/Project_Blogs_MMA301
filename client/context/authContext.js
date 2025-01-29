// Sửa authContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Tạo context
const AuthContext = createContext();

// Tạo provider
const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    //default axios
    axios.defaults.baseURL = "http://192.168.1.10:3001/api";
    useEffect(() => {
        const loadLocalStorage = async () => {
            let data = await AsyncStorage.getItem("@auth");
            let loginData = JSON.parse(data);
            setState({
                ...state,
                user: loginData?.user,
                token: loginData?.token,
            });
        };
        loadLocalStorage();
    }, []);

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

// Export riêng
export { AuthContext, AuthProvider };
