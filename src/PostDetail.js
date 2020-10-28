import React, { useState, useEffect } from "react";
import {
    TextInput,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight, TouchableOpacity,
    View, FlatList, ScrollView
} from "react-native";

import { Icon } from 'react-native-elements'
let Fetch_api = 'https://jsonplaceholder.typicode.com/posts'

function PostDetail(props) {
    const [newcomment, setNewcomment] = useState('')

    deletePost = () => {
        fetch(`${Fetch_api}/${props.selectedPost.id}`, { method: 'DELETE' })
            .then(resp => resp.json())
            .then((data) => {
                console.log('delete--------', data)
                props.closeModal();
            })
    }

    saveComments = () => {
        let postId = props.selectedPost.userId;
        fetch(`${Fetch_api}/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                name: 'foo',
                body: newcomment,
                email: 'foo@yopmail.com',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setNewcomment('')
            })
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHead}>
                            <View style={styles.item4}>
                                <Text style={styles.textCenter} numberOfLines={1}>{props.selectedPost.title}</Text>
                            </View>
                            <View style={styles.item1}>

                                <Icon
                                    reverse
                                    name='trash'
                                    type='font-awesome'
                                    color='#f50'
                                    size={20}
                                    containerStyle={{ marginRight: 5 }}
                                    onPress={deletePost} />
                            </View>
                        </View>
                        <ScrollView>
                            <View style={styles.postbody}>
                                <Text numberOfLines={1} style={{ textAlign: 'left' }}>{props.selectedPost.body}</Text>
                            </View>

                            <FlatList
                                data={props.comments}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={styles.textContainer}>
                                        <View style={styles.postbody}>
                                            <Text numberOfLines={1}>{item.name}</Text>
                                        </View>
                                        <View style={[styles.row]}>
                                            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Comments</Text>
                                        </View>
                                        <Text numberOfLines={1}>{item.body}</Text>

                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />

                            <View style={{
                                flexDirection: 'row', width: '95%', borderColor: 'lightgray',
                                borderWidth: 2, borderRadius: 10, margin: 10, padding: 10
                            }}>
                                <TextInput
                                    placeholder='Add Comment'
                                    multiline={true}
                                    numberOfLines={10}
                                    onChangeText={(text) => setNewcomment(text)}
                                    value={newcomment} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ width: '50%' }}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={props.closeModal}
                                    >
                                        <Text style={styles.textStyle}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity
                                        disabled={newcomment ? false : true}
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={saveComments}
                                    >
                                        <Text style={styles.textStyle} >Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    postbody: {
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row'
    },
    modalView: {
        marginVertical: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        width: '100%'
    },
    textCenter: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20
    },
    modalHead: {
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        marginVertical: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    item1: {
        width: '15%',
    },
    item2: {
        width: '45%',
    },
    item3: {
        width: '45%',
    },
    item4: {
        width: '85%'
    },
    textContainer: {
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderWidth: 2,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    }
});

export default PostDetail;
