import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const categoryDisplayNames = {
  carShowroom: 'Car Showroom',
  chargerStore: 'Charger Store',
  accessoriesStore: 'Accessories Store',
  sparePartsStore: 'Spare Parts Store',
  maintenanceCenter: 'Maintenance Center',
  chargingStation: 'Charging Station',
};

const allowedCategories = [
  'carShowroom',
  'chargerStore',
  'accessoriesStore',
  'sparePartsStore',
  'maintenanceCenter',
  'chargingStation',
];

const SelectedCar = ({ route }) => {
  const { car = {} } = route.params || {};
  const { cities = [] } = car;
  const initialCity = cities[0] || {};
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [visibleCategories, setVisibleCategories] = useState({});
  const [showDetails, setShowDetails] = useState({});

  const handleCityChange = (cityName) => {
    const foundCity = cities.find(city => city.name === cityName);
    setSelectedCity(foundCity);
    setVisibleCategories({});
    setShowDetails({});
  };

  const toggleCategoryVisibility = (category) => {
    setVisibleCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const toggleDetails = (category) => {
    setShowDetails(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleAddressPress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.carContainer}>
        <Text style={styles.carTitle}>{car.name}</Text>
        {car.image && <Image source={car.image} style={styles.image} />}
      </View>

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedCity.name}
          style={styles.dropdown}
          onValueChange={(itemValue) => handleCityChange(itemValue)}
        >
          {cities.map((city, index) => (
            <Picker.Item key={index} label={city.name} value={city.name} />
          ))}
        </Picker>
      </View>

      {allowedCategories.map((category, index) => (
        selectedCity[category] && (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleCategoryVisibility(category)}>
              <View style={styles.toggleButton}>
                <Text style={styles.toggleText}>{categoryDisplayNames[category]}</Text>
              </View>
            </TouchableOpacity>
            {visibleCategories[category] && (
              <TouchableOpacity onPress={() => toggleDetails(category)}>
                <View style={styles.detailsBox1}>
                  <Text style={styles.detailsLabel}>{selectedCity[category].stationName}</Text>
                </View>
              </TouchableOpacity>
            )}
            {showDetails[category] && visibleCategories[category] && selectedCity[category] && (
              <View style={styles.detailsContainer}>
                <TouchableOpacity style={styles.detailsBox} onPress={() => handleAddressPress(selectedCity[category].address)}>
                  <Text style={styles.detailsLabel}>Address:</Text>
                  <Text style={styles.detailsText}>{selectedCity[category].address}</Text>
                </TouchableOpacity>
                <View style={styles.detailsBox}>
                  <Text style={styles.detailsLabel}>Price:</Text>
                  <Text style={styles.detailsText}>{selectedCity[category].price}</Text>
                </View>
                <TouchableOpacity style={styles.detailsBox} onPress={() => handlePhonePress(selectedCity[category].phoneNumber)}>
                  <Text style={styles.detailsLabel}>Phone:</Text>
                  <Text style={styles.detailsText}>{selectedCity[category].phoneNumber}</Text>
                </TouchableOpacity>
                <View style={styles.detailsBox}>
                  <Text style={styles.detailsLabel}>Working Hours:</Text>
                  <Text style={styles.detailsText}>{selectedCity[category].workingHours}</Text>
                </View>
              </View>
            )}
          </View>
        )
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#101218',
    alignItems: 'center',
    paddingTop: screenHeight * 0.02,
    paddingBottom: screenHeight * 0.04,
  },
  carContainer: {
    padding: screenWidth * 0.0533,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.04,
    alignItems: 'center',
    width: screenWidth * 0.9,
    marginBottom: screenHeight * 0.02,
  },
  carTitle: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
  },
  image: {
    width: screenWidth * 0.533,
    height: screenHeight * 0.15,
    borderRadius: screenWidth * 0.04,
    marginBottom: screenHeight * 0.01,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  dropdown: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.667,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  toggleButton: {
    backgroundColor: '#A30000',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    borderRadius: screenWidth * 0.0133,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.9,
    alignItems: 'center',
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: screenWidth * 0.0427,
  },
  detailsContainer: {
    width: screenWidth * 0.9,
    marginBottom: screenHeight * 0.02,
  },
  detailsBox: {
    backgroundColor: 'white',
    padding: screenWidth * 0.0267,
    borderRadius: screenWidth * 0.0267,
    borderWidth: 1,
    marginBottom: screenHeight * 0.01,
  },
  detailsBox1: {
    backgroundColor: 'gold',
    padding: screenWidth * 0.0267,
    borderRadius: screenWidth * 0.0267,
    borderWidth: 1,
    marginBottom: screenHeight * 0.01,
  },
  detailsLabel: {
    fontSize: screenWidth * 0.0427,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsText: {
    fontSize: screenWidth * 0.0427,
  },
});

export default SelectedCar;