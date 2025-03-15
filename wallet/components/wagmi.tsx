import '../polyfills';

import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useTransaction,
} from "wagmi";
import { parseEther } from 'viem';
import { baseSepolia } from "wagmi/chains";
import { usePayment } from '@/context/PaymentContext';
import { PaymentOption, PendingPayment } from '@/types/PaymentTypes';
import { useEffect, useRef } from 'react';

interface PendingTxProps {
  paymentOptionId: string,
  pendingPayment: PendingPayment,
  registerPayemntDone: (id: string) => void
}

function PendingTx({ paymentOptionId, pendingPayment, registerPayemntDone }: PendingTxProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isSuccess } = useTransaction({
    hash: pendingPayment?.txId,
  });

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

  const startPooling = () => {
    intervalRef.current = setInterval(() => {
      if (isSuccess) {
        registerPayemntDone(paymentOptionId);
        cleanupTimers();
      }
    }, 1000);
    // Set a timeout as a fallback
    timeoutRef.current = setTimeout(() => {
      cleanupTimers();
    }, 30 * 1000);
  };

  // Effect to handle transaction success
  useEffect(() => {
    startPooling()
    return () => {
      cleanupTimers();
    };
  }, [pendingPayment, isSuccess]);

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.pendingText}>Transaction Pending</Text>
      <Text style={styles.addressText}>
        {pendingPayment.txId.substring(0, 6)}...
        {pendingPayment.txId.substring(pendingPayment.txId.length - 4)}
      </Text>
    </View>

  );
}

interface WagmiDemoProps {
  paymentOption: PaymentOption,
}

export default function WagmiDemo({ paymentOption }: WagmiDemoProps) {
  const { registerPendingPayment, registerPaymentDone } = usePayment();
  const { address, isConnected } = useAccount();

  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransactionAsync, reset: resetSendTransaction } = useSendTransaction();

  const reset = () => { resetSendTransaction() }

  const doSendTransaction = async () => {
    const txHash = await sendTransactionAsync({
      to: "0x6d26653F5Db816B06F8CaB0A01D22558e6B28B39",
      value: parseEther("0.001"),
      chainId: baseSepolia.id
    });

    registerPendingPayment(paymentOption.id, { amount: 100, txId: txHash });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Smart Wallet</Text>

        {isConnected && address ? (
          <>
            <View style={styles.buttonContainer}>
              <Text style={styles.connectedText}>Connected ✅</Text>
              <Text style={styles.addressText}>{address.substring(0, 6)}...{address.substring(address.length - 4)}</Text>
              <Button title="Disconnect" onPress={() => { reset(); disconnect(); }} />
            </View>
            {paymentOption.pendingPayment ? (
              <PendingTx paymentOptionId={paymentOption.id} pendingPayment={paymentOption.pendingPayment} registerPayemntDone={registerPaymentDone} />
            ) : (
              <Button
                title={"Deposit"}
                onPress={() => doSendTransaction()}
              />
            )}
          </>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title={isPending ? "Connecting..." : "Connect Wallet"}
              onPress={() => {
                connect({ connector: connectors[0] })
              }}
              disabled={isPending}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    width: "100%",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  connectedContainer: {
    alignItems: "center",
    gap: 8,
  },
  connectedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#32a852",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  pendingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f59e0b",
    marginBottom: 4,
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
    marginBottom: 4,
  },
  errorText: {
    color: "#EF4444",
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
});
