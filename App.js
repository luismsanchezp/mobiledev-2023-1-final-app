import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    StyleSheet
} from "react-native";
import { getToken } from "./src/utils/jwt";
import { Login, WelcomeSlides, UserList } from "./src/components";
import * as SecureStore from 'expo-secure-store';

export default function App() {
    const [loginVisibility, setLoginVisibility] = useState(true);
    const [welcomeVisibility, setWelcomeVisibility] = useState(false);
    const [userListVisible, setUserListVisible] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            //await SecureStore.deleteItemAsync("token");
            const token = await getToken();
            if (token !== null) {
                console.debug("Token: ", token);
                setLoginVisibility(false);
                setWelcomeVisibility(false);
                setUserListVisible(true);
            } else {
                console.debug("No token");
            }
        };
    
        checkToken();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Login loginVisibility={loginVisibility} setLoginVisibility={setLoginVisibility} setWelcomeVisibility={setWelcomeVisibility}/>
            <WelcomeSlides welcomeVisibility={welcomeVisibility} setWelcomeVisibility={setWelcomeVisibility} setUserListVisible={setUserListVisible}/>
            <UserList userListVisible={userListVisible} setUserListVisible={setUserListVisible}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0069a3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        color: '#fff',
    },
    titleBold: {
        fontWeight: '900',
        color: "#f4d73b",
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
        textAlign: 'center',
        color: '#000000',
    },
});