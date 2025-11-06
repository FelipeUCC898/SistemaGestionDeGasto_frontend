import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Pencil, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void; // ✅ Cambiado de number a string
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'INGRESO' | 'GASTO'>('ALL');

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'ALL') return true;
    return t.tipoTransaccion === filter;
  });

  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-neutral-500">No hay transacciones registradas</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={filter === 'ALL' ? 'primary' : 'ghost'}
          onClick={() => setFilter('ALL')}
        >
          Todas
        </Button>
        <Button
          size="sm"
          variant={filter === 'INGRESO' ? 'primary' : 'ghost'}
          onClick={() => setFilter('INGRESO')}
        >
          Ingresos
        </Button>
        <Button
          size="sm"
          variant={filter === 'GASTO' ? 'primary' : 'ghost'}
          onClick={() => setFilter('GASTO')}
        >
          Gastos
        </Button>
      </div>

      <div className="space-y-2">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} hover className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  transaction.tipoTransaccion === 'INGRESO'
                    ? 'bg-green-100 text-success'
                    : 'bg-red-100 text-error'
                }`}>
                  {transaction.tipoTransaccion === 'INGRESO' ? (
                    <ArrowUpRight size={24} />
                  ) : (
                    <ArrowDownLeft size={24} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-neutral-900">
                      {transaction.descripcion}
                    </h4>
                    <Badge variant={transaction.tipoTransaccion === 'INGRESO' ? 'success' : 'error'}>
                      {transaction.tipoTransaccion}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span>{transaction.categoriaNombre}</span>
                    <span>•</span>
                    <span>{format(new Date(transaction.fecha), 'PPP', { locale: es })}</span>
                  </div>
                </div>

                <div className="text-right mr-4">
                  <p className={`text-xl font-bold ${
                    transaction.tipoTransaccion === 'INGRESO' ? 'text-success' : 'text-error'
                  }`}>
                    {transaction.tipoTransaccion === 'INGRESO' ? '+' : '-'}$
                    {transaction.monto.toLocaleString('es-CO')}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(transaction)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(transaction.id)} // ✅ Ya es string
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};