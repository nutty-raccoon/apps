import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Clipboard from 'expo-clipboard';
import { ThemedText } from '@/components/ThemedText';
import { VerifiedUser } from '@/types/VerificationTypes';

interface UUIDDisplayProps {
  onVerificationComplete: (user: VerifiedUser) => void;
  onVerificationFailed: () => void;
}

export default function UUIDDisplay({ onVerificationComplete, onVerificationFailed }: UUIDDisplayProps) {
  const MAX_ATTEMPTS = 90; // 60 seconds timeout
  const registryUrl = process.env.EXPO_PUBLIC_REGISTRY_URL;

  const userId = useRef<string>(uuidv4());
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  // Cleanup function to clear any active intervals and timeouts
  const cleanupTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Register the user initially
    const registerUser = async (id: string) => {
      try {
        const registryUserUrl = `${registryUrl}/user/${id}`;
        await fetch(registryUserUrl, {
          method: 'POST',
        });

        // Start polling for verification status
        startPolling(id);
      } catch (error) {
        // Silently ignore errors
        onVerificationFailed();
        Alert.alert("Internal error", "Failed to register the userId on the server")
      }
    };

    registerUser(userId.current);

    // Clean up on unmount
    return () => {
      cleanupTimers();
    };
  }, []);

  const startPolling = (id: string) => {
    // Set up the interval to check status every second
    intervalRef.current = setInterval(() => {
      checkVerificationStatus(id);
      setAttemptCount(prevCount => {
        const newCount = prevCount + 1;

        // If we've reached the maximum attempts, cancel and timeout
        if (newCount >= MAX_ATTEMPTS) {
          cleanupTimers();
          onVerificationFailed();
          Alert.alert("Verification Timeout", "Passport verification timeout");
        }

        return newCount;
      });
    }, 1000);

    // Set a timeout as a fallback
    timeoutRef.current = setTimeout(() => {
      cleanupTimers();
      onVerificationFailed();
      Alert.alert("Verification Timeout", "Passport verification timeout");
    }, MAX_ATTEMPTS * 1000);
  };

  const checkVerificationStatus = async (id: string) => {
    try {
      const registryUserUrl = `${registryUrl}/user/${id}/proof`;
      const response = await fetch(registryUserUrl, {
        method: 'GET',
      });

      if (response.ok) {
        try {
          const data = await response.json();

          // If verification is successful, stop polling and complete
          if (data && data.status === "success") {
            cleanupTimers();
            onVerificationComplete({ nationality: data.nationality, passportNumber: data.passport_number });
          }
        } catch (error) {
          // Silently ignore JSON parsing errors
        }
      }
    } catch (error) {
      // Silently ignore fetch errors
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userId.current);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Verification ID</ThemedText>
      <ThemedText style={styles.description}>
        Your unique verification ID has been generated. Tap to copy.
      </ThemedText>

      <TouchableOpacity
        style={styles.uuidContainer}
        onPress={copyToClipboard}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.userIdText}>
          {userId.current}
        </ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.waitingText}>
        Waiting for verification... ({MAX_ATTEMPTS - attemptCount}s)
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666'
  },
  uuidContainer: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
    width: '100%',
  },
  userIdText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  waitingText: {
    fontSize: 14,
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
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
    marginTop: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
