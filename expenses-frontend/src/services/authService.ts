import { api } from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/login', data);
    return response.data;
  },

  async getUser(id: string): Promise<User> { // ✅ Cambiado de number a string
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  saveAuth(authData: AuthResponse): void {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userId', authData.user.id); // ✅ Ya no necesita toString()
    localStorage.setItem('user', JSON.stringify(authData.user));
  },

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getUserId(): string | null { // ✅ Nueva función helper
    return localStorage.getItem('userId');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};