import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Transaction } from '@/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  // ✅ Ordenar transacciones por fecha (más reciente primero)
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });

  if (sortedTransactions.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-primary-600" size={20} />
          <h3 className="text-lg font-semibold text-neutral-900">
            Transacciones Recientes
          </h3>
        </div>
        <div className="text-center py-8">
          <p className="text-neutral-500">No hay transacciones recientes</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-primary-600" size={20} />
          <h3 className="text-lg font-semibold text-neutral-900">
            Transacciones Recientes
          </h3>
        </div>
        <span className="text-sm text-neutral-500">
          {sortedTransactions.length} transacciones
        </span>
      </div>

      {/* ✅ Contenedor con scroll - Altura máxima y scroll personalizado */}
      <div 
        className="space-y-3 overflow-y-auto pr-2" 
        style={{ 
          maxHeight: '400px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#d4d4d8 #f4f4f5'
        }}
      >
        <style>
          {`
            /* Estilos personalizados para el scrollbar en navegadores webkit */
            .space-y-3::-webkit-scrollbar {
              width: 6px;
            }
            
            .space-y-3::-webkit-scrollbar-track {
              background: #f4f4f5;
              border-radius: 3px;
            }
            
            .space-y-3::-webkit-scrollbar-thumb {
              background: #d4d4d8;
              border-radius: 3px;
            }
            
            .space-y-3::-webkit-scrollbar-thumb:hover {
              background: #a1a1aa;
            }
          `}
        </style>

        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${
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
              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 truncate">
                  {transaction.descripcion}
                </p>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span className="truncate">{transaction.categoriaNombre}</span>
                  <span>•</span>
                  <span className="whitespace-nowrap">
                    {format(new Date(transaction.fecha), 'PPp', { locale: es })}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right ml-3 flex-shrink-0">
              <p className={`font-semibold whitespace-nowrap ${
                transaction.tipoTransaccion === 'INGRESO' ? 'text-success' : 'text-error'
              }`}>
                {transaction.tipoTransaccion === 'INGRESO' ? '+' : '-'}$
                {transaction.monto.toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Indicador de scroll si hay muchas transacciones */}
      {sortedTransactions.length > 5 && (
        <div className="mt-3 pt-3 border-t border-neutral-200">
          <p className="text-xs text-center text-neutral-500">
            Desplázate para ver todas las transacciones
          </p>
        </div>
      )}
    </Card>
  );
};