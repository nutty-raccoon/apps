import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Stack } from 'expo-router';

// Import components
import DraggablePaymentOptionsFlatList from '@/components/settings/DraggablePaymentOptionsFlatList';

// Import context
import { usePayment } from '@/context/PaymentContext';

export default function PaymentSettingsScreen() {
  const { paymentOptions, setPaymentOptions, verifiedUser } = usePayment();
  const isSelfVerified = !!verifiedUser;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Payment Settings",
          headerShown: true,
        }}
      />
      <StatusBar barStyle="dark-content" />

      {/* Info Header */}
      <View style={styles.infoHeader}>
        <Text style={styles.infoText}>
          Drag to rearrange payment methods by priority
        </Text>
        {!isSelfVerified && (
          <Text style={styles.verificationWarning}>
            Some payment methods require passport verification to be enabled
          </Text>
        )}
      </View>

      {/* Draggable Payment Options List */}
      <View style={styles.listWrapper}>
        <DraggablePaymentOptionsFlatList
          paymentOptions={paymentOptions}
          setPaymentOptions={setPaymentOptions}
          isSelfVerified={isSelfVerified}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7'
  },
  infoHeader: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  verificationWarning: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 4,
  },
  listWrapper: {
    flex: 1, // This ensures the list takes up available space
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
    backgroundColor: '#F5F5F7' // Match parent background color
  }
});
