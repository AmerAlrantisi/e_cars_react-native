import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'; // Added ScrollView for vertical scrolling
import hondaicon from '../assets/images/honda.png';
import honda from '../assets/images/hondatxt.webp';

const HomeScreen = ({ navigation }) => {
  const [cars, setCars] = useState([
   {
    id: 1,
    name: 'Honda Ionic',
    image: hondaicon,
    cities: [
      {
        name: 'Amman',
        chargingStation: {
          stationName: 'Amman Charging Station',
          address: '000 Charging St, Amman',
          price: '$$',
          phoneNumber: '+962 6 1234567',
          workingHours: '9:00 AM - 6:00 PM',
        },
        maintenanceCenter: {
          stationName: 'Amman Maintenance Center',
          address: '000 Maintenance Ave, Amman',
          price: '$$',
          phoneNumber: '+962 6 7654321',
          workingHours: '8:00 AM - 5:00 PM',
        },
        sparePartsStore: {
          stationName: 'Amman Spare Parts Store',
          address: '000 Spare Parts Blvd, Amman',
          price: '$',
          phoneNumber: '+962 6 9876543',
          workingHours: '10:00 AM - 7:00 PM',
        },
        accessoriesStore: {
          stationName: 'Amman Accessories Store',
          address: '000 Accessories Rd, Amman',
          price: '$$',
          phoneNumber: '+962 6 2345678',
          workingHours: '10:00 AM - 6:00 PM',
        },
        chargerStore: {
          stationName: 'Amman Charger Store',
          address: '000 Chargers Rd, Amman',
          price: '$$',
          phoneNumber: '+962 6 5432109',
          workingHours: '9:00 AM - 8:00 PM',
        },
        carShowroom: {
          stationName: 'Amman Car Showroom',
          address: '000 Car Showroom Ave, Amman',
          price: '$$$',
          phoneNumber: '+962 6 1098765',
          workingHours: '9:00 AM - 9:00 PM',
        },
      },
      {
        name: 'Zarqa',
        chargingStation: {
          stationName: 'Zarqa Charging Station',
          address: '123 Charging St, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 1234567',
          workingHours: '9:00 AM - 6:00 PM',
        },
        maintenanceCenter: {
          stationName: 'Zarqa Maintenance Center',
          address: '456 Maintenance Ave, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 7654321',
          workingHours: '8:00 AM - 5:00 PM',
        },
        sparePartsStore: {
          stationName: 'Zarqa Spare Parts Store',
          address: '789 Spare Parts Blvd, Zarqa',
          price: '$',
          phoneNumber: '+962 6 9876543',
          workingHours: '10:00 AM - 7:00 PM',
        },
        accessoriesStore: {
          stationName: 'Zarqa Accessories Store',
          address: '321 Accessories Rd, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 2345678',
          workingHours: '10:00 AM - 6:00 PM',
        },
        chargerStore: {
          stationName: 'Zarqa Charger Store',
          address: '555 Chargers Rd, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 5432109',
          workingHours: '9:00 AM - 8:00 PM',
        },
        carShowroom: {
          stationName: 'Zarqa Car Showroom',
          address: '999 Car Showroom Ave, Zarqa',
          price: '$$$',
          phoneNumber: '+962 6 1098765',
          workingHours: '9:00 AM - 9:00 PM',
        },
      },
      // Add similar details for other cities like 'Aqaba', 'Irbid', etc.
    ],
  },
  {
    id: 2,
    name: 'Honda Ionic',
    image: hondaicon,
    cities: [
      {
        name: 'Amman',
        chargingStation: {
          stationName: 'Amman Charging Station',
          address: '123 Charging St, Amman',
          price: '$$',
          phoneNumber: '+962 6 1234567',
          workingHours: '9:00 AM - 6:00 PM',
        },
        maintenanceCenter: {
          stationName: 'Amman Maintenance Center',
          address: '456 Maintenance Ave, Amman',
          price: '$$',
          phoneNumber: '+962 6 7654321',
          workingHours: '8:00 AM - 5:00 PM',
        },
        sparePartsStore: {
          stationName: 'Amman Spare Parts Store',
          address: '789 Spare Parts Blvd, Amman',
          price: '$',
          phoneNumber: '+962 6 9876543',
          workingHours: '10:00 AM - 7:00 PM',
        },
        accessoriesStore: {
          stationName: 'Amman Accessories Store',
          address: '321 Accessories Rd, Amman',
          price: '$$',
          phoneNumber: '+962 6 2345678',
          workingHours: '10:00 AM - 6:00 PM',
        },
        chargerStore: {
          stationName: 'Amman Charger Store',
          address: '555 Chargers Rd, Amman',
          price: '$$',
          phoneNumber: '+962 6 5432109',
          workingHours: '9:00 AM - 8:00 PM',
        },
        carShowroom: {
          stationName: 'Amman Car Showroom',
          address: '999 Car Showroom Ave, Amman',
          price: '$$$',
          phoneNumber: '+962 6 1098765',
          workingHours: '9:00 AM - 9:00 PM',
        },
      },
      {
        name: 'Zarqa',
        chargingStation: {
          stationName: 'Zarqa Charging Station',
          address: '123 Charging St, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 1234567',
          workingHours: '9:00 AM - 6:00 PM',
        },
        maintenanceCenter: {
          stationName: 'Zarqa Maintenance Center',
          address: '456 Maintenance Ave, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 7654321',
          workingHours: '8:00 AM - 5:00 PM',
        },
        sparePartsStore: {
          stationName: 'Zarqa Spare Parts Store',
          address: '789 Spare Parts Blvd, Zarqa',
          price: '$',
          phoneNumber: '+962 6 9876543',
          workingHours: '10:00 AM - 7:00 PM',
        },
        accessoriesStore: {
          stationName: 'Zarqa Accessories Store',
          address: '321 Accessories Rd, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 2345678',
          workingHours: '10:00 AM - 6:00 PM',
        },
        chargerStore: {
          stationName: 'Zarqa Charger Store',
          address: '555 Chargers Rd, Zarqa',
          price: '$$',
          phoneNumber: '+962 6 5432109',
          workingHours: '9:00 AM - 8:00 PM',
        },
        carShowroom: {
          stationName: 'Zarqa Car Showroom',
          address: '999 Car Showroom Ave, Zarqa',
          price: '$$$',
          phoneNumber: '+962 6 1098765',
          workingHours: '9:00 AM - 9:00 PM',
        },
      },
      // Add similar details for other cities like 'Aqaba', 'Irbid', etc.
    ],
  },
  // Add data for other cars like 'Honda Accord', 'Toyota Camry', etc.
]);


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
              key={car.id}
              style={styles.box}
              onPress={() => navigateToSelectedCar(car)}
            >
              <Image source={car.image} style={styles.btnimage} />
              <View style={styles.row}>
                <Text style={styles.carname}>{car.name}</Text>
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
    backgroundColor: '#101218',
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
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
