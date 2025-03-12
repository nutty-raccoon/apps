import { PaymentOption } from '@/types/PaymentTypes';

// Default payment methods
export const DEFAULT_PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'lemoncash',
    name: 'LemonCash',
    iconSource: require('../assets/images/lemoncash-logo-round.png'),
    priority: 1,
    usdBalance: 187.25,
    requriresSelfVerification: false,
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    iconSource: require('../assets/images/coinbase-logo-round.png'),
    priority: 2,
    usdBalance: 245.50,
    requriresSelfVerification: false,
  },
  {
    id: 'binance',
    name: 'Binance Pay',
    iconSource: require('../assets/images/binance-logo-round.png'),
    priority: 3,
    usdBalance: 37.00,
    requriresSelfVerification: false,
  },
  {
    id: 'celo',
    name: 'Celo',
    iconSource: require('../assets/images/celo-logo-round.png'),
    priority: 4,
    usdBalance: 329.99,
    requriresSelfVerification: true,
  },
  {
    id: 'base',
    name: 'Base',
    iconSource: require('../assets/images/base-logo-round.png'),
    priority: 5,
    usdBalance: 203.32,
    requriresSelfVerification: true,
  },
  {
    id: 'starknet',
    name: 'Starknet',
    iconSource: require('../assets/images/starknet-logo-round.png'),
    priority: 6,
    usdBalance: 98.13,
    requriresSelfVerification: true,
  },
];
