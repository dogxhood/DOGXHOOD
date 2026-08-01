import { useState, useEffect } from 'react';
import { storage } from './gameStorage';

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  
  useEffect(() => {
    setUser(storage.getUser());
  }, []);

  const login = (name: string) => {
    storage.setUser(name);
    setUser(name);
  };

  return { user, login };
}
