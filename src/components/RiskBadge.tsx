import type { RiskSeverity } from '@/types';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RiskBadgeProps {
  severity: RiskSeverity;
  size?: 'sm' | 'md';
}

const severityConfig = {
  high: {
    label: '高风险',
    bgColor: 'bg-risk-highLight',
    textColor: 'text-risk-high',
    borderColor: 'border-risk-high/30',
    icon: AlertTriangle,
  },
  medium: {
    label: '中风险',
    bgColor: 'bg-risk-mediumLight',
    textColor: 'text-risk-medium',
    borderColor: 'border-risk-medium/30',
    icon: AlertCircle,
  },
  low: {
    label: '低风险',
    bgColor: 'bg-risk-lowLight',
    textColor: 'text-risk-low',
    borderColor: 'border-risk-low/30',
    icon: CheckCircle2,
  },
};

export default function RiskBadge({ severity, size = 'md' }: RiskBadgeProps) {
  const config = severityConfig[severity];
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
