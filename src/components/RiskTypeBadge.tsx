import type { RiskType } from '@/types';
import { Scale, Cloud, ShieldAlert, FileCheck2 } from 'lucide-react';

interface RiskTypeBadgeProps {
  type: RiskType;
  size?: 'sm' | 'md';
}

const typeConfig = {
  inequality: {
    label: '不对等条款',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    icon: Scale,
  },
  ambiguity: {
    label: '模糊表述',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    icon: Cloud,
  },
  missing: {
    label: '缺失保障',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    icon: ShieldAlert,
  },
  compliance: {
    label: '合规风险',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    icon: FileCheck2,
  },
};

export default function RiskTypeBadge({ type, size = 'md' }: RiskTypeBadgeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs gap-1' 
    : 'px-2.5 py-1 text-sm gap-1.5';

  return (
    <span 
      className={`inline-flex items-center font-medium rounded-md border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {config.label}
    </span>
  );
}
