import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 


const { width } = Dimensions.get('window');

const SliderDetails = ({ route }) => {
  const { imageUrl } = route.params; // Retrieve the image URL passed from ImageSlider

  return (



   
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4dad00',
  },
  image: {
    width: width * 0.9, // Adjust the width as needed
    height: width * 0.9, // Adjust the height as needed
    resizeMode: 'contain',
  },
});

export default SliderDetails;
