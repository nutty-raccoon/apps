import React, { useState } from 'react';
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

// Import types
import { PaymentOption } from '@/types/PaymentTypes';

// Import constants
import { DEFAULT_PAYMENT_METHODS } from '@/constants/PaymentMethods';
import DraggablePaymentOptionsFlatList from '@/components/settings/DraggablePaymentOptionsFlatList';

export default function PaymentSettingsScreen() {
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>(DEFAULT_PAYMENT_METHODS);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: "Tap-to-Pay Settings",
            headerShown: true,
          }}
        />
        <StatusBar barStyle="dark-content" />
        
        {/* Info Header */}
        <View style={styles.infoHeader}>
          <Text style={styles.infoText}>
            Drag to rearrange payment methods by priority
          </Text>
        </View>
        
        {/* Draggable Payment Options List */}
        <DraggablePaymentOptionsFlatList paymentOptions={paymentOptions} setPaymentOptions={setPaymentOptions} />
        
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
