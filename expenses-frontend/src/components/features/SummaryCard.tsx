import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType = 'neutral',
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-green-50 text-green-600',
    error: 'bg-red-50 text-red-600',
    warning: 'bg-yellow-50 text-yellow-600',
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${
              trendType === 'up' ? 'text-success' :
              trendType === 'down' ? 'text-error' : 'text-neutral-500'
            }`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};