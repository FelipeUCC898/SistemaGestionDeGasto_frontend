import { api } from './api';
import { FinancialSummary, ReportByCategory, DateRangeFilter } from '@/types';

export const reportService = {
  async getSummary(userId: string, dateRange?: DateRangeFilter): Promise<FinancialSummary> {
    let url = `/reports/user/${userId}/summary`;
    
    // ✅ Agregar parámetros de fecha si existen
    if (dateRange?.fechaInicio && dateRange?.fechaFin) {
      const params = new URLSearchParams({
        fechaInicio: dateRange.fechaInicio,
        fechaFin: dateRange.fechaFin,
      });
      url += `?${params.toString()}`;
    }
    
    const response = await api.get<FinancialSummary>(url);
    return response.data;
  },

  async getByCategory(userId: string, dateRange?: DateRangeFilter): Promise<ReportByCategory> {
    let url = `/reports/user/${userId}/by-category`;
    
    // ✅ Agregar parámetros de fecha si existen
    if (dateRange?.fechaInicio && dateRange?.fechaFin) {
      const params = new URLSearchParams({
        fechaInicio: dateRange.fechaInicio,
        fechaFin: dateRange.fechaFin,
      });
      url += `?${params.toString()}`;
    }
    
    const response = await api.get<ReportByCategory>(url);
    return response.data;
  },
};