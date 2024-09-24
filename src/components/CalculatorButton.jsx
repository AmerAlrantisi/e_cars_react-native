import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native';
import keys from '../assets/images/cccv.png'; // Make sure the path is correct

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CalculatorButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [kilos, setKilos] = useState('');
  const [result, setResult] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setKilos('');
    setResult(null);
  };

  const calculateResult = () => {
    const numKilos = parseFloat(kilos);
    if (!isNaN(numKilos)) {
      setResult(numKilos * 0.193);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={openModal}>
        <Image source={keys} style={styles.keyImage} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText} allowFontScaling={false}>لحساب تكلفة الشحنة</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={kilos}
              onChangeText={setKilos}
              placeholder="عدد الكيلو واط"
              allowFontScaling={false}
            />
            {/* <Button title="حساب" onPress={calculateResult} color="#4dad00" /> */}
            <TouchableOpacity onPress={calculateResult} style={styles.calculatebutton}>
              <Text style={styles.closeButtonText} allowFontScaling={false}>حساب</Text>
            </TouchableOpacity>
            {result !== null && (
              <Text style={styles.resultText} allowFontScaling={false}>
                تكلفة الشحنة: {result.toFixed(2)} دينار
              </Text>
            )}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText} allowFontScaling={false}>اغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: screenHeight * 0.15,
    right: screenWidth * 0.05,
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    backgroundColor: '#66FF00',
    borderRadius: screenWidth * 0.075,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  keyImage: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth * 0.8,
    padding: screenWidth * 0.05,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.04,
    alignItems: 'center',
  },
  modalText: {
    fontSize: screenWidth * 0.05,
    marginBottom: screenHeight * 0.02,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    padding: screenWidth * 0.03,
    marginBottom: screenHeight * 0.02,
    fontSize: screenWidth * 0.05,
    fontFamily: 'System', 
    writingDirection: 'rtl', 
  },
  resultText: {
    fontSize: screenWidth * 0.05,
    marginTop: screenHeight * 0.02,
    fontFamily: 'System', 
    writingDirection: 'rtl', 
  },
  closeButton: {
    marginTop: screenHeight * 0.02,
    backgroundColor: '#4dad00',
    padding: screenWidth * 0.03,
    borderRadius: screenWidth * 0.03,
    alignItems: 'center',
  },
  calculatebutton:{
    marginTop: screenHeight * 0.02,
    backgroundColor: '#4dad00',
    padding: screenWidth * 0.027,
    borderRadius: screenWidth * 0.03,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: screenWidth * 0.045,
  },
});

export default CalculatorButton;
