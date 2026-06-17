import type { UrgencyLevel } from '@/types';
import { Zap, Clock, Wrench } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  size?: 'sm' | 'md';
}

const urgencyConfig = {
  urgent: {
    label: '紧急修改',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: Zap,
  },
  soon: {
    label: '尽快修改',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    icon: Clock,
  },
  suggested: {
    label: '建议修改',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-600',
    borderColor: 'border-slate-200',
    icon: Wrench,
  },
};

export default function UrgencyBadge({ urgency, size = 'md' }: UrgencyBadgeProps) {
  const config = urgencyConfig[urgency];
  const Icon = config.icon;

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs gap-1'
    : 'px-3 py-1 text-sm gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {config.label}
    </span>
  );
}
