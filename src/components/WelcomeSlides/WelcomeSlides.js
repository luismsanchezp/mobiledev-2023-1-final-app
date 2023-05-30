import React from 'react';
import { View, StyleSheet, Modal, Linking } from 'react-native';
import { Slider } from '../Slider';

export const WelcomeSlides = ({welcomeVisibility, setWelcomeVisibility, setUserListVisible}) => {
    const handleOpenRepo = () => {
        Linking.openURL('https://github.com/luismsanchezp/mobiledev-2023-1-final-app');
    };
    
    const slides = [
        {
            id: 1,
            backgroundImage: require('../../assets/jpg/dev2.jpg'),
            title: 'Welcome to the App',
            description: 'Esta app fue hecha por Luis Miguel Sanchez Pinilla. Estudiante de Ingenieria de Sistemas de la Universidad Autonoma de Manizales.',
            onPressLink: () => {
                handleOpenRepo();
            },
            linkText: 'GitHub repo',
        },
        {
            id: 2,
            backgroundImage: require('../../assets/jpg/companies_bg.jpg'),
            title: 'Tecnologias empleadas',
            description: 'La aplicacion fue hecha en Javascript con React Native.',
            onPressLink: () => {
                setUserListVisible(true);
                setWelcomeVisibility(!welcomeVisibility);
            },
            linkText: 'Continue',
        },
        // Add more slides as needed
    ];

    return (
        <Modal animationType="fade" visible={welcomeVisibility}>
            <View style={styles.container}>
            <Slider slides={slides} />
            </View>
        </Modal>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
