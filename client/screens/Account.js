import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Account = () => {
    const [state, setState] = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Name: {state?.user.name}</Text>
            <Text>Email: {state?.user.email}</Text>
            <Text>Role: {state?.user.role}</Text>
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
});
