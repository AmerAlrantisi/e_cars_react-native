// src/components/Preloader.js
import React from 'react';
import { View, Image ,ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';
import logo from '../assets/images/logo.png'
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const { width, height } = Dimensions.get('window');

const Preloader = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
    <Image source={logo} style={styles.logo} ></Image>
    {/* <ActivityIndicator size="large" color="#A30000" /> */}
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

  logo:{
    width:ScreenWidth*0.4,
    height:ScreenWidth*0.4,
    
      },

});

export default Preloader;
