import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { TransactionForm } from '@/components/features/TransactionForm';
import { TransactionList } from '@/components/features/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { transactionService } from '@/services/transactionService';
import { Transaction, TransactionRequest } from '@/types';

export const TransactionsPage: React.FC = () => {
  const { transactions, loading, refetch } = useTransactions();
  const { categories } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (data: TransactionRequest) => {
    try {
      setFormLoading(true);
      if (editingTransaction) {
        await transactionService.update(editingTransaction.id, data);
        setAlert({ type: 'success', message: 'Transacción actualizada exitosamente' });
      } else {
        await transactionService.create(data);
        setAlert({ type: 'success', message: 'Transacción creada exitosamente' });
      }
      setIsModalOpen(false);
      setEditingTransaction(null);
      refetch();
    } catch (error: any) {
      console.error('Error al guardar transacción:', error);
      const errorMessage = error.response?.data?.message || 'Error al guardar la transacción';
      setAlert({ type: 'error', message: errorMessage });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => { // ✅ Cambiado de number a string
    if (!window.confirm('¿Estás seguro de eliminar esta transacción?')) return;

    try {
      await transactionService.delete(id);
      setAlert({ type: 'success', message: 'Transacción eliminada exitosamente' });
      refetch();
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al eliminar la transacción' });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Transacciones</h1>
            <p className="text-neutral-600 mt-1">
              Gestiona todos tus ingresos y gastos
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Nueva Transacción
          </Button>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
          size="md"
        >
          <TransactionForm
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            initialData={editingTransaction ? {
              tipoTransaccion: editingTransaction.tipoTransaccion,
              categoriaId: editingTransaction.categoriaId, // ✅ Ya es string
              descripcion: editingTransaction.descripcion,
              monto: editingTransaction.monto,
            } : undefined}
            loading={formLoading}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};