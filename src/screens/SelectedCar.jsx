import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalculatorButton from '../components/CalculatorButton';
import Contact from '../components/contact';
import telephone from '../assets/images/telephone.png';
import location from '../assets/images/location.png';
import placeholder from '../assets/images/placeholder.png';

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
  const [selectedComponent, setSelectedComponent] = useState({});

  useEffect(() => {
    if (car.carname) {
      navigation.setOptions({ title: car.carname });
    }
  }, [car.carname, navigation]);

  const handleLocationChange = useCallback((locationName) => {
    const foundLocation = car.locations.find(location => location.locationName === locationName);
    setSelectedLocation(foundLocation);
    setVisibleCategory(null);
    setShowDetails({});
  }, [car.locations]);

  const toggleCategoryVisibility = useCallback((category) => {
    setVisibleCategory(prevCategory => (prevCategory === category ? null : category));
    setShowDetails({});
  }, []);

  const toggleDetails = useCallback((key) => {
    setShowDetails(prevDetails => ({
      [key]: !prevDetails[key],
    }));
  }, []);

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
          {car.logoImage && <Image source={{ uri: car.logoImage.asset.url }} style={styles.image}  resizeMode="contain"/>}
        </View>

        <View style={styles.dropdownContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLocation.locationName}
              style={styles.dropdown}
              onValueChange={handleLocationChange}
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
                      <ServiceItem
                        key={serviceIndex}
                        service={service}
                        toggleDetails={toggleDetails}
                        showDetails={showDetails}
                        handleAddressPress={handleAddressPress}
                        handlePhonePress={handlePhonePress}
                        selectedComponent={selectedComponent}
                        setSelectedComponent={setSelectedComponent}
                      />
                    ))
                  ) : (
                    selectedLocation[category].map((store, storeIndex) => (
                      <StoreItem
                        key={storeIndex}
                        store={store}
                        toggleDetails={toggleDetails}
                        showDetails={showDetails}
                        handleAddressPress={handleAddressPress}
                        handlePhonePress={handlePhonePress}
                      />
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

const ServiceItem = ({ service, toggleDetails, showDetails, handleAddressPress, handlePhonePress, selectedComponent, setSelectedComponent }) => {
  const componentKeys = ['winches', 'chargeonroad', 'dryclean']; // Since these are known keys

  return (
    <View>
   
      {componentKeys.map((key, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleDetails(`${key}_${service.servicelocation}`)}>
            <View style={styles.detailsBox1}>
              <Text style={styles.detailsLabel}>{categoryDisplayNames[key] || key}</Text>
            </View>
          </TouchableOpacity>
          {showDetails[`${key}_${service.servicelocation}`] && (
            <DetailsView
              details={service[key] || []}
              handleAddressPress={handleAddressPress}
              handlePhonePress={handlePhonePress}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const StoreItem = ({ store, toggleDetails, showDetails, handleAddressPress, handlePhonePress }) => (
  <View>
    <TouchableOpacity onPress={() => toggleDetails(store.StoreName)}>
      <View style={styles.detailsBox1}>
        <Text style={styles.detailsLabel}>{store.StoreName}</Text>
      </View>
    </TouchableOpacity>
    {showDetails[store.StoreName] && (
      <DetailsView
        details={store.storeInfo}
        handleAddressPress={handleAddressPress}
        handlePhonePress={handlePhonePress}
      />
    )}
  </View>
);const DetailsView = ({ details, handleAddressPress, handlePhonePress }) => (
  details.length > 0 ? (
    details.map((info, infoIndex) => (
      <View key={infoIndex} style={styles.detailsBox}>
        <Text style={styles.detailsText2}>
          {info.StoreFullName || info.ServiceStoreFullName 
        }
        </Text>
        <View style={styles.row1}>
          <Text style={styles.cityName}>
            {info.servicelocation || info.locationFullName || info.ServiceLocation 
          }
          </Text>
          <Image source={placeholder} style={styles.icon} />
        </View>
        <Text style={styles.detailsText3}>{info.time 
      }</Text>

        <View style={styles.row}>
          {/* First phone number */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handlePhonePress(info.phoneNumber || info.ServicePhoneNumber)}
          >
            <Image source={telephone} style={styles.icon} />
            <Text style={styles.bbold}></Text>
          </TouchableOpacity>

          {/* Second phone number */}
          {info.phoneNumber2 && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handlePhonePress(info.phoneNumber2)}
            >
              <Image source={telephone} style={styles.icon} />
              <Text style={styles.bbold}>2</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Address button */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleAddressPress(info.location || info.ServiceLocation)}
        >
          <Image source={location} style={styles.icon2} />
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <Text style={styles.detailsLabel}>No details available</Text>
  )
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4dad00',
    alignItems: 'center',
    paddingTop: screenHeight * 0.02,
    paddingBottom: screenHeight * 0.22,
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
    color: 'black',
    textAlign: 'center',
  },
  detailsText: {
    fontSize: screenWidth * 0.0427,
    textAlign: 'right',
  },
  detailsText2: {
    fontSize: screenWidth * 0.0427,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  detailsText3: {
    fontSize: screenWidth * 0.0427,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  icon: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    resizeMode: 'contain',
    marginRight:5,
  },


  icon2:{
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    marginLeft:0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom:15,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: screenWidth * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cityName: {
    color: 'black',
    fontSize: screenWidth * 0.0427,
    textAlign: 'right',
    width: screenWidth * 0.7, // Increase width as needed
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure vertical alignment
    marginVertical: screenWidth * 0.03,
    width: screenWidth * 0.9, // Adjust width to align items properly
    justifyContent: 'space-between', // Distribute space between icon and text
  },

  bbold:{

fontWeight:'bold'
  }
});

export default SelectedCar;
