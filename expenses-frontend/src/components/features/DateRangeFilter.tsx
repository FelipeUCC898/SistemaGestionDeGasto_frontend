import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface DateRangeFilterProps {
  onFilter: (fechaInicio: string | null, fechaFin: string | null) => void;
  loading?: boolean;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilter, loading }) => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [hasActiveFilter, setHasActiveFilter] = useState(false);

  const handleApplyFilter = () => {
    if (fechaInicio && fechaFin) {
      // Convertir a formato ISO 8601 UTC
      const startDate = new Date(fechaInicio + 'T00:00:00');
      const endDate = new Date(fechaFin + 'T23:59:59');
      
      onFilter(startDate.toISOString(), endDate.toISOString());
      setHasActiveFilter(true);
    }
  };

  const handleClearFilter = () => {
    setFechaInicio('');
    setFechaFin('');
    onFilter(null, null);
    setHasActiveFilter(false);
  };

  const isValidRange = fechaInicio && fechaFin && fechaInicio <= fechaFin;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="text-primary-600" size={20} />
        <h3 className="font-semibold text-neutral-900">Filtrar por Rango de Fechas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Input
          type="date"
          label="Fecha Inicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          max={fechaFin || undefined}
        />

        <Input
          type="date"
          label="Fecha Fin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          min={fechaInicio || undefined}
        />

        <div className="flex items-end gap-2">
          <Button
            onClick={handleApplyFilter}
            disabled={!isValidRange || loading}
            className="flex-1"
          >
            Aplicar Filtro
          </Button>
        </div>

        {hasActiveFilter && (
          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={handleClearFilter}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <X size={16} />
              Limpiar
            </Button>
          </div>
        )}
      </div>

      {fechaInicio && fechaFin && fechaInicio > fechaFin && (
        <p className="text-sm text-error mt-2">
          La fecha de inicio no puede ser posterior a la fecha fin
        </p>
      )}

      {hasActiveFilter && fechaInicio && fechaFin && (
        <div className="mt-3 p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-700">
            <strong>Filtro activo:</strong> {new Date(fechaInicio).toLocaleDateString('es-CO', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })} - {new Date(fechaFin).toLocaleDateString('es-CO', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
      )}
    </Card>
  );
};