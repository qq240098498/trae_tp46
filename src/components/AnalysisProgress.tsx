import { FileSearch, Scale, Shield, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  { icon: FileSearch, label: '解析合同文本', description: '正在识别条款结构...' },
  { icon: Scale, label: '审查权利义务', description: '分析不对等条款...' },
  { icon: Shield, label: '检测合规风险', description: '检查数据隐私、知识产权...' },
  { icon: CheckCircle2, label: '生成审查报告', description: '汇总风险与建议...' },
];

export default function AnalysisProgress() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 1;
      });
    }, 40);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-card border border-ivory-200 p-8 max-w-lg w-full">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center relative overflow-hidden">
          <FileSearch className="w-8 h-8 text-primary-700 relative z-10" />
          <div className="absolute inset-0 bg-primary-200/50 animate-scan" />
        </div>
        <h3 className="text-xl font-serif font-semibold text-ink-900 mb-1">
          正在智能审查
        </h3>
        <p className="text-sm text-ink-500">
          系统正在逐条扫描合同条款，请稍候...
        </p>
      </div>

      <div className="mb-8">
        <div className="w-full h-2 bg-ivory-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-xs text-ink-400 mt-2">{progress}%</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-50 border border-primary-200' 
                  : isCompleted
                    ? 'bg-ivory-50 border border-ivory-200'
                    : 'opacity-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                isCompleted 
                  ? 'bg-risk-low text-white' 
                  : isActive 
                    ? 'bg-primary-600 text-white animate-pulse-soft'
                    : 'bg-ivory-200 text-ink-400'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  isActive || isCompleted ? 'text-ink-900' : 'text-ink-400'
                }`}>
                  {step.label}
                </p>
                {isActive && (
                  <p className="text-xs text-primary-600 animate-pulse-soft">
                    {step.description}
                  </p>
                )}
              </div>
              {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-risk-low flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
