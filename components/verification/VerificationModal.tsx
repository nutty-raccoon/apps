import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Text
} from 'react-native';
import { BlurView } from 'expo-blur';

import SelfQRCode from './SelfQRCode';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerificationComplete?: () => void;
}

export default function VerificationModal({
  visible,
  onClose,
  onVerificationComplete
}: VerificationModalProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const statusBarHeight = StatusBar.currentHeight || 0;
  const topPadding = Platform.OS === 'ios' ? 40 : statusBarHeight;

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
          
          <SelfQRCode onVerificationComplete={onVerificationComplete} />
          
          <TouchableOpacity
            style={styles.mockVerifyButton}
            onPress={() => {
              if (onVerificationComplete) {
                onVerificationComplete();
              }
              onClose();
            }}
          >
            <ThemedText style={styles.mockVerifyButtonText}>
              Mock Passport Verified
            </ThemedText>
          </TouchableOpacity>
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
  closeButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 10,
  },
  mockVerifyButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mockVerifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});