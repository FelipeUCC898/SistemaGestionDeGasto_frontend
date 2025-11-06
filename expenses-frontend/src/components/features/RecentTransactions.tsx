import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Transaction } from '@/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const recentTransactions = transactions.slice(0, 5);

  if (recentTransactions.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Transacciones Recientes
        </h3>
        <div className="text-center py-8">
          <p className="text-neutral-500">No hay transacciones recientes</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
        Transacciones Recientes
      </h3>
      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                transaction.tipoTransaccion === 'INGRESO'
                  ? 'bg-green-100 text-success'
                  : 'bg-red-100 text-error'
              }`}>
                {transaction.tipoTransaccion === 'INGRESO' ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownLeft size={20} />
                )}
              </div>
              <div>
                <p className="font-medium text-neutral-900">{transaction.descripcion}</p>
                <p className="text-sm text-neutral-500">
                  {format(new Date(transaction.fecha), 'PPP', { locale: es })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.tipoTransaccion === 'INGRESO' ? 'text-success' : 'text-error'
              }`}>
                {transaction.tipoTransaccion === 'INGRESO' ? '+' : '-'}$
                {transaction.monto.toLocaleString('es-CO')}
              </p>
              <p className="text-xs text-neutral-500">{transaction.categoriaNombre}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};