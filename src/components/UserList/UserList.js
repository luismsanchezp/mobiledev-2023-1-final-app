import React, {useState, useEffect} from 'react'
import {
    Modal,
    SafeAreaView,
    Text,
    Pressable,
    FlatList,
    StyleSheet,
    View,
    Alert
} from 'react-native';
import { getUsers } from '../../utils/select';
import { User } from '../User';

export const UserList = ({userListVisible, setUserListVisible}) => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            getUsers()
            .then((response) => {
                console.log("Response: ", response);
                setUsersList(response);
            })
            .catch((error) => {
                console.log("Error Fetch Users: ", error);
            });
        }
        fetchData();
    }, [userListVisible]);

    return (
        <Modal animationType="slide" transparent={true} visible={userListVisible}>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleBold}>
                        Users List
                    </Text>
                </View>
                {usersList?.length === 0 ? (
                    <View style={styles.companiesContainer}>
                        <Text style={styles.title}>No hay usuarios registrados</Text>
                    </View>
                ) : (
                    <FlatList
                        style={styles.companiesContainer}
                        data={usersList}
                        renderItem={({item}) => 
                            <User 
                                userItem={item} 
                            />
                        }
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0069a3',
        paddingTop: 20,
        width: '100%',
    },
    titleView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        minHeight: 160,
    },
    titleBold: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: '700',
        color: '#fff',
    },
    btnNewUser: {
        backgroundColor: '#f4d73b',
        borderRadius: 10,
        padding: 10,
        marginTop: 30,
        marginHorizontal: 20,
    },
    titleButton: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000',
    },
    companiesContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 25,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: "center"
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    button: {
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: "#000000",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});