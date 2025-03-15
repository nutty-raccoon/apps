import '../polyfills';
import { baseSepolia } from 'wagmi/chains'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { createConfig, deserialize, http, serialize } from 'wagmi'
import * as Linking from "expo-linking";
import { Wallets } from '@mobile-wallet-protocol/client';
import { createConnectorFromWallet } from '@mobile-wallet-protocol/wagmi-connectors';


export const wagmiPolyfills = () =>  {
  const noop = (() => {}) as any;

  window.addEventListener = noop;
  window.dispatchEvent = noop;
  window.removeEventListener = noop;
  window.CustomEvent = function CustomEvent() {
      return {};
    } as any;
}

wagmiPolyfills()

const PREFIX_URL = Linking.createURL("/");

export const wagmiMetadata = {
  name: "My App Name",
  customScheme: PREFIX_URL,
  chainIds: [baseSepolia.id],
};

export const wagmiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
})

export const persister = createSyncStoragePersister({
  serialize,
  storage: window.localStorage,
  deserialize,
})

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [createConnectorFromWallet({
    metadata: wagmiMetadata,
    wallet: Wallets.CoinbaseSmartWallet,
  }),],
  transports: {
    [baseSepolia.id]: http(),
  },
})

