import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const EditModal = ({ modalVisible, setModalVisible, post }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //inintal post data 
    useEffect(() => {
        setTitle(post?.title);
        setDescription(post?.description);
    }, [post]);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
                            <Text style={styles.modalText}>Update Your Posts!</Text>
                            <Text>Title</Text>
                            <TextInput style={styles.inputBox} value={title} />
                            <Text>Description</Text>
                            <TextInput style={styles.inputBox} multiline={true} numberOfLines={5}
                                value={description} />
                            <View style={styles.btnContainer}>
                                <Pressable
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Update</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default EditModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputBox: {
        marginBottom: 20,
        backgroundColor: "lightgray",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 10,
        backgroundColor: "black",
        padding: 10,
        elevation: 2,
        width: 100,
        margin: 10,
    },
    buttonOpen: {
        // backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});