import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const PayButton = ({ onPress, isPaid, paymentFailed, amount }) => {
  const isDisabled = isPaid || amount === 0;
  
  return (
    <TouchableOpacity 
      style={[
        styles.payButton, 
        isPaid ? styles.payButtonSuccess : null,
        paymentFailed ? styles.payButtonError : null,
        amount === 0 ? styles.payButtonDisabled : null
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={styles.payButtonText}>
        {isPaid ? 'Payment Successful!' : 
         paymentFailed ? 'Payment Failed' :
         amount === 0 ? 'Paid' : 'Pay Now'}
      </Text>
    </TouchableOpacity>
  );
};

export default PayButton;

const styles = StyleSheet.create({
  payButton: {
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
  payButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  payButtonSuccess: {
    backgroundColor: '#4CAF50',
  },
  payButtonError: {
    backgroundColor: '#D32F2F',
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
