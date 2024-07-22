// src/components/Preloader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const Preloader = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Electric Car</Text>
      <ActivityIndicator size="large" color="#A30000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width,
    height,
  },
  appName: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default Preloader;
