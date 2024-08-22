// src/screens/navigation/MyStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../HomeScreen';
import SelectedCar from '../SelectedCar';
import { Text, View, StyleSheet } from 'react-native';
import WebsiteScreen from '../WebsiteScreen';

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
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4dad00', 
        },
        headerTintColor: '#FFFFFF', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center', 
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

<Stack.Screen
        name="WebsiteScreen"
        component={WebsiteScreen}
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
