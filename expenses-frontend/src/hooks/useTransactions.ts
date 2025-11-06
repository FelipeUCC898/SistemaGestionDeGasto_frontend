import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { transactionService } from '@/services/transactionService';
import { useAuth } from '@/contexts/AuthContext';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await transactionService.getByUser(user.id); // ✅ Ya es string
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar transacciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return { transactions, loading, error, refetch: fetchTransactions };
};