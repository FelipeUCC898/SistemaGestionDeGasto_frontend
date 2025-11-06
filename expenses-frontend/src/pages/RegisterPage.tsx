import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

const registerSchema = z.object({
  apodo: z.string().min(3, 'El apodo debe tener al menos 3 caracteres'),
  correo: z.string().email('Correo electrónico inválido'),
  contraseña: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmarContraseña: z.string(),
}).refine((data) => data.contraseña === data.confirmarContraseña, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmarContraseña'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);
      const { confirmarContraseña, ...registerData } = data;
      const response = await authService.register(registerData);
      authService.saveAuth(response);
      login(response.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-4">
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Crear cuenta</h1>
          <p className="text-neutral-600">Comienza a controlar tus gastos hoy</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-4">
              <Alert type="error" message={error} onClose={() => setError(null)} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Apodo"
              type="text"
              placeholder="Tu nombre de usuario"
              error={errors.apodo?.message}
              {...register('apodo')}
            />

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              error={errors.correo?.message}
              {...register('correo')}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.contraseña?.message}
              {...register('contraseña')}
            />

            <Input
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.confirmarContraseña?.message}
              {...register('confirmarContraseña')}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};