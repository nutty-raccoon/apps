import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout(): JSX.Element {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      initialRouteName="pay"
      screenOptions={{
        tabBarActiveTintColor: themeColors.tint,
        tabBarInactiveTintColor: themeColors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 85,
            paddingBottom: 30,
          },
          android: {
            height: 60,
            paddingBottom: 10,
          },
        }),
      }}>
      <Tabs.Screen
        name="pay"
        options={{
          title: 'Pay',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size || 28} name="house.fill" color={color} />
          ),
          tabBarAccessibilityLabel: 'Pay Screen',
        }}
      />
      <Tabs.Screen
        name="payment_settings"
        options={{
          title: 'Payment',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size || 28} name="creditcard.fill" color={color} />
          ),
          tabBarAccessibilityLabel: 'Payment Settings Screen',
        }}
      />
      <Tabs.Screen
        name="verify_identity"
        options={{
          title: 'Verify',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size || 28} name="chevron.left.forwardslash.chevron.right" color={color} />
          ),
          tabBarAccessibilityLabel: 'Identity Verification Screen',
        }}
      />
    </Tabs>
  );
}
