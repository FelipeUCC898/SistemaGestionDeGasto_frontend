import React from 'react';
import { Pencil, Trash2, Tag } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void; // ✅ Cambiado de number a string
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  if (categories.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Tag className="mx-auto mb-4 text-neutral-400" size={48} />
        <p className="text-neutral-500">No hay categorías registradas</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card key={category.id} hover className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Tag className="text-primary-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">{category.nombre}</h4>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(category)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(category.id)} // ✅ Ya es string
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};