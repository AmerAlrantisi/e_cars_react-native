import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import client from '../client';
import { homeData } from '../queries';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.fetch(homeData());
      console.log('Fetched data:', JSON.stringify(result, null, 2)); // Log the entire result
      setData(result);

      if (result.length > 0 && result[0].cars.length > 0) {
        setCars(result[0].cars);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToSelectedCar = (car) => {
    navigation.navigate('SelectedCar', { car });
  };

  // Function to split cars array into chunks of size 2
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

  // Split cars into chunks of 2 cars per row
  const carsChunks = chunkArray(cars, 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Welcome to Cars app!</Text>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4dad00',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
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
    flexDirection: 'row', // Arrange children components horizontally
    justifyContent: 'space-around', // Distribute items evenly
    marginBottom: 20,
  },
  box: {
    padding: 10,
    backgroundColor: '#326c03',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
