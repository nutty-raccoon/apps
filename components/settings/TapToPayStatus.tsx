import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TapToPayStatusProps {
  primaryMethodName: string;
}

export default function TapToPayStatus({ primaryMethodName }: TapToPayStatusProps) {
  return (
    <View style={styles.footer}>
      <View style={styles.tapToPay}>
        <Text style={styles.smartphone}>📱</Text>
        <View>
          <Text style={styles.tapToPayTitle}>Ready for Tap-to-Pay</Text>
          <Text style={styles.tapToPayDescription}>
            Will use {primaryMethodName} first
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5'
  },
  tapToPay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 16
  },
  smartphone: {
    fontSize: 20,
    marginRight: 12
  },
  tapToPayTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E40AF'
  },
  tapToPayDescription: {
    fontSize: 14,
    color: '#2563EB'
  }
});
