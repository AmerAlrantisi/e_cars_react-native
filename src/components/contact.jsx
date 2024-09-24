import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Linking, Alert } from 'react-native';
import icon from '../assets/images/facebook.png';
import icon23 from '../assets/images/phone.png';
import icon2 from '../assets/images/operator.png';
import { Image } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Contact = (phoneNumber) => {
  const handleCall = () => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

   const openFacebookGroup = () => {
    closeModal(); // Close the modal before navigating
    Linking.openURL('https://www.facebook.com/groups/400615952771950/?ref=share&mibextid=KtfwRi'); // Open Facebook group URL
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={openModal}>
        <Image source={icon2} style={styles.icon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.title}>تواصل معنا</Text>
<View style={styles.row}>
                <TouchableOpacity onPress={openFacebookGroup} style={styles.visitButton}>
                <Image source={icon} style={styles.icon} />
                </TouchableOpacity>


                {phoneNumber && (
              <TouchableOpacity onPress={handleCall} style={styles.visitButton}>
                <Image source={require('../assets/images/phone.png')} style={styles.icon} />
              </TouchableOpacity>
            )}
</View>
               
              </View>

            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: screenHeight * 0.05,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {

    width: screenWidth * 0.8,
    padding: screenWidth * 0.15,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.04,
    alignItems: 'center',
  },
  title: {
    fontSize: screenWidth * 0.06,
    marginBottom: screenHeight * 0.02,
    textAlign: 'center',
  },
  visitButton: {
    marginTop: screenHeight * 0.02,
    margin:10,
    backgroundColor: '#4dad00',
    padding: screenWidth * 0.03,
    borderRadius: screenWidth * 0.03,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: screenHeight * 0.02,
    backgroundColor: '#f44336',
    padding: screenWidth * 0.03,
    borderRadius: screenWidth * 0.03,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: screenWidth * 0.045,
  },
  icon: {
    width: screenWidth * 0.065,
    height: screenWidth * 0.065,
  },


  row:{

    flexDirection: 'row',
    alignItems: 'center',
   paddingHorizontal:10,
  }

});

export default Contact;
