import { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import PayButton from "@/components/pay/PayButton";
import TapToPayModal from "@/components/pay/TapToPayModal";
import AmountDisplay from "@/components/pay/AmountDisplay";
import { usePayment } from "@/context/PaymentContext";

export default function PaymentScreen() {
  const { verifiedUser, totalBalance, paymentOptions, updatePaymentOption } = usePayment();
  const [showTapToPay, setShowTapToPay] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentFailed, setPaymentFailed] = useState(false);

  const handlePayment = () => {
    // Reset any error messages
    setErrorMessage("");
    setPaymentFailed(false);
    // Show the tap to pay screen
    setShowTapToPay(true);
  };

  const handlePaymentSuccess = () => {
    // Start processing
    setIsProcessing(true);

    // Generate the random amount
    const randomAmount = Math.floor(Math.random() * 10) + 50;

    // Handle successful payment after 3 seconds
    setTimeout(() => {
      let proceedTopayment = false;

      for (const paymentMethod of paymentOptions) {

        // Check if the primary method has enough balance
        if (paymentMethod && paymentMethod.userInfo && (verifiedUser || !paymentMethod.requriresSelfVerification) && paymentMethod.userInfo.usdBalance >= randomAmount) {
          // Deduct from the primary payment method
          const newBalance = paymentMethod.userInfo.usdBalance - randomAmount;

          // Normal successful payment flow
          setIsProcessing(false);
          setShowTapToPay(false);
          setIsPaid(true);

          // Reset paid status after a success message is shown
          setTimeout(() => {
            setIsPaid(false);
            updatePaymentOption(paymentMethod.id, newBalance);
          }, 1200);
          // Exit the loop
          proceedTopayment = true;
          break;
        }
      }

      if (!proceedTopayment) {
        // Primary method doesn't have enough balance
        setIsProcessing(false);
        setErrorMessage("Primary payment method has insufficient funds");
        setPaymentFailed(true);

        // Return to the main screen after a delay
        setTimeout(() => {
          setShowTapToPay(false);

          // Reset error states after additional time
          setTimeout(() => {
            setPaymentFailed(false);
            setErrorMessage("");
          }, 2000);
        }, 1500);
      }
    }, 3000);
  };

  const handleCancel = () => {
    // Close the tap to pay screen
    setShowTapToPay(false);
    // Reset any states
    setIsProcessing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Amount Display Component */}
        <AmountDisplay
          amount={totalBalance}
          errorMessage={errorMessage}
        />

        {/* Pay Button Component */}
        <PayButton
          onPress={handlePayment}
          isPaid={isPaid}
          paymentFailed={paymentFailed}
          amount={totalBalance}
        />
      </View>

      {/* Tap To Pay Modal Component */}
      <TapToPayModal
        visible={showTapToPay}
        onRequestClose={handleCancel}
        isProcessing={isProcessing}
        paymentFailed={paymentFailed}
        onPaymentPress={handlePaymentSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 30,
  },
});
