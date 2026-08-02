import { useState, useEffect } from 'react';
import { storage } from './gameStorage';

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: 'accountsChanged', handler: (accounts: string[]) => void) => void;
  removeListener?: (
    event: 'accountsChanged',
    handler: (accounts: string[]) => void,
  ) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

function getEthereumProvider() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.ethereum;
}

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  useEffect(() => {
    setUser(storage.getUser());
    setWalletAddress(storage.getWalletAddress());

    const provider = getEthereumProvider();
    if (!provider?.request) {
      return;
    }

    const syncWalletAccount = (accounts: string[]) => {
      const storedWallet = storage.getWalletAddress();
      if (!storedWallet && accounts.length > 0) {
        return;
      }

      const address = accounts[0] || null;

      if (address) {
        storage.setWalletAddress(address);
        storage.setUser(address);
        setWalletAddress(address);
        setUser(address);
      } else if (storedWallet) {
        storage.clearWalletAddress();
        if (storage.getUser() === storedWallet) {
          storage.clearUser();
          setUser(null);
        }
        setWalletAddress(null);
      }
    };

    void provider
      .request({ method: 'eth_accounts' })
      .then((accounts) => {
        syncWalletAccount(Array.isArray(accounts) ? accounts.filter(
          (account): account is string => typeof account === 'string',
        ) : []);
      })
      .catch(() => {
        // A wallet may reject passive account discovery; the explicit connect
        // action below will show any actionable error to the user.
      });
    provider.on?.('accountsChanged', syncWalletAccount);

    return () => {
      provider.removeListener?.('accountsChanged', syncWalletAccount);
    };
  }, []);

  const login = (name: string) => {
    storage.clearWalletAddress();
    storage.setUser(name);
    setUser(name);
    setWalletAddress(null);
  };

  const loginWithWallet = async () => {
    const provider = getEthereumProvider();
    if (!provider?.request) {
      throw new Error('MetaMask is not installed. Install it to connect your wallet.');
    }

    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    const address = Array.isArray(accounts) && typeof accounts[0] === 'string'
      ? accounts[0]
      : null;

    if (!address) {
      throw new Error('No wallet account was selected.');
    }

    storage.setWalletAddress(address);
    storage.setUser(address);
    setWalletAddress(address);
    setUser(address);
    return address;
  };

  const logout = () => {
    storage.clearWalletAddress();
    storage.clearUser();
    setWalletAddress(null);
    setUser(null);
  };

  return { user, walletAddress, login, loginWithWallet, logout };
}

export function isWalletAvailable() {
  return Boolean(getEthereumProvider()?.request);
}
