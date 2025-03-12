import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar
} from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import components
import TapToPayStatus from '@/components/settings/TapToPayStatus';
import DraggablePaymentOptionsFlatList from '@/components/settings/DraggablePaymentOptionsFlatList';

// Import context
import { usePayment } from '@/context/PaymentContext';

export default function PaymentSettingsScreen() {
  const { paymentOptions, setPaymentOptions, isSelfVerified } = usePayment();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <DraggablePaymentOptionsFlatList
          paymentOptions={paymentOptions}
          setPaymentOptions={setPaymentOptions}
          isSelfVerified={isSelfVerified}
        />
        
        {/* Bottom Tap-to-Pay Indicator */}
        <View style={styles.bottomContainer}>
          <TapToPayStatus primaryMethodName={paymentOptions[0]?.name || '' }/>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
