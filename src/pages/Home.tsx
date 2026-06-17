import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  Copy,
  ChevronRight,
  Sparkles,
  Scale,
  Cloud,
  ShieldAlert,
  FileCheck2,
  GitCompare,
  Lightbulb,
  Info,
  Check,
  AlertCircle,
  AlertTriangle,
  LightbulbIcon,
} from 'lucide-react';
import { useContractStore } from '@/store/contractStore';
import { CONTRACT_CATEGORIES } from '@/types';
import AnalysisProgress from '@/components/AnalysisProgress';
import DisclaimerModal from '@/components/DisclaimerModal';
import { validateContractText, type ValidationResult } from '@/utils/textValidator';

export default function Home() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [contractText, setContractText] = useState('');
  const [contractType, setContractType] = useState('service');
  const [isDragging, setIsDragging] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const { isAnalyzing, startAnalysis, setContractText: setStoreContractText, setContractType: setStoreContractType } = useContractStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setContractText(text);
          setShowEmptyError(false);
          setValidationResult(null);
        };
        reader.readAsText(file);
      } else {
        setContractText('（已上传文件：' + file.name + '）\n\n' + sampleContractText);
        setShowEmptyError(false);
        setValidationResult(null);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setContractText('（已上传文件：' + file.name + '）\n\n' + sampleContractText);
      setShowEmptyError(false);
      setValidationResult(null);
    }
  };

  const handleStartReview = () => {
    const result = validateContractText(contractText);
    
    if (!result.isValid) {
      setValidationResult(result);
      setShowEmptyError(result.errorType === 'too_short' && !contractText.trim());
      return;
    }
    
    setValidationResult(null);
    setShowEmptyError(false);
    setStoreContractText(contractText);
    setStoreContractType(contractType);
    startAnalysis();
    
    setTimeout(() => {
      navigate('/review');
    }, 2000);
  };

  const handleTrySample = () => {
    setContractText(sampleContractText);
    setShowEmptyError(false);
    setValidationResult(null);
  };

  const features = [
    {
      icon: Scale,
      title: '不对等条款识别',
      description: '自动检测合同中权利义务失衡的条款，提示不对等的风险点',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
    },
    {
      icon: Cloud,
      title: '模糊表述分析',
      description: '识别"合理的"、"相关的"等模糊词汇，降低合同表述明确化建议',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      icon: ShieldAlert,
      title: '缺失保障检测',
      description: '检查违约责任、争议解决、保密条款等必备条款是否完整',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      icon: FileCheck2,
      title: '合规风险提示',
      description: '数据隐私、知识产权、竞业限制等法律法规合规性检查',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
    },
    {
      icon: GitCompare,
      title: '模板偏差对比',
      description: '对照标准合同模板，标注合同中的差异和异常条款',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
    {
      icon: Lightbulb,
      title: '修改建议',
      description: '提供具体的修改建议和替代条款表述，辅助合同完善',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-100',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-accent-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-primary-100">智能合同风险审查辅助系统</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight animate-slide-up">
              智能识别合同风险
              <br />
              <span className="text-accent-400">守护每一份合同</span>
            </h1>
            
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              逐条扫描商业合同，自动识别不对等条款、模糊表述和缺失保障，
              对照标准模板标注偏差，提供专业修改建议
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => {
                  document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-accent px-8 py-4 text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  立即开始审查
                  <ChevronRight className="w-5 h-5" />
                </span>
              </button>
              <button
                onClick={() => navigate('/templates')}
                className="bg-white/10 text-white border border-white/30 hover:bg-white/20 px-8 py-4 rounded-md font-medium transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  查看合同模板
                </span>
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <p className="text-3xl font-serif font-bold text-accent-400">1000+</p>
                <p className="text-sm text-primary-200 mt-1">风险规则</p>
              </div>
              <div className="text-center border-x border-white/20">
                <p className="text-3xl font-serif font-bold text-accent-400">6大</p>
                <p className="text-sm text-primary-200 mt-1">审查维度</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-serif font-bold text-accent-400">50+</p>
                <p className="text-sm text-primary-200 mt-1">合同模板</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ivory-100 to-transparent" />
      </section>

      <section id="upload-section" className="py-16 -mt-10 relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-elevated border border-ivory-200 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-ink-900 mb-1">
                      合同审查
                    </h2>
                    <p className="text-sm text-ink-500">
                      上传合同文件或粘贴合同文本，开始智能审查
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDisclaimer(true)}
                    className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-primary-600 transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    免责声明
                  </button>
                </div>

                {isAnalyzing ? (
                  <div className="flex justify-center py-8">
                    <AnalysisProgress />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <div
                        className={`lg:col-span-2 border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                          isDragging
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-ivory-300 hover:border-primary-300 hover:bg-ivory-50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept=".txt,.pdf,.docx,.doc"
                          onChange={handleFileSelect}
                        />
                        <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center">
                          <Upload className="w-7 h-7 text-primary-600" />
                        </div>
                        <p className="font-medium text-ink-900 mb-1">拖拽文件到此处</p>
                        <p className="text-sm text-ink-500 mb-4">
                          支持 TXT、PDF、Word 格式
                        </p>
                        <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
                          或点击选择文件
                        </button>
                      </div>

                      <div className="lg:col-span-3">
                        <label className="block text-sm font-medium text-ink-700 mb-2">
                          或粘贴合同文本
                        </label>
                        <textarea
                          value={contractText}
                          onChange={(e) => {
                            setContractText(e.target.value);
                            if ((showEmptyError || validationResult) && e.target.value.trim()) {
                              setShowEmptyError(false);
                              setValidationResult(null);
                            }
                          }}
                          placeholder="请在此粘贴合同文本内容..."
                          className="input-field h-48 resize-none"
                        />
                        <div className="flex items-center justify-between mt-3">
                          <button
                            onClick={handleTrySample}
                            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                          >
                            <Copy className="w-4 h-4" />
                            使用示例合同
                          </button>
                          <span className="text-xs text-ink-400">
                            {contractText.length} 字
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-ivory-200">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex-1 w-full">
                          <label className="block text-sm font-medium text-ink-700 mb-2">
                            合同类型
                          </label>
                          <select
                            value={contractType}
                            onChange={(e) => setContractType(e.target.value)}
                            className="select-field"
                          >
                            {CONTRACT_CATEGORIES.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1 w-full">
                          <label className="block text-sm font-medium text-ink-700 mb-2">
                            &nbsp;
                          </label>
                          <button
                            onClick={handleStartReview}
                            disabled={false}
                            className={`w-full py-3.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                              contractText.trim()
                                ? 'btn-primary hover:shadow-card'
                                : 'bg-ivory-200 text-ink-400 cursor-not-allowed'
                            }`}
                          >
                            <Sparkles className="w-5 h-5" />
                            开始智能审查
                          </button>
                          
                          {validationResult && !validationResult.isValid && (
                            <div className="mt-3 bg-risk-highLight/30 border border-risk-high/20 rounded-lg p-4 animate-fade-in">
                              <div className="flex items-start gap-2.5">
                                <AlertTriangle className="w-5 h-5 text-risk-high flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-risk-high mb-2">
                                    {validationResult.message}
                                  </p>
                                  {validationResult.suggestions && validationResult.suggestions.length > 0 && (
                                    <div>
                                      <p className="text-xs text-ink-500 mb-1.5 flex items-center gap-1">
                                        <LightbulbIcon className="w-3.5 h-3.5 text-accent-500" />
                                        建议：
                                      </p>
                                      <ul className="space-y-1">
                                        {validationResult.suggestions.map((suggestion, idx) => (
                                          <li key={idx} className="text-xs text-ink-600 flex items-start gap-1.5">
                                            <span className="text-primary-500 mt-1">•</span>
                                            {suggestion}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {validationResult.errorType !== 'too_short' && (
                                    <button
                                      onClick={handleTrySample}
                                      className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                      点击使用示例合同快速体验
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {showEmptyError && !validationResult && (
                            <p className="mt-2 text-sm text-risk-high flex items-center gap-1.5 animate-fade-in">
                              <AlertCircle className="w-4 h-4" />
                              请先上传合同文件或粘贴合同文本
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink-900 mb-3">
              六大核心能力
            </h2>
            <p className="text-ink-500 max-w-xl mx-auto">
              全方位扫描合同风险，为您提供专业的审查建议
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`card card-hover p-6 ${feature.borderColor} border`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-ink-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-ivory-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/30 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent-400/20 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-accent-400" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">
                    审查结果仅供参考
                  </h2>
                </div>
                
                <p className="text-primary-100 leading-relaxed mb-6 max-w-2xl">
                  本系统为合同审查辅助工具，其分析结果基于内置规则和模板，仅供参考，
                  不构成法律意见。合同签署前建议咨询专业律师，以确保合同的合法性和有效性。
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-primary-200">
                    <Check className="w-4 h-4 text-accent-400" />
                    智能风险识别
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-200">
                    <Check className="w-4 h-4 text-accent-400" />
                    修改建议参考
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-200">
                    <Check className="w-4 h-4 text-accent-400" />
                    标准模板对比
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-200">
                    <Check className="w-4 h-4 text-accent-400" />
                    不替代律师意见
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DisclaimerModal isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
    </div>
  );
}

const sampleContractText = `软件开发服务合同

甲方：XX科技有限公司
乙方：YY软件有限公司

第一条 服务内容与范围
乙方应按照甲方的要求，为甲方提供软件开发服务。具体的开发内容、交付时间和验收标准由双方另行协商确定。乙方应尽合理努力完成相关工作。

第二条 合同价款与支付
本合同总价款为人民币50万元整。甲方应在合同签订后支付50%预付款，余款在项目完成后一次性支付。乙方应在收到款项后开具相应发票。

第三条 知识产权
乙方在履行本合同过程中产生的所有知识产权归甲方所有。乙方不得擅自使用或向任何第三方披露。

第四条 保密义务
乙方应对在合同履行过程中知悉的甲方商业秘密承担保密义务。保密期限为合同有效期内。

第五条 违约责任
任何一方违反本合同约定，应承担违约责任。

第六条 数据隐私
乙方应妥善保管甲方提供的数据资料，不得用于本合同以外的目的。

第七条 竞业限制
乙方保证在合同履行期间及合同终止后，不从事任何与甲方业务相竞争的活动。

第八条 争议解决
因本合同引起的争议，双方应友好协商解决。协商不成的，提交法院诉讼解决。

第九条 合同期限与终止
本合同自双方签字盖章之日起生效，有效期一年。合同期满后自动终止。

第十条 其他
本合同一式两份，双方各执一份，具有同等法律效力。
`;
