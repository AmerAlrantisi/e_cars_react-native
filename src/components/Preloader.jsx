import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import logo from '../assets/images/logo.png';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const { width, height } = Dimensions.get('window');

const Preloader = ({ visible }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Zoom in
      Animated.sequence([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        // Hold the scale for a moment
        Animated.delay(700),
        // Zoom out before ending
        Animated.spring(scaleValue, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
      />
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
    backgroundColor: 'white',
    width,
    height,
  },
  logo: {
    width: ScreenWidth * 0.4,
    height: ScreenWidth * 0.4,
  },
});

export default Preloader;
