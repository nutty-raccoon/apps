import { PaymentOption } from '@/types/PaymentTypes';

// Default payment methods
export const DEFAULT_PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'binance',
    name: 'Binance Pay',
    iconSource: require('../assets/images/binance-logo-round.png'),
    priority: 1,
    usdBalance: 245.50,
    requriresSelfVerification: false,
  },
  {
    id: 'lemoncash',
    name: 'LemonCash',
    iconSource: require('../assets/images/lemoncash-logo-round.png'),
    priority: 2,
    usdBalance: 187.25,
    requriresSelfVerification: false,
  },
  {
    id: 'starknet',
    name: 'Starknet',
    iconSource: require('../assets/images/starknet-logo-round.png'),
    priority: 3,
    usdBalance: 329.99,
    requriresSelfVerification: true,
  },
];
