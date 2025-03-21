import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native';
import { PaymentOption } from '@/types/PaymentTypes';

interface PaymentOptionItemProps {
  item: PaymentOption;
  drag: () => void;
  isActive: boolean;
  disabled?: boolean;
  onPress?: (item: PaymentOption) => void;
}

export default function PaymentOptionItem({
  item,
  drag,
  isActive,
  disabled = false,
  onPress
}: PaymentOptionItemProps) {

  const handlePress = () => {
    if (onPress && !isActive) {
      onPress(item);
    }
  };

  return (
    <Pressable
      style={[
        styles.paymentOptionContainer,
        isActive && styles.draggingItem,
        disabled && styles.disabledItem,
      ]}
      onPress={handlePress}
      disabled={isActive} // Disable press while dragging
    >
      <View style={styles.paymentOptionContent}>
        <View style={styles.iconContainer}>
          <Image
            source={item.iconSource}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <Text style={styles.balanceText}>${item.usdBalance.toFixed(2)} USD</Text>
        </View>

        <TouchableOpacity
          style={[styles.dragHandle, disabled && styles.disabledHandle]}
          onPressIn={drag}
        >
          <View style={styles.dragHandleDotsContainer}>
            <View style={styles.dragHandleDot} />
            <View style={styles.dragHandleDot} />
            <View style={styles.dragHandleDot} />
            <View style={styles.dragHandleDot} />
            <View style={styles.dragHandleDot} />
            <View style={styles.dragHandleDot} />
          </View>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  paymentOptionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 12
  },
  disabledItem: {
    opacity: 0.6,
    backgroundColor: '#F3F4F6',
  },
  draggingItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  paymentOptionContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  iconImage: {
    width: 32,
    height: 32
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priorityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF'
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937'
  },
  balanceText: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 4
  },
  dragHandle: {
    width: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dragHandleDotsContainer: {
    width: 16,
    height: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  dragHandleDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    margin: 1
  },
  disabledHandle: {
    opacity: 0.5
  }
});
