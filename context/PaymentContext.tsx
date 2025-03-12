import React, { createContext, useState, useContext, ReactNode } from 'react';
import { PaymentOption } from '@/types/PaymentTypes';
import { DEFAULT_PAYMENT_METHODS } from '@/constants/PaymentMethods';

interface PaymentContextType {
  paymentOptions: PaymentOption[];
  setPaymentOptions: React.Dispatch<React.SetStateAction<PaymentOption[]>>;
  totalBalance: number;
  updatePaymentOption: (id: string, newBalance: number) => void;
  isSelfVerified: boolean;
  updateIsSelfVerified: (isSelfVerified: boolean) => void;
}

// Create the context with a default value
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Custom hook to use the payment context
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

// Provider component to wrap the app
export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>(DEFAULT_PAYMENT_METHODS);
  const [isSelfVerified, setIsSelfVerified] = useState<boolean>(false);

  // Calculate total balance from all payment methods
  const totalBalance = paymentOptions.reduce((sum, option) => sum + option.usdBalance, 0);

  // Function to update a specific payment option's balance
  const updatePaymentOption = (id: string, newBalance: number) => {
    setPaymentOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id ? { ...option, usdBalance: newBalance } : option
      )
    );
  };

  const updateIsSelfVerified= (newIsSelfVerified: boolean) => {
    setIsSelfVerified(newIsSelfVerified);
  };

  return (
    <PaymentContext.Provider value={{
      paymentOptions,
      setPaymentOptions,
      totalBalance,
      updatePaymentOption,
      isSelfVerified,
      updateIsSelfVerified,
    }}>
      {children}
    </PaymentContext.Provider>
  );
};
