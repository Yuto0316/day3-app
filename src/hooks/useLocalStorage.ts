import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types/transaction';
import { loadTransactions, saveTransactions } from '../utils/storage';

export function useLocalStorage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTransactions(loadTransactions());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveTransactions(transactions);
  }, [transactions, hydrated]);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    const newT: Transaction = {
      ...t,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [newT, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { transactions, addTransaction, deleteTransaction, hydrated };
}
