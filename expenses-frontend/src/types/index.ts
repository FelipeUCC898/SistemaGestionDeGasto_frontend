export interface User {
  id: string; // ✅ Cambiado de number a string
  apodo: string;
  correo: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface LoginRequest {
  correo: string;
  contraseña: string;
}

export interface RegisterRequest {
  apodo: string;
  correo: string;
  contraseña: string;
}

export interface Category {
  id: string; // ✅ Cambiado de number a string
  nombre: string;
  usuarioId?: string; // ✅ Cambiado de number a string
}

export interface CategoryRequest {
  nombre: string;
}

export type TransactionType = 'INGRESO' | 'GASTO';

export interface Transaction {
  id: string; // ✅ Cambiado de number a string
  tipoTransaccion: TransactionType;
  categoriaId: string; // ✅ Cambiado de number a string
  categoriaNombre?: string;
  descripcion: string;
  monto: number;
  fecha: string;
  usuarioId?: string; // ✅ Cambiado de number a string
}

export interface TransactionRequest {
  tipoTransaccion: TransactionType;
  categoriaId: string; // ✅ Cambiado de number a string
  descripcion: string;
  monto: number;
}

export interface FinancialSummary {
  totalIngresos: number;
  totalGastos: number;
  balance: number;
  totalTransacciones: number;
}

export interface CategorySummary {
  categoria: string;
  totalIngresos: number;
  totalGastos: number;
  balance: number;
}

export interface ReportByCategory {
  resumenPorCategoria: CategorySummary[];
  gastosPorCategoria: Record<string, number>;
  ingresosPorCategoria: Record<string, number>;
}