import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { PaymentOption } from '@/types/PaymentTypes';
import ThemedModal from '@/components/ui/ThemedModal';
import WagmiDemo from '../wagmi';
import { WagmiProvider } from 'wagmi';
import { wagmiQueryClient, persister, wagmiConfig } from '@/constants/Wagmi';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { usePayment } from '@/context/PaymentContext';

interface PaymentOptionModalProps {
  paymentOption: PaymentOption;
  onClose: () => void;
}

export default function PaymentOptionModal({
  paymentOption,
  onClose
}: PaymentOptionModalProps) {
  const { paymentOptions } = usePayment();

  // Get the latest data for this payment option from the context
  // Only proceed if we have a selected payment option
  const currentPaymentOption = useMemo(() => {
    return paymentOptions.find(option => option.id === paymentOption.id) || paymentOption;
  }, [paymentOption, paymentOptions]);


  return (
    <ThemedModal
      visible={true}
      onRequestClose={onClose}
      showCloseButton={false}
    >
      <View style={styles.modalHeader}>
        <View style={styles.iconAndNameContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={currentPaymentOption.iconSource}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.nameText}>{currentPaymentOption.name}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.modalContent} contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Priority</Text>
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>{currentPaymentOption.priority}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Balance</Text>
          <Text style={styles.detailValue}>${currentPaymentOption.usdBalance.toFixed(2)} USD</Text>
        </View>

        {currentPaymentOption.requriresSelfVerification && (
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

      {currentPaymentOption.id === "coinbase" &&
        <WagmiProvider config={wagmiConfig}>
          <PersistQueryClientProvider
            client={wagmiQueryClient}
            persistOptions={{ persister }}
          >
            <WagmiDemo paymentOption={currentPaymentOption} />
          </PersistQueryClientProvider>
        </WagmiProvider>
      }

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onClose}
      >
        <Text style={styles.cancelButtonText}>Close</Text>
      </TouchableOpacity>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    width: '100%',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
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
  actionButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
  },
});
