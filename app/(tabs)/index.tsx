import { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import PayButton from "@/components/pay/PayButton";
import TapToPayModal from "@/components/pay/TapToPayModal";
import AmountDisplay from "@/components/pay/AmountDisplay";

export default function PaymentScreen() {
  const [amount, setAmount] = useState(125.50);
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
      // Check if random amount exceeds balance
      if (randomAmount > amount) {
        // Stop the processing animation
        setIsProcessing(false);
        
        // Set error message
        setErrorMessage("Payment cancelled: Amount exceeds balance");
        setPaymentFailed(true);
        
        // Return to the main screen after a delay
        setTimeout(() => {
          setShowTapToPay(false);
          
          // Reset error states after an additional 2 seconds (total of 3.5s from failure)
          setTimeout(() => {
            setPaymentFailed(false);
            setErrorMessage("");
          }, 2000);
        }, 1500);
      } else {
        // Normal successful payment flow
        setIsProcessing(false);
        setShowTapToPay(false);
        setIsPaid(true);
        
        // Update the amount after a success message is shown
        setTimeout(() => {
          setIsPaid(false);
          // Subtract the random amount from the total
          setAmount(prevAmount => prevAmount - randomAmount);
        }, 1200);
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
          amount={amount} 
          errorMessage={errorMessage} 
        />
        
        {/* Pay Button Component */}
        <PayButton 
          onPress={handlePayment}
          isPaid={isPaid}
          paymentFailed={paymentFailed}
          amount={amount}
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
