import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

const AdPopup = ({ visible, onClose, mainImage, phoneNumber }) => {
  // Function to handle phone call
  const handleCall = () => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Display the mainImage if available */}
          {mainImage && (
            <Image source={{ uri: mainImage }} style={styles.image} />
          )}

          {/* Render the buttons row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {phoneNumber && (
              <TouchableOpacity onPress={handleCall} style={styles.phoneButton}>
                <Image source={require('../assets/images/phone.png')} style={styles.phoneIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: ScreenWidth*.8,

    padding: 80,
    // backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width:ScreenWidth*.9,
    height:  ScreenHeight*.4,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#4dad00',
    borderRadius: 5,
    marginRight: 10,
    
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal:19,
  },
  phoneButton: {
    padding: 8.5,
    backgroundColor: '#4dad00',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal:22,
    

  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
});

export default AdPopup;
