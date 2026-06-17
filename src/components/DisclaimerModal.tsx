import { X, AlertTriangle, Shield } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-elevated max-w-lg w-full max-h-[80vh] overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-5 border-b border-ivory-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-ink-900">免责声明</h3>
              <p className="text-sm text-ink-500">请仔细阅读以下内容</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ivory-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[50vh] scrollbar-thin">
          <div className="space-y-4 text-sm text-ink-600">
            <div className="bg-ivory-50 rounded-lg p-4 border border-ivory-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-ink-900 mb-1">系统性质说明</h4>
                  <p className="leading-relaxed">
                    本系统为合同审查辅助工具，其审查结果是基于内置规则和模板的自动化分析，
                    仅供参考使用，不构成任何形式的法律意见或建议。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-ink-900 mb-2">不替代专业法律意见</h4>
              <p className="leading-relaxed">
                本系统的分析结果不能替代专业律师的法律审查和法律意见。
                在签署任何合同或做出法律决策前，建议您咨询专业律师的意见。
              </p>
            </div>

            <div>
              <h4 className="font-medium text-ink-900 mb-2">风险提示</h4>
              <p className="leading-relaxed">
                合同的法律效力和风险评估涉及复杂的法律问题，受到具体事实、适用法律、
                司法实践等多种因素影响。本系统无法覆盖所有风险场景，其识别的风险点
                可能不完整或不准确。
              </p>
            </div>

            <div>
              <h4 className="font-medium text-ink-900 mb-2">使用责任</h4>
              <p className="leading-relaxed">
                用户应自行判断和承担使用本系统的全部风险。因依赖本系统分析结果
                而造成的任何损失或后果，本系统开发者不承担任何法律责任。
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
              <p className="text-primary-800 leading-relaxed font-medium">
                使用本系统即表示您已阅读、理解并同意以上免责声明的全部内容。
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-ivory-200 bg-ivory-50">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            我已阅读并理解
          </button>
        </div>
      </div>
    </div>
  );
}
