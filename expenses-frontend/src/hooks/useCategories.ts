import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { categoryService } from '@/services/categoryService';
import { useAuth } from '@/contexts/AuthContext';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCategories = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await categoryService.getByUser(user.id); // ✅ Ya es string
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  return { categories, loading, error, refetch: fetchCategories };
};