import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Modal,
    ImageBackground,
    Image,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';
import { logIn, getToken, getUser, verifyToken } from '../../utils/jwt';
import Mailer from 'react-native-mail';

export const Login = ({loginVisibility, setLoginVisibility, setWelcomeVisibility}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const emptyFields = () => {
        setEmail("");
        setPassword("");
    };

    const sendEmail = (recipient) => {
        Mailer.mail(
          {
            subject: 'Activación de cuenta',
            recipients: [recipient],
            body: '<b>Hi, this is a test email</b>',
            isHTML: true,
            attachments: [],
          },
          (error, event) => {
            if (error) {
              // Error occurred while sending email
              console.error('Error sending email:', error);
            } else {
              // Email sent successfully
              console.log('Email sent successfully');
            }
          }
        );
      };

    const handleUser = async () => {
        if ([email, password].includes("")) {
            Alert.alert("Error","Por favor, llena todos los campos");
            return;
        }

        logIn({email: email, password: password})
        .then(async (response) => {
            const token = await getToken();
            const decodedToken = await verifyToken(token);
            if (decodedToken !== null) {
                setLoginVisibility(!loginVisibility);
                emptyFields();
                setWelcomeVisibility(true);
            } else {
                Alert.alert("Error","Token invalido.");
            }
        })
        .catch((error) => {
            if (error.toString() === 'Error: not_active') {
                Alert.alert("Error","Usuario inactivo. Revise su bandeja de entrada para activar su cuenta.");
                sendEmail(email);
            } else {
                console.log("Error: ", error);
                Alert.alert("Error","Usuario o contraseña incorrectos.");
            }
        });
    };

    return (
        <Modal animationType="slide" visible={loginVisibility}>
            <ImageBackground source={require("../../assets/jpg/companies_bg.jpg")} resizeMode="cover" style={styles.backCover}>
                <Image style={styles.image} source={require("../../assets/png/Logos_UAM-10.png")}/>
                <Text style={styles.title}>Login {""}
                    <Text style={styles.titleBold}>Usuarios</Text>
                </Text>
                <View style={styles.container}>
                    <View style={styles.campo}>
                        <TextInput 
                        style={styles.input} 
                        placeholder="@autonoma.edu.co" 
                        placeholderTextColor="#F8F9F9" 
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}/>
                    </View>
                    <View style={styles.campo}>
                        <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#F8F9F9"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}/>
                    </View>
                    <Pressable
                    style={styles.btnNewUser}
                    onPress={handleUser}>
                        <Text style={styles.btnTextNewUser}>Iniciar Sesion</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
    },
    image: {
        marginTop: 50,
        width: 120,
        height: 120,
    },
    backCover: {
        position: "absolute",
        marginTop: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    title: {
        textAlign: "center",
        fontSize: 28,
        color: "white",
        marginHorizontal: 30,
        fontWeight: "600",
        marginBottom: 20,
        marginTop: 20,
    },
    titleBold: {
        textAlign: "center",
        fontSize: 28,
        color: "#0069a3",
        marginHorizontal: 30,
        fontWeight: "600",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#000000c0",
        color: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 8,
        marginTop: 12,
    },
    campo: {
        marginHorizontal: 30,
    },
    inputComments: {
        height: 100,
    },
    inputDate: {
        borderRadius: 10,
        height: 10,
    },
    btnExit: {
        marginVertical: 30,
        backgroundColor: "#000000c0",
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    btnTextExit: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    },
    btnNewUser: {
        marginVertical: 50,
        backgroundColor: "#0069a3",
        marginHorizontal: 110,
        paddingVertical: 15,
        borderRadius: 10,
    },
    btnTextNewUser: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
        textTransform: "uppercase",
    },
});