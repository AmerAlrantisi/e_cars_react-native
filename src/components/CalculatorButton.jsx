import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Dimensions } from 'react-native';

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
      setResult(numKilos * 19.3);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={openModal}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>لحساب تكلفة الشحنة</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={kilos}
              onChangeText={setKilos}
              placeholder="عدد الكيلومترات"
            />
            <Button title="حساب" onPress={calculateResult} color="#1d99ee" />
            {result !== null && (
              <Text style={styles.resultText}>
                تكلفة الشحنة: {result.toFixed(2)}
              </Text>
            )}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>اغلاق</Text>
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
  fabText: {
    color: 'white',
    fontSize: screenWidth * 0.1,
    lineHeight: screenWidth * 0.12,
    textAlign: 'center',
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
  },
  resultText: {
    fontSize: screenWidth * 0.05,
    marginTop: screenHeight * 0.02,
  },
  closeButton: {
    marginTop: screenHeight * 0.02,
    backgroundColor: '#4dad00',
    padding: screenWidth * 0.03,
    borderRadius: screenWidth * 0.03,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: screenWidth * 0.045,
  },
});

export default CalculatorButton;
