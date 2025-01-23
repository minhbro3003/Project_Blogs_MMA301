import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";

const Login = ({ navigation }) => {
    //global state
    const [state, setState] = useContext(AuthContext);
    //state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    //functions
    //btn func
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                alert("Please fill all fields");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post("/auth/login", {
                email,
                password,
            });
            setState(data);
            //check data
            if (data && data.user && data.token) {
                await AsyncStorage.setItem("@auth", JSON.stringify(data));
            } else {
                alert("Invalid login response");
                return;
            }
            alert(data && data.message);
            navigation.navigate("Home");
            console.log("Login data: ", {
                email: email,
                password: password,
            });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };
    //temp function to check local storage data
    useEffect(() => {
        const getLocalStorageData = async () => {
            let data = await AsyncStorage.getItem("@auth");
            console.log("Local Storage: ", data);
        };
        getLocalStorageData();
    }, []); // Chỉ chạy một lần khi component mount

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox
                    inputTitle={"Email:"}
                    placeholder="Your Email"
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    inputTitle={"Password:"}
                    placeholder="Your Password"
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>
            {/* <Text>{JSON.stringify({ email, password }, null, 4)}</Text> */}
            <SubmitButton
                btnTitle="Login"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>
                Not a user Please{" "}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Register")}
                >
                    Register
                </Text>{" "}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e1d5c9",
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225",
        marginBottom: 20,
    },
    linkText: { textAlign: "center" },
    link: {
        color: "red",
    },
});

export default Login;
