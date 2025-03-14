import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable
} from 'react-native';
import { PaymentOption } from '@/types/PaymentTypes';

interface PaymentOptionModalProps {
  isVisible: boolean;
  paymentOption: PaymentOption | null;
  onClose: () => void;
}

export default function PaymentOptionModal({
  isVisible,
  paymentOption,
  onClose
}: PaymentOptionModalProps) {
  if (!paymentOption) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <View
          style={styles.modalContainer}
          // Stop propagation of touch events to prevent closing when clicking on content
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <View style={styles.iconAndNameContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={paymentOption.iconSource}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.nameText}>{paymentOption.name}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Priority</Text>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>{paymentOption.priority}</Text>
              </View>
            </View>

            {paymentOption.userInfo &&
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Balance</Text>
                <Text style={styles.detailValue}>${paymentOption.userInfo.usdBalance.toFixed(2)} USD</Text>
              </View>
            }

            {paymentOption.requriresSelfVerification && (
              <View style={styles.verificationWarning}>
                <Text style={styles.verificationText}>
                  This payment method requires identity verification
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Edit Payment Method</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  iconAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 28,
    color: '#6B7280',
  },
  modalContent: {
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  priorityBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  verificationWarning: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  verificationText: {
    fontSize: 14,
    color: '#EF4444',
  },
  detailSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
