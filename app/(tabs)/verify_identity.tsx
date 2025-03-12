import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

// Import components
import { ThemedText } from '@/components/ThemedText';
import { ExternalLink } from '@/components/ExternalLink';
import VerificationModal from '@/components/verification/VerificationModal';
import SVGCheckmark from '@/components/verification/SVGCheckmark';

// Import the Payment Context
import { usePayment } from '@/context/PaymentContext';

// Unverified view component
const UnverifiedPassportView = ({ onScanPress }: { onScanPress: () => void }) => (
  <View style={styles.contentContainer}>
    {/* Title */}
    <ThemedText type="title" style={styles.title}>
      ZK-prove your identity with Self.xyz
    </ThemedText>
    
    {/* Learn More Link */}
    <ExternalLink href='https://self.xyz/' style={styles.learnMoreLink}>
      <ThemedText type="link">Learn more about Self</ThemedText>
    </ExternalLink>
    
    {/* E-Passport Icon */}
    <View style={styles.passportIconContainer}>
      <View style={styles.passportTop} />
      <View style={styles.passportCircle} />
      <View style={styles.passportBottom} />
    </View>
    
    {/* Scan Button */}
    <TouchableOpacity
      style={styles.scanButton}
      onPress={onScanPress}
    >
      <ThemedText style={styles.scanButtonText}>
        Scan my passport
      </ThemedText>
    </TouchableOpacity>
  </View>
);

// Verified view component
const VerifiedPassportView = ({ onForgetPress }: { onForgetPress: () => void }) => (
  <View style={styles.contentContainer}>
    {/* Title */}
    <ThemedText type="title" style={styles.title}>
      Passport verified by Self.xyz
    </ThemedText>
    
    {/* E-Passport Icon with Checkmark */}
    <View style={styles.passportIconContainer}>
      <View style={styles.passportTop} />
      <View style={styles.passportCircle} />
      <View style={styles.passportBottom} />
      
      {/* Checkmark overlay */}
      <View style={styles.checkmarkContainer}>
        <SVGCheckmark width={65} height={65} color="#FFFFFF" />
      </View>
    </View>
    
    {/* Forget Button */}
    <TouchableOpacity
      style={styles.forgetButton}
      onPress={onForgetPress}
    >
      <ThemedText style={styles.forgetButtonText}>
        Forget passport
      </ThemedText>
    </TouchableOpacity>
  </View>
);

export default function VerifyIdentityScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Use the Payment Context instead of local state for verification status
  const { isSelfVerified, updateIsSelfVerified } = usePayment();

  const handleScanPassport = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleVerificationComplete = () => {
    // Update the global context with verification status
    updateIsSelfVerified(true);
    setModalVisible(false);
  };

  const handleForgetPassport = () => {
    // Update the global context to clear verification status
    updateIsSelfVerified(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Identity Verification",
          headerShown: true,
        }}
      />
      
      {isSelfVerified ? (
        <VerifiedPassportView onForgetPress={handleForgetPassport} />
      ) : (
        <UnverifiedPassportView onScanPress={handleScanPassport} />
      )}

      {/* Verification Modal */}
      <VerificationModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onVerificationComplete={handleVerificationComplete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },
  learnMoreLink: {
    marginBottom: 40,
    textDecorationLine: 'underline',
  },
  passportIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    marginBottom: 40,
    position: 'relative',
  },
  passportTop: {
    width: 160,
    height: 55,
    backgroundColor: '#0056b3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 20,
  },
  passportBottom: {
    width: 160,
    height: 55,
    backgroundColor: '#0056b3',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    bottom: 20,
  },
  passportCircle: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#007BFF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    zIndex: 1,
  },
  checkmarkContainer: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
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
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgetButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
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
  forgetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
