import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import client from '../client';
import { homeData } from '../queries';
import Contact from '../components/contact';
import CalculatorButton from '../components/CalculatorButton';
import ImageSlider from '../components/ImageSlider';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [images, setImages] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);


  const handlePrivacyPolicyPress = () => {
    navigation.navigate('PrivacyPolicyScreen'); // Navigates to the Privacy Policy screen
  };
  
  const handleTermsPress = () => {
    navigation.navigate('TermsConditionsScreen'); // Navigates to the Terms & Conditions screen
  };
  const imagesss = [
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        autoScroll();
      }, 5400);

      return () => clearInterval(interval);
    }
  }, [scrollX, images]);

  const fetchData = async () => {
    try {
      const result = await client.fetch(homeData());
      console.log('Fetched data:', JSON.stringify(result, null, 2));
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
      const totalWidth = ScreenWidth * (images.length + 2);
      const nextIndex = scrollX + ScreenWidth >= totalWidth ? ScreenWidth : scrollX + ScreenWidth;

      if (scrollX + ScreenWidth >= totalWidth) {
        scrollViewRef.current.scrollTo({ x: ScreenWidth, animated: false });
        setScrollX(ScreenWidth);
      } else {
        scrollViewRef.current.scrollTo({ x: nextIndex, animated: true });
        setScrollX(nextIndex);
      }
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / ScreenWidth);
    setCurrentSlide(index);
  };

  const handleMomentumScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const totalWidth = ScreenWidth * (images.length + 2);

    if (contentOffsetX === 0) {
      scrollViewRef.current.scrollTo({ x: totalWidth - ScreenWidth, animated: false });
    } else if (contentOffsetX === totalWidth - ScreenWidth) {
      scrollViewRef.current.scrollTo({ x: ScreenWidth, animated: false });
    }
  };

  const carsChunks = chunkArray(cars, 2);

  const renderPaginationDots = () => {
    const totalDots = images.length;
    const maxVisibleDots = 5;
    const dots = [];

    const start = Math.max(0, currentSlide - 2);
    const end = Math.min(totalDots, start + maxVisibleDots);

    for (let i = start; i < end; i++) {
      const opacity = i === currentSlide ? 1 : i === currentSlide - 1 || i === currentSlide + 1 ? 0.7 : 0.3;
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            { opacity, backgroundColor: i === currentSlide ? 'white' : 'gray' }
          ]}
        />
      );
    }

    return dots;
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {images.length > 0 && (
          <ImageSlider images={images.map(image => image.asset?.url)} />
        )}

        {carsChunks.map((chunk, index) => (
          <View key={index} style={styles.row}>
            {chunk.map((car) => (
              <TouchableOpacity
                key={car.carname}
                style={styles.box}
                onPress={() => navigateToSelectedCar(car)}
              >
                <Image source={{ uri: car.logoImage?.asset?.url }} style={styles.btnimage} />
                <Text style={styles.carname}>{car.carname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
  <View style={styles.footer}>
          <TouchableOpacity onPress={handlePrivacyPolicyPress}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTermsPress}>
            <Text style={styles.footerLink}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <CalculatorButton />
      <Contact />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4dad00',
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: ScreenHeight * 0.22,
  },
  imageScrollContainer: {
    maxHeight: 250,
  },
  image: {
    width: ScreenWidth,
    height: 200,
    borderWidth: 3,
    borderColor: 'white',
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
    width: ScreenWidth * 0.45, // Adjust width as needed
    height: 200, // Set a fixed height
    padding: 10,
    backgroundColor: '#66FF00',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },

  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerLink: {
    color: '#007BFF', // Blue link color
    textDecorationLine: 'underline',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
