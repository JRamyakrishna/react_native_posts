

import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Button, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import PostDetail from './PostDetail';
import { Icon } from 'react-native-elements'

let postCount = 10;
let displayPosts = []
let Fetch_api = 'https://jsonplaceholder.typicode.com/posts';
export default function DisplayPosts() {
    const [displayPosts, setDisplayPosts] = useState([]);
    const [postsList, setPostsList] = useState([]);
    const [selectpost, setSelectpost] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPostComments, setSelectedPostComments] = useState('');

    useEffect(() => {
        const getResponse = async () => {
            await fetch(`${Fetch_api}`)
                .then(resp => resp.json())
                .then((data) => {
                    setDisplayPosts(data);
                    // postCount = postCount * 2;
                })
        }
        getResponse();
    }, []);

    viewPostDetail = (item) => {
        setSelectpost(item);
        setModalVisible(true);
        fetch(`${Fetch_api}/${item.id}/comments`)
            .then(resp => resp.json())
            .then((data) => {
                setSelectedPostComments(data);
            })

    }

    closeModal = () => {
        setModalVisible(false);
    }

    getMoreRecords = () => {
        // fetch(`${Fetch_api}`)
        //     .then(resp => resp.json())
        //     .then((data) => {
        //         console.log('......................', postCount)
        //         setDisplayPosts(data.slice(0, postCount));
        //     })
    }

    addPost = () => {
        fetch(`${Fetch_api}`, {
            method: 'POST',
            body: JSON.stringify({
                title: 'test post add title',
                body: 'test post add body',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
    }

    console.log('----------------', displayPosts.length)
    console.log('----------------', displayPosts)

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{ width: '80%' }}>

                    <Text style={styles.header}>Posts</Text>
                </View>
                <View style={{ width: '20%' }}>
                    <Text style={{ textAlign: 'right' }}>
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#f50'
                            size={18}
                            onPress={addPost}
                            containerStyle={{ paddingTop: 5 }}
                        />
                    </Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <FlatList
                    data={displayPosts}
                    renderItem={({ item }) =>

                        <TouchableOpacity style={styles.textContainer} onPress={() => viewPostDetail(item)}>
                            <Text style={styles.item1}>{item.id}</Text>
                            <Text style={styles.item2} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.item3} numberOfLines={1}>{item.body}</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={getMoreRecords}
                    onEndReachedThreshold={0.1}
                />
            </View>

            <PostDetail selectedPost={selectpost}
                modalVisible={modalVisible}
                comments={selectedPostComments}
                closeModal={closeModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#3475aa',
        justifyContent: 'center',
        height: 43,
        width: '100%',
        alignItems: 'center'
    },
    header: {
        fontSize: 20,
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textInputContainer: {
        flexDirection: 'row',
        borderColor: 'black',
        alignItems: 'baseline',
        paddingBottom: 20,
        paddingLeft: 10,
    },
    textInput: {
        flex: 1,
        height: 20,
        paddingLeft: 10
    },
    itemContainer: {
        borderColor: 'black',
    },
    item1: {
        width: '10%',
    },
    item2: {
        width: '45%',
    },
    item3: {
        width: '45%',
    },
    textContainer: {
        flexDirection: 'row',
        margin: 7,
        padding: 10,
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
        elevation: 1
    }
});