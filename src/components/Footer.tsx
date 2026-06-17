import { Scale, Shield, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-ink-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-800 rounded-lg flex items-center justify-center border border-primary-700">
                <Scale className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-white">智审合同</h3>
                <p className="text-xs text-ink-400">智能合同风险审查辅助系统</p>
              </div>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed mb-4 max-w-md">
              智审合同是一款智能合同风险识别工具，帮助企业法务、商务人员快速发现合同中的风险条款，
              提供修改建议和替代表述，提升合同审查效率。
            </p>
            <div className="flex items-center gap-4 text-sm text-ink-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                support@zhishen.com
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                400-888-9999
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">功能模块</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-accent-400 cursor-pointer transition-colors">风险条款识别</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">不对等条款检测</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">模糊表述分析</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">合规风险提示</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">模板偏差对比</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">合同模板</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-accent-400 cursor-pointer transition-colors">买卖合同模板</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">服务合同模板</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">劳动合同模板</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">保密协议模板</li>
              <li className="hover:text-accent-400 cursor-pointer transition-colors">租赁合同模板</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <Shield className="w-4 h-4" />
              <span>本系统审查结果仅供参考，不构成法律意见，不替代专业律师审查</span>
            </div>
            <p className="text-xs text-ink-500">
              © 2026 智审合同. 保留所有权利.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
