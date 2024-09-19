import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import client from '../client';
import { homeData } from '../queries';
import Contact from '../components/contact';
import CalculatorButton from '../components/CalculatorButton';
import ImageSlider from '../components/ImageSlider';
import AdPopup from '../components/AdPopup';  // Import your popup component

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null); // New state for mainImage
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phoneNumber
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Set popup to visible initially

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.fetch(homeData());
      setData(result);

      if (result.length > 0) {
        const homeInfo = result[0];

        // Set cars and images
        setCars(homeInfo.cars);
        setImages(homeInfo.images || []);

        // Set mainImage and phoneNumber
        setMainImage(homeInfo.mainImage?.asset?.url || null); // Use null if mainImage doesn't exist
        setPhoneNumber(homeInfo.phoneNumber || ''); // Use empty string if phoneNumber doesn't exist
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToSelectedCar = (car) => {
    navigation.navigate('SelectedCar', { car });
  };

  const renderCarItem = ({ item }) => (
    <TouchableOpacity
      key={item.carname}
      style={styles.box}
      onPress={() => navigateToSelectedCar(item)}
    >
      <Image source={{ uri: item.logoImage?.asset?.url }} style={styles.btnimage} />
      <Text style={styles.carname}>{item.carname}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4dad00', 'white']} style={styles.gradient}>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.carname}
        numColumns={3}
        contentContainerStyle={styles.container}
        ListHeaderComponent={images.length > 0 ? <ImageSlider images={images.map(image => image.asset?.url)} /> : null}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TermsConditionsScreen')}>
              <Text style={styles.footerLink}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <CalculatorButton />
      <Contact />

      {/* Render AdPopup */}
      <AdPopup 
        visible={isPopupVisible} 
        onClose={() => setIsPopupVisible(false)} 
        mainImage={mainImage} // Pass the mainImage prop
        phoneNumber={phoneNumber} // Pass the phoneNumber prop
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingBottom: ScreenHeight * 0.22,
  },
  btnimage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  carname: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    width: ScreenWidth * 0.3,
    height: 180,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
