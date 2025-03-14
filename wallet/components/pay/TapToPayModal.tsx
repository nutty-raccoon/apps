import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AnimatedTapToPayIcon from "./AnimatedTapToPayIcon";
import ThemedModal from "@/components/ui/ThemedModal";

interface TapToPayModalProps {
  visible: boolean;
  onRequestClose: () => void;
  isProcessing: boolean;
  paymentFailed: boolean;
  onPaymentPress: () => void;
}

const TapToPayModal = ({
  visible,
  onRequestClose,
  isProcessing,
  paymentFailed,
  onPaymentPress
}: TapToPayModalProps) => {
  // Determine animation status based on component state
  const animationStatus = isProcessing
    ? 'processing'
    : paymentFailed
      ? 'error'
      : 'idle';

  return (
    <ThemedModal
      visible={visible}
      onRequestClose={onRequestClose}
      showCloseButton={false}
    >
      {/* Pass animation status to icon component */}
      <AnimatedTapToPayIcon status={animationStatus} />

      <Text style={[
        styles.tapToPayText,
        paymentFailed && styles.errorText
      ]}>
        {isProcessing ? "Processing..." :
          paymentFailed ? "Payment Failed" :
            "Tap to Pay"}
      </Text>
      <Text style={styles.tapToPaySubText}>
        {isProcessing
          ? "Please keep your device near the terminal"
          : paymentFailed
            ? "Amount exceeds your balance"
            : "Hold your device near the payment terminal"}
      </Text>

      <TouchableOpacity
        style={[
          styles.tapToPayButton,
          isProcessing && styles.disabledButton,
          paymentFailed && styles.disabledButton
        ]}
        onPress={onPaymentPress}
        disabled={isProcessing || paymentFailed}
      >
        <Text style={styles.tapToPayButtonText}>
          {isProcessing ? "Processing..." :
            paymentFailed ? "Failed" :
              "Simulate Payment"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.cancelButton,
          isProcessing && styles.disabledButton
        ]}
        onPress={onRequestClose}
        disabled={isProcessing}
      >
        <Text style={[
          styles.cancelButtonText,
          isProcessing && styles.disabledText
        ]}>
          {paymentFailed ? "Return" : "Cancel"}
        </Text>
      </TouchableOpacity>
    </ThemedModal>
  );
};

export default TapToPayModal;

const styles = StyleSheet.create({
  tapToPayText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  errorText: {
    color: '#D32F2F',
  },
  tapToPaySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
  },
  tapToPayButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  tapToPayButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: '#999',
  },
});