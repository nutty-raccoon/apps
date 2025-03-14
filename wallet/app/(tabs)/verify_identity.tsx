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
import { VerifiedUser } from '@/types/VerificationTypes';

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
const VerifiedPassportView = ({
  onForgetPress,
  verifiedUser,
}: {
  onForgetPress: () => void,
  verifiedUser: VerifiedUser,
}) => (
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

    {/* Passport Information */}
    <View style={styles.passportInfoContainer}>
      <View style={styles.infoRow}>
        <ThemedText style={styles.infoLabel}>Nationality:</ThemedText>
        <ThemedText style={styles.infoValue}>{verifiedUser.nationality}</ThemedText>
      </View>
      <View style={styles.infoRow}>
        <ThemedText style={styles.infoLabel}>Passport Number:</ThemedText>
        <ThemedText style={styles.infoValue}>{verifiedUser.passportNumber}</ThemedText>
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
  const { verifiedUser, updateVerifiedUser } = usePayment();
  const isSelfVerified = !!verifiedUser;

  const handleScanPassport = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleVerificationComplete = (verifiedUser: VerifiedUser) => {
    updateVerifiedUser(verifiedUser);
    setModalVisible(false);
  };

  const handleForgetPassport = () => {
    updateVerifiedUser(null);
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
        <VerifiedPassportView
          onForgetPress={handleForgetPassport}
          verifiedUser={verifiedUser}
        />
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
    marginBottom: 20,
    position: 'relative',
  },
  passportInfoContainer: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#E8F4FF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#BDDEFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#0056b3',
  },
  infoValue: {
    color: '#333333',
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
