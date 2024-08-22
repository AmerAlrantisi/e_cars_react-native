import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import client from '../client';
import { homeData } from '../queries';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Contact from '../components/contact';
import CalculatorButton from '../components/CalculatorButton';
import LinearGradient from 'react-native-linear-gradient';
 

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [images, setImages] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        autoScroll();
      }, 5400); // Scroll every 500ms

      return () => clearInterval(interval);
    }
  }, [scrollX, images]);

  const fetchData = async () => {
    try {
      const result = await client.fetch(homeData());
      console.log('Fetched data:', JSON.stringify(result, null, 2)); // Log the entire result
      setData(result);

      if (result.length > 0) {
        setCars(result[0].cars);
        setImages(result[0].images || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToSelectedCar = (car) => {
    navigation.navigate('SelectedCar', { car });
  };

  const chunkArray = (myArray, chunk_size) => {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const autoScroll = () => {
    if (scrollViewRef.current) {
      const nextIndex = scrollX + ScreenWidth >= images.length * ScreenWidth ? 0 : scrollX + ScreenWidth;
      scrollViewRef.current.scrollTo({ x: nextIndex, animated: true });
      setScrollX(nextIndex);
    }
  };

  const carsChunks = chunkArray(cars, 2);

  return (
    <LinearGradient
    colors={['#66FF00', '#CCFF99']}
    style={styles.container}
  >
    <ScrollView contentContainerStyle={styles.container}>
      {/* Horizontal ScrollView for images */}
      {images.length > 0 && (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollContainer}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image.asset?.url }} style={styles.image} />
          ))}
        </ScrollView>
      )}

      {/* Cars Section */}
      {carsChunks.map((chunk, index) => (
        <View key={index} style={styles.row}>
          {chunk.map((car) => (
            <TouchableOpacity
              key={car.carname} // Using carname as key for simplicity
              style={styles.box}
              onPress={() => navigateToSelectedCar(car)}
            >
              <Image source={{ uri: car.logoImage?.asset?.url }} style={styles.btnimage} />
              <View style={styles.row}>
                <Text style={styles.carname}>{car.carname}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
             <CalculatorButton />

      <Contact />
    </ScrollView>
        </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4dad00',
    flexGrow: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  imageScrollContainer: {
    maxHeight: 250,
  
  },
  image: {
    width: ScreenWidth,
    height: 200,
      borderWidth:3,
    borderColor:'white',
  },
  btnimage: {
    width: 150,
    height: 120,
    borderRadius: 15,
  },
  carname: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  box: {
    padding: 10,
    backgroundColor: '#66FF00',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#326c03',
    padding: 10,
    borderRadius: 10,
  },
  col: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default HomeScreen;
