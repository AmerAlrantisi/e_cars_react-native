import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const sliderRef = useRef(null);
  const timerRef = useRef(null);

  const infiniteImages = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollToIndex({ index: currentIndex, animated: false });
    }
  }, [currentIndex]);

  const startAutoScroll = () => {
    stopAutoScroll();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= infiniteImages.length) {
          return 1;
        }
        return nextIndex;
      });
    }, autoScrollInterval);
  };

  const stopAutoScroll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleMomentumScrollEnd = () => {
    if (currentIndex === infiniteImages.length - 1) {
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setCurrentIndex(infiniteImages.length - 2);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { opacity: index === (currentIndex - 1 + images.length) % images.length ? 1 : 0.5 },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        data={infiniteImages}
        ref={sliderRef}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        keyExtractor={(_, index) => index.toString()}
        onScrollBeginDrag={stopAutoScroll}
        onScrollEndDrag={startAutoScroll}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%', // Ensure it takes full width
    height: 200, // Set height explicitly if needed
  },
  imageContainer: {
    width,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
});

export default ImageSlider;
