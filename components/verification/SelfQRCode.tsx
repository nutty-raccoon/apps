import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'react-native-qrcode-svg';
import { ThemedText } from '@/components/ThemedText';

// Mock SelfAppBuilder class since we don't have the actual package for React Native
class SelfAppBuilder {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  build() {
    return {
      ...this.config,
      qrCodeData: JSON.stringify(this.config) // This would normally be handled by the Self SDK
    };
  }
}

export default function SelfQRCode() {
  const [userId, setUserId] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string>('');

  useEffect(() => {
    // Generate a user ID when the component mounts
    const generatedId = uuidv4();
    setUserId(generatedId);
    
    // Create the SelfApp configuration
    if (generatedId) {
      const selfApp = new SelfAppBuilder({
        appName: "My Wallet App",
        scope: "wallet-verification-scope",
        endpoint: "https://mywalletapp.com/api/verify",
        userId: generatedId,
        disclosures: {
          // Request passport information
          name: true,
          nationality: true,
          date_of_birth: true,
          
          // Set verification rules
          minimumAge: 18,
          excludedCountries: ["IRN", "PRK", "RUS"],
          ofac: true,
        },
      }).build();


      // Set the QR code value
      setQrValue(selfApp.qrCodeData);
    }
  }, []);

  if (!userId) return null;

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Verify Your Identity</ThemedText>
      <ThemedText style={styles.description}>
        Scan this QR code with the Self app to verify your identity
      </ThemedText>
      
      <View style={styles.qrContainer}>
        {qrValue ? (
          <QRCode
            value={qrValue}
            size={250}
            backgroundColor="white"
            color="black"
          />
        ) : null}
      </View>
      
      <ThemedText style={styles.userIdText}>
        User ID: {userId ? `${userId.substring(0, 8)}...` : ''}
      </ThemedText>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666'
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  userIdText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
  }
});
