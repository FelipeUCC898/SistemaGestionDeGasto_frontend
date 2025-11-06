export interface User {
  id: string;
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
  id: string;
  nombre: string;
  usuarioId?: string;
}

export interface CategoryRequest {
  nombre: string;
}

export type TransactionType = 'INGRESO' | 'GASTO';

export interface Transaction {
  id: string;
  tipoTransaccion: TransactionType;
  categoriaId: string;
  categoriaNombre?: string;
  descripcion: string;
  monto: number;
  fecha: string;
  usuarioId?: string;
}

export interface TransactionRequest {
  tipoTransaccion: TransactionType;
  categoriaId: string;
  descripcion: string;
  monto: number;
}

// ✅ ACTUALIZADO: Agregamos fechas opcionales
export interface FinancialSummary {
  totalIngresos: number;
  totalGastos: number;
  balance: number;
  totalTransacciones: number;
  fechaInicio?: string;
  fechaFin?: string;
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

// ✅ NUEVO: Interface para filtros de fecha
export interface DateRangeFilter {
  fechaInicio?: string;
  fechaFin?: string;
}