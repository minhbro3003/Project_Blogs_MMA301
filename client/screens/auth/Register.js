import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
const Register = ({ navigation }) => {
    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    //functions
    //btn func
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!name || !email || !password) {
                alert("Please fill all fields");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post("/auth/register", {
                name,
                email,
                password,
            });
            alert(data && data.message);
            navigation.navigate("Login");
            // console.log("register: ", {
            //     name: name,
            //     email: email,
            //     password: password,
            // });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Register</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox
                    inputTitle={"Name:"}
                    placeholder="Your Name"
                    value={name}
                    setValue={setName}
                />
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
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton
                btnTitle="Register"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>
                ALready Register Please{" "}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
                </Text>{" "}
            </Text>
        </View>
    );
};

export default Register;

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
