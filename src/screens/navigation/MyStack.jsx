// src/screens/navigation/MyStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import SelectedCar from '../SelectedCar';
import { Text, View, StyleSheet } from 'react-native';

// Define a custom header component
const CustomHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Electric Car</Text>
  </View>
);

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#101218', // Header background color
        },
        headerTintColor: '#FFFFFF', // Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center', // Center the title
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="SelectedCar"
        component={SelectedCar}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60, // Adjust height if necessary
    backgroundColor: '#101218',
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MyStack;
