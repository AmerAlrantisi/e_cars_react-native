import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';
import Contact from '../components/contact';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const categoryDisplayNames = {
  carShowroom: 'معرض سيارات',
  chargerStore: 'متجر شواحن',
  accessoriesStore: 'متجر إكسسوارات',
  sparePartsStore: 'متجر قطع غيار',
  maintenanceCenter: 'مركز صيانة',
  chargingStation: 'محطة شحن',
  services: 'خدمات',
  winches: 'ونشات',
  chargeonroad: 'شحن على الطريق',
  dryclean: 'دراي كلين',
};

const allowedCategories = [
  'carShowroom',
  'chargerStore',
  'accessoriesStore',
  'sparePartsStore',
  'maintenanceCenter',
  'chargingStation',
  'services',
  'winches',
  'chargeonroad',
  'dryclean',
];

const SelectedCar = ({ route, navigation }) => {
  const { car = {} } = route.params || {};
  const [selectedLocation, setSelectedLocation] = useState(car.locations[0] || {});
  const [visibleCategory, setVisibleCategory] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    // Set the header title to the selected car name
    if (car.carname) {
      navigation.setOptions({ title: car.carname });
    }
  }, [car.carname, navigation]);

  const handleLocationChange = (locationName) => {
    const foundLocation = car.locations.find(location => location.locationName === locationName);
    setSelectedLocation(foundLocation);
    setVisibleCategory(null);
    setShowDetails({});
  };

  const toggleCategoryVisibility = (category) => {
    if (visibleCategory === category) {
      setVisibleCategory(null); // Close the currently open category
    } else {
      setVisibleCategory(category); // Open the selected category
    }
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.carContainer}>
          {car.logoImage && <Image source={{ uri: car.logoImage.asset.url }} style={styles.image} />}
        </View>

        <View style={styles.dropdownContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLocation.locationName}
              style={styles.dropdown}
              onValueChange={(itemValue) => handleLocationChange(itemValue)}
            >
              {car.locations.map((location, index) => (
                <Picker.Item key={index} label={location.locationName} value={location.locationName} />
              ))}
            </Picker>
          </View>
        </View>

        {allowedCategories.map((category, index) => (
          selectedLocation[category] && (
            <View key={index}>
              <TouchableOpacity onPress={() => toggleCategoryVisibility(category)}>
                <View style={styles.toggleButton}>
                  <Text style={styles.toggleText}>{categoryDisplayNames[category]}</Text>
                </View>
              </TouchableOpacity>
              {visibleCategory === category && (
                <View>
                  {category === 'services' ? (
                    selectedLocation.services.map((service, serviceIndex) => (
                      <View key={serviceIndex}>
                        {service.components.map((component, componentIndex) => (
                          <View key={componentIndex}>
                            {Object.keys(component).map((subCategory, subCategoryIndex) => (
                              <View key={subCategoryIndex}>
                                <TouchableOpacity onPress={() => toggleDetails(`${category}_${serviceIndex}_${componentIndex}_${subCategoryIndex}`)}>
                                  <View style={styles.detailsBox1}>
                                    <Text style={styles.detailsLabel}>{subCategory}</Text>
                                  </View>
                                </TouchableOpacity>
                                {showDetails[`${category}_${serviceIndex}_${componentIndex}_${subCategoryIndex}`] && (
                                  <View style={styles.detailsContainer}>
                                    {component[subCategory].map((info, infoIndex) => (
                                      <View key={infoIndex} style={styles.detailsBox}>
                                        <Text style={styles.detailsLabel}>Store Full Name:</Text>
                                        <Text style={styles.detailsText}>{info.StoreFullName}</Text>
                                        <TouchableOpacity onPress={() => handleAddressPress(info.location)}>
                                          <Text style={styles.detailsLabel}>Address:</Text>
                                          <Text style={styles.detailsText}>{info.location}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handlePhonePress(info.phoneNumber)}>
                                          <Text style={styles.detailsLabel}>Phone:</Text>
                                          <Text style={styles.detailsText}>{info.phoneNumber}</Text>
                                        </TouchableOpacity>
                                      </View>
                                    ))}
                                  </View>
                                )}
                              </View>
                            ))}
                          </View>
                        ))}
                      </View>
                    ))
                  ) : (
                    selectedLocation[category].map((store, storeIndex) => (
                      <View key={storeIndex}>
                        <TouchableOpacity onPress={() => toggleDetails(`${category}_${storeIndex}`)}>
                          <View style={styles.detailsBox1}>
                            <Text style={styles.detailsLabel}>{store.StoreName}</Text>
                          </View>
                        </TouchableOpacity>
                        {showDetails[`${category}_${storeIndex}`] && (
                          <View style={styles.detailsContainer}>
                            {store.storeInfo.map((info, infoIndex) => (
                              <View key={infoIndex} style={styles.detailsBox}>
                                <Text style={styles.detailsLabel}>Store Full Name:</Text>
                                <Text style={styles.detailsText}>{info.StoreFullName}</Text>
                                <TouchableOpacity onPress={() => handleAddressPress(info.location)}>
                                  <Text style={styles.detailsLabel}>Address:</Text>
                                  <Text style={styles.detailsText}>{info.location}</Text>
                                </TouchableOpacity>
                                <Text style={styles.detailsLabel}>Price:</Text>
                                <Text style={styles.detailsText}>{info.price}</Text>
                                <TouchableOpacity onPress={() => handlePhonePress(info.phoneNumber)}>
                                  <Text style={styles.detailsLabel}>Phone:</Text>
                                  <Text style={styles.detailsText}>{info.phoneNumber}</Text>
                                </TouchableOpacity>
                                <Text style={styles.detailsLabel}>Working Hours:</Text>
                                <Text style={styles.detailsText2}>{info.time}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))
                  )}
                </View>
              )}
            </View>
          )
        ))}
      </ScrollView>
      <CalculatorButton />
      <Contact />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4dad00',
    alignItems: 'center',
    paddingTop: screenHeight * 0.02,
    paddingBottom: screenHeight * 0.04,
  },
  carContainer: {
    padding: screenWidth * 0.0533,
    borderRadius: screenWidth * 0.04,
    alignItems: 'center',
    width: screenWidth * 1.1,
    marginBottom: screenHeight * 0.02,
  },
  image: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.17,
    borderRadius: screenWidth * 0.04,
    marginBottom: screenHeight * 0.01,
  },
  dropdownContainer: {
    width: screenWidth * 0.667,
    marginBottom: screenHeight * 0.02,
  },
  pickerWrapper: {
    borderRadius: screenWidth * 0.04, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#ccc', 
  },
  dropdown: {
    height: screenHeight * 0.08,
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
  },
  toggleButton: {
    backgroundColor: '#66FF00',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.04,
    borderRadius: screenWidth * 0.0333,
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.9,
    alignItems: 'center',
  },
  toggleText: {
    color: 'black',
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
    backgroundColor: '#4f8226',
    padding: screenWidth * 0.0267,
    borderRadius: screenWidth * 0.0267,
    marginBottom: screenHeight * 0.01,
  },
  detailsLabel: {
    fontSize: screenWidth * 0.0427,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  detailsText: {
    fontSize: screenWidth * 0.0427,
    borderBottomWidth: 0.4,
    textAlign: 'center',
  },
  detailsText2: {
    fontSize: screenWidth * 0.0427,
    textAlign: 'center',
  },
});

export default SelectedCar;
