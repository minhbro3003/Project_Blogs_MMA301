import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;
    //local state
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState(user?.password);
    const [loading, setLoading] = useState(false);

    //handle update user data
    const handleUpdate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put("/auth/update-user", {
                name,
                password,
                email,
            },{
                headers:{
                    Authorization: `Bearer ${token && token}`
                }
            });
            setLoading(false);
            let UD = JSON.stringify(data);
            setState({...state, user: UD?.updateUser})
            alert(data && data.message)
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log("error: ", error);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
                            width: 200,
                            height: 200,
                        }}
                    />
                </View>
                <Text style={styles.warningtext}>
                    Currently you can only update name and password
                </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name: </Text>
                    <TextInput
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email: </Text>
                    <TextInput
                        style={[styles.inputBox, { opacity: 0.6 }]}
                        value={email}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password: </Text>
                    <TextInput
                        style={styles.inputBox}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Role: </Text>
                    <TextInput
                        style={[styles.inputBox, { opacity: 0.6 }]}
                        value={state?.user.role}
                        editable={false}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                        <Text style={styles.updateText}>
                            {loading ? "Please wait..." : "Update Profile"}
                            </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu />
            </View>
        </View>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        margin: 10,
        marginTop: 40,
    },
    warningtext: {
        color: "red",
        fontSize: 13,
        textAlign: "center",
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    inputText: {
        fontWeight: "bold",
        width: 70,
        color: "gray",
    },
    inputBox: {
        width: 250,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5,
    },
    updateBtn: {
        backgroundColor: "black",
        color: "white",
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    updateText: {
        color: "white",
        fontSize: 18,
    },
});
