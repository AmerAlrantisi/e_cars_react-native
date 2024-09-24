import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import client from '../client';
import { homeData } from '../queries';
import Contact from '../components/contact';
import CalculatorButton from '../components/CalculatorButton';
import ImageSlider from '../components/ImageSlider';
import AdPopup from '../components/AdPopup';
import icon2 from '../assets/images/phone.png';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await client.fetch(homeData());
      setData(result);

      if (result.length > 0) {
        const homeInfo = result[0];

        setCars(homeInfo.cars || []);
        setImages(homeInfo.images || []);
        setMainImage(homeInfo.mainImage?.asset?.url || null);
        setPhoneNumber(homeInfo.phoneNumber || '');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToSelectedCar = (car) => {
    navigation.navigate('SelectedCar', { car });
  };

  const CarItem = React.memo(({ item, onPress }) => (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      {item.logoImage?.asset?.url ? (
        <Image source={{ uri: item.logoImage.asset.url }} style={styles.btnimage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.carname}>{item.carname}</Text>
    </TouchableOpacity>
  ));

  const renderCarItem = ({ item }) => (
    <CarItem item={item} onPress={() => navigateToSelectedCar(item)} />
  );

  return (
    <LinearGradient colors={['#4dad00', 'white']} style={styles.gradient}>
   <FlatList
  data={cars}
  renderItem={({ item }) => (
    <CarItem item={item} onPress={() => navigateToSelectedCar(item)} />
  )}
  keyExtractor={(item) => item.carname}
  numColumns={3}
  contentContainerStyle={styles.container}
  initialNumToRender={5}
  maxToRenderPerBatch={5}
  windowSize={10}
  ListHeaderComponent={images.length > 0 ? <ImageSlider images={images.map(image => image.asset?.url)} /> : null}// here is the reson of warning 

/>
      <CalculatorButton />
      <Contact phoneNumber={phoneNumber} />
      <AdPopup 
        visible={isPopupVisible} 
        onClose={() => setIsPopupVisible(false)} 
        mainImage={mainImage} 
        phoneNumber={phoneNumber} 
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
});

export default HomeScreen;
