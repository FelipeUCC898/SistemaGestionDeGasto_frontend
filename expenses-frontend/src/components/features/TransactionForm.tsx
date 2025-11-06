import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Category, TransactionRequest } from '@/types';

const transactionSchema = z.object({
  tipoTransaccion: z.enum(['INGRESO', 'GASTO']),
  categoriaId: z.string().min(1, 'Selecciona una categoría'), // ✅ Ya es string
  descripcion: z.string().min(3, 'La descripción debe tener al menos 3 caracteres'),
  monto: z.string().min(1, 'Ingresa un monto'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  categories: Category[];
  onSubmit: (data: TransactionRequest) => void;
  onCancel: () => void;
  initialData?: TransactionRequest;
  loading?: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  categories,
  onSubmit,
  onCancel,
  initialData,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ? {
      ...initialData,
      categoriaId: initialData.categoriaId, // ✅ Ya NO necesita toString()
      monto: initialData.monto.toString(),
    } : {
      tipoTransaccion: 'GASTO',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        categoriaId: initialData.categoriaId, // ✅ Ya NO necesita toString()
        monto: initialData.monto.toString(),
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: TransactionFormData) => {
    // ✅ CRÍTICO: Ya NO convertimos categoriaId a número
    onSubmit({
      tipoTransaccion: data.tipoTransaccion,
      categoriaId: data.categoriaId, // ✅ Mantener como string
      descripcion: data.descripcion,
      monto: parseFloat(data.monto),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Select
        label="Tipo de Transacción"
        options={[
          { value: 'GASTO', label: 'Gasto' },
          { value: 'INGRESO', label: 'Ingreso' },
        ]}
        error={errors.tipoTransaccion?.message}
        {...register('tipoTransaccion')}
      />

      <Select
        label="Categoría"
        options={[
          { value: '', label: 'Selecciona una categoría' },
          ...categories.map((cat) => ({
            value: cat.id, // ✅ Ya NO necesita toString()
            label: cat.nombre,
          })),
        ]}
        error={errors.categoriaId?.message}
        {...register('categoriaId')}
      />

      <Input
        label="Descripción"
        type="text"
        placeholder="Ej: Compra de supermercado"
        error={errors.descripcion?.message}
        {...register('descripcion')}
      />

      <Input
        label="Monto"
        type="number"
        step="0.01"
        placeholder="0.00"
        error={errors.monto?.message}
        {...register('monto')}
      />
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <p className="font-medium">ℹ️ Nota:</p>
        <p>La fecha se registrará automáticamente con la fecha y hora actual.</p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1"
          disabled={loading}
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};