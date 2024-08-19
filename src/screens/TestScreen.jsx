import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import client from '../client';
import { homeData } from '../queries';

const TestScreen = () => {
  const [data, setData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.fetch(homeData());
      console.log('Fetched data:', JSON.stringify(result, null, 2)); // Log the entire result
      setData(result);

      if (result.length > 0 && result[0].cars.length > 0) {
        setSelectedCar(result[0].cars[0].carname); // Using carname for display
        setLocations(result[0].cars[0].locations);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCarSelection = (car) => {
    setSelectedCar(car.carname);
    setLocations(car.locations || []);
    setSelectedStore(null);
  };

  const handleStoreSelection = (store) => {
    setSelectedStore(store);
  };

  const renderCarButtons = () => {
    return data.flatMap(item => item.cars).map((car, index) => (
      <TouchableOpacity
        key={index} // Unique key for list items
        style={styles.button}
        onPress={() => handleCarSelection(car)}
      >
        <Text style={styles.buttonText}>{car.carname}</Text>
      </TouchableOpacity>
    ));
  };

  const renderStoreList = () => {
    const allStores = locations.flatMap(location => [
      ...(location.chargingStation || []),
      ...(location.maintenanceCenter || []),
      ...(location.sparePartsStore || []),
      ...(location.accessoriesStore || []),
      ...(location.chargerStore || []),
      ...(location.carShowroom || []),
    ]);

    return allStores.map((store, index) => (
      <TouchableOpacity
        key={index} // Unique key for list items
        style={styles.listItem}
        onPress={() => handleStoreSelection(store)}
      >
        <Text style={styles.listItemText}>{store.StoreName}</Text>
      </TouchableOpacity>
    ));
  };

  const renderStoreInfo = () => {
    if (!selectedStore) return null;

    const storeInfo = selectedStore.storeInfo || [];

    return storeInfo.map((info, index) => (
      <View key={index} style={styles.storeContainer}>
        <Text style={styles.storeText}>Store Full Name: {info.StoreFullName}</Text>
        <Text style={styles.storeText}>Price: {info.price}</Text>
        <Text style={styles.storeText}>Phone Number: {info.phoneNumber}</Text>
        <Text style={styles.storeText}>Location: {info.location}</Text>
        <Text style={styles.storeText}>Time: {info.time}</Text>
      </View>
    ));
  };

  const renderLogoImage = () => {
    const logoImage = data.flatMap(item => item.cars).find(car => car.logoImage)?.logoImage;
    if (!logoImage) return null;

    return (
      <Image
        source={{ uri: logoImage.asset.url }}
        style={styles.logoImage}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Welcome to Cars app!</Text>

      <Text style={styles.sectionTitle}>Select a Car</Text>
      {renderCarButtons()}

      {selectedCar && (
        <>
          <Text style={styles.sectionTitle}>Select a Store</Text>
          {renderStoreList()}
        </>
      )}

      {renderStoreInfo()}

      {renderLogoImage()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    margin: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 16,
  },
  storeContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#d0d0d0',
    borderRadius: 5,
  },
  storeText: {
    fontSize: 14,
  },
  logoImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default TestScreen;
