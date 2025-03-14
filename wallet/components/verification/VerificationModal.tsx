import React from 'react';
import { StyleSheet } from 'react-native';
import UUIDDisplay from './UUIDDisplay';
import ThemedModal from '@/components/ui/ThemedModal';
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
  // Handle verification completion
  const handleVerificationComplete = (verifiedUser: VerifiedUser) => {
    // Close the modal first
    onClose();
    // Then trigger the verification complete callback
    onVerificationComplete(verifiedUser);
  };

  return (
    <ThemedModal
      visible={visible}
      onRequestClose={onClose}
      title="Passport Verification"
    >
      <UUIDDisplay
        onVerificationComplete={handleVerificationComplete}
        onVerificationFailed={onClose}
      />
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  // Styles can be added here if needed in the future
});