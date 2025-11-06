import { api } from './api';
import { Category, CategoryRequest } from '@/types';

export const categoryService = {
  async create(data: CategoryRequest): Promise<Category> {
    const response = await api.post<Category>('/categories', data);
    return response.data;
  },

  async getByUser(userId: string): Promise<Category[]> { // ✅ Cambiado de number a string
    const response = await api.get<Category[]>(`/categories/user/${userId}`);
    return response.data;
  },

  async update(id: string, data: CategoryRequest): Promise<Category> { // ✅ Cambiado de number a string
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> { // ✅ Cambiado de number a string
    await api.delete(`/categories/${id}`);
  },
};