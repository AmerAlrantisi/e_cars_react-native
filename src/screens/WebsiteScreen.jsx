import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WebsiteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>Our website is under construction. Stay tuned for updates!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4dad00',
    padding: screenWidth * 0.1,
  },
  title: {
    fontSize: screenWidth * 0.1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
  },
  subtitle: {
    fontSize: screenWidth * 0.05,
    color: 'white',
    textAlign: 'center',
  },
});

export default WebsiteScreen;
