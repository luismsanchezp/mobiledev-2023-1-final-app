import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, FlatList, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const Slider = ({ slides }) => {
    const renderItem = ({ item }) => {
        return (
            <ImageBackground source={item.backgroundImage} style={styles.slide} resizeMode="cover">
                <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableOpacity style={styles.linkButton} onPress={item.onPressLink}>
                    <Text style={styles.linkText}>{item.linkText}</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    };

    return (
        <FlatList
            data={slides}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    slide: {
      width,
      height: '100%',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add overlay color if needed
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#ffffff',
    },
    description: {
      fontSize: 16,
      marginBottom: 24,
      color: '#ffffff',
    },
    linkButton: {
      backgroundColor: '#f9c2ff',
      padding: 12,
      borderRadius: 8,
    },
    linkText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });