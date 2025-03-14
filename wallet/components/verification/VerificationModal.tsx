import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';
import UUIDDisplay from './UUIDDisplay';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { VerifiedUser } from '@/types/VerificationTypes';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerificationComplete: (user: VerifiedUser) => void;
}

export default function VerificationModal({
  visible,
  onClose,
  onVerificationComplete
}: VerificationModalProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const statusBarHeight = StatusBar.currentHeight || 0;
  const topPadding = Platform.OS === 'ios' ? 40 : statusBarHeight;

  // Handle verification completion
  const handleVerificationComplete = (verifiedUser: VerifiedUser) => {
    // Close the modal first
    onClose();
    // Then trigger the verification complete callback
    onVerificationComplete(verifiedUser);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, { paddingTop: topPadding }]}>
        <BlurView
          intensity={80}
          tint={colorScheme === 'dark' ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[
          styles.modalView,
          { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F5F5F7' }
        ]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <IconSymbol
                name="chevron.right"
                size={28}
                color={colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon}
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <ThemedText>Cancel</ThemedText>
            </TouchableOpacity>
          </View>

          <UUIDDisplay onVerificationComplete={handleVerificationComplete} onVerificationFailed={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: height * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
  },
  cancelButton: {
    padding: 10,
  }
});
