import { api } from './api';
import { FinancialSummary, ReportByCategory } from '@/types';

export const reportService = {
  async getSummary(userId: string): Promise<FinancialSummary> { // ✅ Cambiado de number a string
    const response = await api.get<FinancialSummary>(`/reports/user/${userId}/summary`);
    return response.data;
  },

  async getByCategory(userId: string): Promise<ReportByCategory> { // ✅ Cambiado de number a string
    const response = await api.get<ReportByCategory>(`/reports/user/${userId}/by-category`);
    return response.data;
  },
};