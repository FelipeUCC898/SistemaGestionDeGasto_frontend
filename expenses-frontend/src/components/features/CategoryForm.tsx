import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CategoryRequest } from '@/types';

const categorySchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onSubmit: (data: CategoryRequest) => void;
  onCancel: () => void;
  initialData?: CategoryRequest;
  loading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
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
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre de la Categoría"
        type="text"
        placeholder="Ej: Alimentación, Transporte, Salud..."
        error={errors.nombre?.message}
        {...register('nombre')}
      />

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