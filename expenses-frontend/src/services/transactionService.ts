import { api } from './api';
import { Transaction, TransactionRequest } from '@/types';

export const transactionService = {
  async create(data: TransactionRequest): Promise<Transaction> {
    const response = await api.post<Transaction>('/transactions', data);
    return response.data;
  },

  async getByUser(userId: string): Promise<Transaction[]> { // ✅ Cambiado de number a string
    const response = await api.get<Transaction[]>(`/transactions/user/${userId}`);
    return response.data;
  },

  async update(id: string, data: TransactionRequest): Promise<Transaction> { // ✅ Cambiado de number a string
    const response = await api.put<Transaction>(`/transactions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> { // ✅ Cambiado de number a string
    await api.delete(`/transactions/${id}`);
  },
};