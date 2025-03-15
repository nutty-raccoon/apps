import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { PaymentOption, PendingPayment } from '@/types/PaymentTypes';
import { VerifiedUser } from '@/types/VerificationTypes';
import { DEFAULT_PAYMENT_METHODS } from '@/constants/PaymentMethods';

interface PaymentContextType {
  paymentOptions: PaymentOption[];
  setPaymentOptions: React.Dispatch<React.SetStateAction<PaymentOption[]>>;
  totalBalance: number;
  updatePaymentOption: (id: string, newBalance: number) => void;
  registerPendingPayment: (id: string, pendingPayment: PendingPayment) => void;
  registerPaymentDone: (id: string) => void;
  verifiedUser: VerifiedUser | null;
  updateVerifiedUser: (verifiedUser: VerifiedUser | null) => void;
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
  const [verifiedUser, setVerifiedUser] = useState<VerifiedUser | null>(null);

  // Calculate total balance from all payment methods using useMemo to recompute when paymentOptions changes
  const totalBalance = useMemo(() => {
    return paymentOptions.reduce((sum, option) => sum + (option.usdBalance || 0), 0);
  }, [paymentOptions]);

  // Function to update a specific payment option's balance
  const updatePaymentOption = (id: string, newBalance: number) => {
    setPaymentOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id
          ? {
            ...option,
            usdBalance: newBalance
          }
          : option
      )
    );
  };

  // Function to update a specific payment option's pending payment
  const registerPendingPayment = (id: string, pendingPayment: PendingPayment) => {
    setPaymentOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id
          ? {
            ...option,
            pendingPayment: pendingPayment
          }
          : option
      )
    );
  };

  const registerPaymentDone = (id: string) => {
    setPaymentOptions(prevOptions =>
      prevOptions.map(option =>
        option.id === id
          ? {
            ...option,
            pendingPayment: null,
            usdBalance: (!!option.pendingPayment) ? option.usdBalance + option.pendingPayment.amount : option.usdBalance,
          }
          : option
      )
    );
  };

  const updateVerifiedUser = (verifiedUser: VerifiedUser | null) => {
    setVerifiedUser(verifiedUser);
  };

  return (
    <PaymentContext.Provider value={{
      paymentOptions,
      setPaymentOptions,
      totalBalance,
      updatePaymentOption,
      registerPendingPayment,
      registerPaymentDone,
      verifiedUser,
      updateVerifiedUser,
    }}>
      {children}
    </PaymentContext.Provider>
  );
};
