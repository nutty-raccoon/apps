import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AmountDisplayProps {
  amount: number;
  errorMessage: string;
}

const AmountDisplay = ({ amount, errorMessage }: AmountDisplayProps) => {
  return (
    <View style={styles.amountContainer}>
      <Text style={styles.amountLabel}>Total Balance</Text>
      <Text style={styles.amountValue}>${amount.toFixed(2)} USD</Text>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default AmountDisplay;

const styles = StyleSheet.create({
  amountContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  errorMessage: {
    marginTop: 10,
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
});