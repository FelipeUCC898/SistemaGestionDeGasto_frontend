import React, { useEffect, useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { SummaryCard } from '@/components/features/SummaryCard';
import { RecentTransactions } from '@/components/features/RecentTransactions';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/hooks/useTransactions';
import { reportService } from '@/services/reportService';
import { FinancialSummary } from '@/types';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions();
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      if (user) {
        try {
          const data = await reportService.getSummary(user.id); // ✅ Ya es string
          setSummary(data);
        } catch (error) {
          console.error('Error fetching summary:', error);
        }
      }
    };

    fetchSummary();
  }, [user, transactions]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-neutral-600 mt-1">
              Bienvenido de nuevo, {user?.apodo}
            </p>
          </div>
          <Button
            onClick={() => navigate('/transactions')}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Nueva Transacción
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Balance Total"
            value={`$${summary?.balance.toLocaleString('es-CO') || '0'}`}
            icon={Wallet}
            color="primary"
          />
          <SummaryCard
            title="Total Ingresos"
            value={`$${summary?.totalIngresos.toLocaleString('es-CO') || '0'}`}
            icon={TrendingUp}
            color="success"
          />
          <SummaryCard
            title="Total Gastos"
            value={`$${summary?.totalGastos.toLocaleString('es-CO') || '0'}`}
            icon={TrendingDown}
            color="error"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions transactions={transactions} />
          
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Resumen Rápido
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">Total de Transacciones</span>
                <span className="font-semibold text-neutral-900">
                  {summary?.totalTransacciones || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">Promedio de Gastos</span>
                <span className="font-semibold text-neutral-900">
                  ${summary && summary.totalTransacciones > 0
                    ? (summary.totalGastos / summary.totalTransacciones).toLocaleString('es-CO', { maximumFractionDigits: 0 })
                    : '0'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};