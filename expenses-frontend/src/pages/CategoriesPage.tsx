import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { CategoryForm } from '@/components/features/CategoryForm';
import { CategoryList } from '@/components/features/CategoryList';
import { useCategories } from '@/hooks/useCategories';
import { categoryService } from '@/services/categoryService';
import { Category, CategoryRequest } from '@/types';

export const CategoriesPage: React.FC = () => {
  const { categories, loading, refetch } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (data: CategoryRequest) => {
    try {
      setFormLoading(true);
      if (editingCategory) {
        await categoryService.update(editingCategory.id, data); // ✅ Ya es string
        setAlert({ type: 'success', message: 'Categoría actualizada exitosamente' });
      } else {
        await categoryService.create(data);
        setAlert({ type: 'success', message: 'Categoría creada exitosamente' });
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      refetch();
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al guardar la categoría' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => { // ✅ Cambiado de number a string
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      await categoryService.delete(id);
      setAlert({ type: 'success', message: 'Categoría eliminada exitosamente' });
      refetch();
    } catch (error) {
      setAlert({ type: 'error', message: 'Error al eliminar la categoría' });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
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
            <h1 className="text-3xl font-bold text-neutral-900">Categorías</h1>
            <p className="text-neutral-600 mt-1">
              Organiza tus transacciones por categorías
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Nueva Categoría
          </Button>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
          size="sm"
        >
          <CategoryForm
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            initialData={editingCategory ? { nombre: editingCategory.nombre } : undefined}
            loading={formLoading}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};