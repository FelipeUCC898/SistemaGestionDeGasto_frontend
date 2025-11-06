import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card } from '@/components/ui/Card';
import { DateRangeFilter } from '@/components/features/DateRangeFilter';
import { useAuth } from '@/contexts/AuthContext';
import { reportService } from '@/services/reportService';
import { FinancialSummary, ReportByCategory } from '@/types';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [categoryReport, setCategoryReport] = useState<ReportByCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<{ fechaInicio: string | null; fechaFin: string | null }>({
    fechaInicio: null,
    fechaFin: null,
  });

  const fetchReports = async (fechaInicio: string | null = null, fechaFin: string | null = null) => {
    if (!user) return;

    try {
      setLoading(true);
      
      const dateRange = fechaInicio && fechaFin 
        ? { fechaInicio, fechaFin }
        : undefined;

      const [summaryData, categoryData] = await Promise.all([
        reportService.getSummary(user.id, dateRange),
        reportService.getByCategory(user.id, dateRange),
      ]);
      
      setSummary(summaryData);
      setCategoryReport(categoryData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  const handleDateFilter = (fechaInicio: string | null, fechaFin: string | null) => {
    setDateFilter({ fechaInicio, fechaFin });
    fetchReports(fechaInicio, fechaFin);
  };

  const expensesData = categoryReport
    ? Object.entries(categoryReport.gastosPorCategoria).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const incomeData = categoryReport
    ? Object.entries(categoryReport.ingresosPorCategoria).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const formatDateRange = () => {
    if (summary?.fechaInicio && summary?.fechaFin) {
      const inicio = new Date(summary.fechaInicio).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      const fin = new Date(summary.fechaFin).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return `${inicio} - ${fin}`;
    }
    return 'Todo el período';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Reportes</h1>
          <p className="text-neutral-600 mt-1">
            Análisis detallado de tus finanzas
          </p>
        </div>

        {/* ✅ NUEVO: Filtro de fechas */}
        <DateRangeFilter onFilter={handleDateFilter} loading={loading} />

        {/* ✅ Indicador de período activo */}
        <Card className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Período del Reporte</p>
              <p className="text-lg font-bold text-neutral-900">{formatDateRange()}</p>
            </div>
            {summary && (
              <div className="text-right">
                <p className="text-sm text-neutral-600">Transacciones en período</p>
                <p className="text-2xl font-bold text-primary-600">{summary.totalTransacciones}</p>
              </div>
            )}
          </div>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <p className="text-sm font-medium text-neutral-600 mb-1">Balance Total</p>
                <p className="text-2xl font-bold text-neutral-900">
                  ${summary?.balance.toLocaleString('es-CO') || '0'}
                </p>
              </Card>
              <Card className="p-6">
                <p className="text-sm font-medium text-neutral-600 mb-1">Total Ingresos</p>
                <p className="text-2xl font-bold text-success">
                  ${summary?.totalIngresos.toLocaleString('es-CO') || '0'}
                </p>
              </Card>
              <Card className="p-6">
                <p className="text-sm font-medium text-neutral-600 mb-1">Total Gastos</p>
                <p className="text-2xl font-bold text-error">
                  ${summary?.totalGastos.toLocaleString('es-CO') || '0'}
                </p>
              </Card>
              <Card className="p-6">
                <p className="text-sm font-medium text-neutral-600 mb-1">Transacciones</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {summary?.totalTransacciones || 0}
                </p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Gastos por Categoría
                </h3>
                {expensesData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expensesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expensesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString('es-CO')}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    No hay gastos registrados en este período
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Ingresos por Categoría
                </h3>
                {incomeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={incomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString('es-CO')}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    No hay ingresos registrados en este período
                  </div>
                )}
              </Card>
            </div>

            {categoryReport && categoryReport.resumenPorCategoria.length > 0 ? (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Resumen por Categoría
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Categoría</th>
                        <th className="text-right py-3 px-4 font-semibold text-neutral-700">Ingresos</th>
                        <th className="text-right py-3 px-4 font-semibold text-neutral-700">Gastos</th>
                        <th className="text-right py-3 px-4 font-semibold text-neutral-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryReport.resumenPorCategoria.map((item, index) => (
                        <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="py-3 px-4 text-neutral-900">{item.categoria}</td>
                          <td className="py-3 px-4 text-right text-success">
                            ${item.totalIngresos.toLocaleString('es-CO')}
                          </td>
                          <td className="py-3 px-4 text-right text-error">
                            ${item.totalGastos.toLocaleString('es-CO')}
                          </td>
                          <td className={`py-3 px-4 text-right font-semibold ${
                            item.balance >= 0 ? 'text-success' : 'text-error'
                          }`}>
                            ${item.balance.toLocaleString('es-CO')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-neutral-500">No hay datos disponibles para este período</p>
              </Card>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};