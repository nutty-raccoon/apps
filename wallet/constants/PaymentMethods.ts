import { PaymentOption } from '@/types/PaymentTypes';

// Default payment methods
export const DEFAULT_PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'lemoncash',
    name: 'LemonCash',
    iconSource: require('../assets/images/lemoncash-logo-round.png'),
    priority: 1,
    userInfo: {
      id: "702c3aee-2d98-4e99-85c0-f742f4e25ad0",
    },
    usdBalance: 187.25,
    pendingPayment: null,
    requriresSelfVerification: false,
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    iconSource: require('../assets/images/coinbase-logo-round.png'),
    priority: 2,
    userInfo: null,
    usdBalance: 0,
    pendingPayment: null,
    requriresSelfVerification: false,
  },
  {
    id: 'binance',
    name: 'Binance Pay',
    iconSource: require('../assets/images/binance-logo-round.png'),
    priority: 3,
    userInfo: {
      id: "aac8a43c-594e-43f8-80c6-222f3124884f",
    },
    usdBalance: 37.00,
    pendingPayment: null,
    requriresSelfVerification: false,
  },
  {
    id: 'celo',
    name: 'Celo',
    iconSource: require('../assets/images/celo-logo-round.png'),
    priority: 4,
    userInfo: {
      id: "836dcaae-f593-4e86-aeee-c5ab5eaabd67",
    },
    usdBalance: 329.99,
    pendingPayment: null,
    requriresSelfVerification: true,
  },
  {
    id: 'base',
    name: 'Base',
    iconSource: require('../assets/images/base-logo-round.png'),
    priority: 5,
    userInfo: {
      id: "4ff6d850-b503-47cd-aa19-a9a9bc08974a",
    },
    usdBalance: 203.32,
    pendingPayment: null,
    requriresSelfVerification: true,
  },
  {
    id: 'starknet',
    name: 'Starknet',
    iconSource: require('../assets/images/starknet-logo-round.png'),
    priority: 6,
    userInfo: {
      id: "3120e002-c138-4660-8645-8a56b8566ee7",
    },
    usdBalance: 98.13,
    pendingPayment: null,
    requriresSelfVerification: true,
  },
];
