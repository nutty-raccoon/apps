import React, { ReactNode } from "react";
import { StyleSheet, Modal, SafeAreaView, View, Text, TouchableOpacity } from "react-native";

interface ThemedModalProps {
  visible: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const ThemedModal = ({
  visible,
  onRequestClose,
  children,
  title,
  showCloseButton = true
}: ThemedModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && (
            <Text style={styles.modalTitle}>{title}</Text>
          )}
          
          {children}
          
          {showCloseButton && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onRequestClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ThemedModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
  },
});