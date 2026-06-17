import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  FileText,
  Lightbulb,
  GitCompare,
  ChevronRight,
  Copy,
  Check,
  Info,
  TrendingUp,
  Clock,
  FileWarning,
  Target,
} from 'lucide-react';
import { useContractStore } from '@/store/contractStore';
import RiskBadge from '@/components/RiskBadge';
import RiskTypeBadge from '@/components/RiskTypeBadge';
import UrgencyBadge from '@/components/UrgencyBadge';
import AnalysisProgress from '@/components/AnalysisProgress';
import DisclaimerModal from '@/components/DisclaimerModal';
import RegulationReference from '@/components/RegulationReference';
import { useState } from 'react';

export default function Review() {
  const navigate = useNavigate();
  const { 
    reviewResult, 
    selectedClauseId, 
    setSelectedClause, 
    activeTab,
    setActiveTab,
    isAnalyzing,
  } = useContractStore();
  
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedClause = reviewResult?.clauses.find(c => c.id === selectedClauseId);

  const handleCopySuggestion = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    alert('导出功能开发中，审查报告将以 PDF/Word 格式导出');
  };

  if (isAnalyzing || !reviewResult) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <AnalysisProgress />
      </div>
    );
  }

  const getSeverityCount = (severity: 'high' | 'medium' | 'low') => {
    return reviewResult.clauses.reduce((acc, clause) => {
      return acc + clause.risks.filter(r => r.severity === severity).length;
    }, 0);
  };

  const totalRisks = getSeverityCount('high') + getSeverityCount('medium') + getSeverityCount('low');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-risk-low';
    if (score >= 60) return 'text-risk-medium';
    return 'text-risk-high';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-risk-low/20 to-risk-low/5';
    if (score >= 60) return 'from-risk-medium/20 to-risk-medium/5';
    return 'from-risk-high/20 to-risk-high/5';
  };

  return (
    <div className="min-h-screen bg-ivory-100">
      <div className="bg-white border-b border-ivory-200 sticky top-16 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-ink-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">返回首页</span>
              </button>
              <div className="h-5 w-px bg-ivory-300" />
              <div>
                <h2 className="text-base font-serif font-semibold text-ink-900">
                  {reviewResult.contractTitle}
                </h2>
                <p className="text-xs text-ink-500">
                  审查时间：{reviewResult.reviewDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDisclaimer(true)}
                className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-primary-600 transition-colors"
              >
                <Info className="w-4 h-4" />
                免责声明
              </button>
              <button
                onClick={handleExport}
                className="btn-secondary px-4 py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  导出报告
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className={`bg-gradient-to-br ${getScoreBg(reviewResult.overallScore)} rounded-xl p-6 border border-white shadow-soft`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-ink-600 mb-1">合规评分</p>
                <div className={`text-4xl font-serif font-bold ${getScoreColor(reviewResult.overallScore)}`}>
                  {reviewResult.overallScore}
                  <span className="text-lg font-normal text-ink-400">/100</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                reviewResult.overallScore >= 80 
                  ? 'bg-risk-low/20' 
                  : reviewResult.overallScore >= 60 
                    ? 'bg-risk-medium/20' 
                    : 'bg-risk-high/20'
              }`}>
                <TrendingUp className={`w-6 h-6 ${
                  reviewResult.overallScore >= 80 
                    ? 'text-risk-low' 
                    : reviewResult.overallScore >= 60 
                      ? 'text-risk-medium' 
                      : 'text-risk-high'
                }`} />
              </div>
            </div>
            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  reviewResult.overallScore >= 80 
                    ? 'bg-risk-low' 
                    : reviewResult.overallScore >= 60 
                      ? 'bg-risk-medium' 
                      : 'bg-risk-high'
                }`}
                style={{ width: `${reviewResult.overallScore}%` }}
              />
            </div>
            <p className="text-xs text-ink-500 mt-2">
              {reviewResult.overallScore >= 80 
                ? '合同整体较为规范，风险可控'
                : reviewResult.overallScore >= 60 
                  ? '合同存在一定风险，建议重点关注'
                  : '合同风险较高，建议认真修改'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-ivory-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-risk-highLight rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-risk-high" />
              </div>
              <div>
                <p className="text-sm text-ink-500">高风险</p>
                <p className="text-2xl font-serif font-bold text-risk-high">
                  {getSeverityCount('high')}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-500">
              可能严重影响合同效力或带来重大损失
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-ivory-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-risk-mediumLight rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-risk-medium" />
              </div>
              <div>
                <p className="text-sm text-ink-500">中风险</p>
                <p className="text-2xl font-serif font-bold text-risk-medium">
                  {getSeverityCount('medium')}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-500">
              存在一定争议空间，建议完善表述
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-ivory-200 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-risk-lowLight rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-risk-low" />
              </div>
              <div>
                <p className="text-sm text-ink-500">低风险</p>
                <p className="text-2xl font-serif font-bold text-risk-low">
                  {getSeverityCount('low')}
                </p>
              </div>
            </div>
            <p className="text-xs text-ink-500">
              轻微风险，可视情况调整
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-xl border border-ivory-200 shadow-soft overflow-hidden h-[calc(100vh-280px)] flex flex-col">
              <div className="p-4 border-b border-ivory-200 bg-ivory-50/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-semibold text-ink-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-600" />
                    条款列表
                  </h3>
                  <span className="text-sm text-ink-500">
                    共 {reviewResult.clauses.length} 条
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-risk-high" />
                    {getSeverityCount('high')} 高风险
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-risk-medium" />
                    {getSeverityCount('medium')} 中风险
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-risk-low" />
                    {getSeverityCount('low')} 低风险
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {reviewResult.clauses.map((clause) => {
                  const isSelected = clause.id === selectedClauseId;
                  const hasHighRisk = clause.risks.some(r => r.severity === 'high');
                  const hasMediumRisk = clause.risks.some(r => r.severity === 'medium');

                  return (
                    <div
                      key={clause.id}
                      onClick={() => setSelectedClause(clause.id)}
                      className={`p-4 border-b border-ivory-100 cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-primary-50 border-l-4 border-l-primary-600' 
                          : 'hover:bg-ivory-50 border-l-4 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium ${
                              isSelected ? 'text-primary-700' : 'text-ink-400'
                            }`}>
                              {clause.number}
                            </span>
                            {clause.risks.length > 0 && (
                              <span className={`w-2 h-2 rounded-full ${
                                hasHighRisk 
                                  ? 'bg-risk-high' 
                                  : hasMediumRisk 
                                    ? 'bg-risk-medium' 
                                    : 'bg-risk-low'
                              }`} />
                            )}
                          </div>
                          <h4 className={`font-medium text-sm mb-1 ${
                            isSelected ? 'text-primary-900' : 'text-ink-800'
                          }`}>
                            {clause.title}
                          </h4>
                          <p className="text-xs text-ink-500 line-clamp-2">
                            {clause.content.substring(0, 60)}...
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-colors ${
                          isSelected ? 'text-primary-600' : 'text-ink-300'
                        }`} />
                      </div>
                      
                      {clause.risks.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {clause.risks.slice(0, 3).map((risk) => (
                            <RiskBadge 
                              key={risk.id} 
                              severity={risk.severity} 
                              size="sm" 
                            />
                          ))}
                          {clause.risks.length > 3 && (
                            <span className="text-xs text-ink-400 px-1.5 py-0.5">
                              +{clause.risks.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            {selectedClause ? (
              <div className="bg-white rounded-xl border border-ivory-200 shadow-soft overflow-hidden h-[calc(100vh-280px)] flex flex-col">
                <div className="p-5 border-b border-ivory-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        {selectedClause.number}
                      </span>
                      <h3 className="text-xl font-serif font-semibold text-ink-900 mt-2">
                        {selectedClause.title}
                      </h3>
                    </div>
                    {selectedClause.risks.length > 0 && (
                      <div className="flex items-center gap-2">
                        <RiskBadge 
                          severity={
                            selectedClause.risks.some(r => r.severity === 'high') 
                              ? 'high' 
                              : selectedClause.risks.some(r => r.severity === 'medium')
                                ? 'medium'
                                : 'low'
                          } 
                        />
                        <span className="text-sm text-ink-500">
                          {selectedClause.risks.length} 项风险
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-ivory-50 rounded-lg p-4 border border-ivory-200">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-ink-400" />
                      <span className="text-xs font-medium text-ink-500">条款原文</span>
                    </div>
                    <p className="text-sm text-ink-700 leading-relaxed">
                      {selectedClause.content}
                    </p>
                  </div>
                </div>

                <div className="border-b border-ivory-200">
                  <div className="flex">
                    {[
                      { id: 'risks', label: '风险分析', icon: FileWarning },
                      { id: 'suggestions', label: '修改建议', icon: Lightbulb },
                      { id: 'template', label: '模板对比', icon: GitCompare },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as 'risks' | 'suggestions' | 'template')}
                          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                            isActive
                              ? 'text-primary-700 border-primary-600 bg-primary-50/30'
                              : 'text-ink-500 border-transparent hover:text-ink-700 hover:bg-ivory-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                          {tab.id === 'risks' && selectedClause.risks.length > 0 && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              isActive ? 'bg-primary-100 text-primary-700' : 'bg-ivory-200 text-ink-600'
                            }`}>
                              {selectedClause.risks.length}
                            </span>
                          )}
                          {tab.id === 'suggestions' && selectedClause.suggestions.length > 0 && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              isActive ? 'bg-primary-100 text-primary-700' : 'bg-ivory-200 text-ink-600'
                            }`}>
                              {selectedClause.suggestions.length}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
                  {activeTab === 'risks' && (
                    <div className="space-y-4">
                      {selectedClause.risks.map((risk, index) => (
                        <div 
                          key={risk.id}
                          className="bg-white rounded-lg border border-ivory-200 overflow-hidden animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="p-4 bg-gradient-to-r from-ivory-50 to-white border-b border-ivory-100">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  risk.severity === 'high' 
                                    ? 'bg-risk-highLight' 
                                    : risk.severity === 'medium'
                                      ? 'bg-risk-mediumLight'
                                      : 'bg-risk-lowLight'
                                }`}>
                                  {risk.severity === 'high' && <AlertTriangle className="w-4 h-4 text-risk-high" />}
                                  {risk.severity === 'medium' && <AlertCircle className="w-4 h-4 text-risk-medium" />}
                                  {risk.severity === 'low' && <CheckCircle2 className="w-4 h-4 text-risk-low" />}
                                </div>
                                <div>
                                  <h4 className="font-medium text-ink-900 mb-1">
                                    {risk.title}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    <RiskBadge severity={risk.severity} size="sm" />
                                    <RiskTypeBadge type={risk.type} size="sm" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <h5 className="text-xs font-medium text-ink-500 mb-1.5">风险说明</h5>
                              <p className="text-sm text-ink-700 leading-relaxed">
                                {risk.description}
                              </p>
                            </div>
                            <div className="bg-ink-50/80 rounded-md p-3 border border-ink-200/60">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Target className="w-3.5 h-3.5 text-ink-500" />
                                <h5 className="text-xs font-medium text-ink-600">影响说明</h5>
                              </div>
                              <p className="text-sm text-ink-700 leading-relaxed">
                                {risk.impactDescription}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-ink-500">修改紧迫度：</span>
                              <UrgencyBadge urgency={risk.urgency} size="sm" />
                            </div>
                            {risk.relatedText && (
                              <div className="bg-risk-highLight/30 rounded-md p-3 border border-risk-high/10">
                                <h5 className="text-xs font-medium text-risk-high mb-1.5">相关原文</h5>
                                <p className="text-sm text-risk-high/90 leading-relaxed">
                                  "{risk.relatedText}"
                                </p>
                              </div>
                            )}
                            {risk.regulationReferences && risk.regulationReferences.length > 0 && (
                              <RegulationReference references={risk.regulationReferences} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'suggestions' && (
                    <div className="space-y-4">
                      {selectedClause.suggestions.map((suggestion, index) => (
                        <div 
                          key={suggestion.id}
                          className="bg-white rounded-lg border border-ivory-200 overflow-hidden animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="p-4 bg-gradient-to-r from-primary-50/50 to-white border-b border-ivory-100">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                  <Lightbulb className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-ink-900">
                                    {suggestion.type === 'modification' && '修改建议'}
                                    {suggestion.type === 'addition' && '新增建议'}
                                    {suggestion.type === 'deletion' && '删除建议'}
                                  </h4>
                                  <p className="text-xs text-ink-500">
                                    {suggestion.type === 'modification' && '修改现有条款表述'}
                                    {suggestion.type === 'addition' && '增加新的条款内容'}
                                    {suggestion.type === 'deletion' && '删除相关条款内容'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            {suggestion.originalText && (
                              <div className="bg-ivory-50 rounded-md p-3 border border-ivory-200">
                                <div className="flex items-center justify-between mb-1.5">
                                  <h5 className="text-xs font-medium text-ink-500">原文表述</h5>
                                </div>
                                <p className="text-sm text-ink-600 leading-relaxed line-through decoration-ink-300">
                                  {suggestion.originalText}
                                </p>
                              </div>
                            )}
                            <div className="bg-risk-lowLight/30 rounded-md p-3 border border-risk-low/20">
                              <div className="flex items-center justify-between mb-1.5">
                                <h5 className="text-xs font-medium text-risk-low">建议表述</h5>
                                <button
                                  onClick={() => handleCopySuggestion(suggestion.suggestedText, suggestion.id)}
                                  className="flex items-center gap-1 text-xs text-risk-low hover:text-risk-low/80 transition-colors"
                                >
                                  {copiedId === suggestion.id ? (
                                    <><Check className="w-3.5 h-3.5" /> 已复制</>
                                  ) : (
                                    <><Copy className="w-3.5 h-3.5" /> 复制</>
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-ink-700 leading-relaxed">
                                {suggestion.suggestedText}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium text-ink-500 mb-1.5">修改理由</h5>
                              <p className="text-sm text-ink-600 leading-relaxed">
                                {suggestion.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'template' && (
                    <div className="space-y-4">
                      {selectedClause.templateDeviation ? (
                        <div className="bg-white rounded-lg border border-ivory-200 overflow-hidden">
                          <div className={`p-4 border-b border-ivory-100 ${
                            selectedClause.templateDeviation.type === 'missing' 
                              ? 'bg-risk-highLight/20'
                              : selectedClause.templateDeviation.type === 'different'
                                ? 'bg-risk-mediumLight/20'
                                : 'bg-blue-50'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                selectedClause.templateDeviation.type === 'missing' 
                                  ? 'bg-risk-highLight'
                                  : selectedClause.templateDeviation.type === 'different'
                                    ? 'bg-risk-mediumLight'
                                    : 'bg-blue-100'
                              }`}>
                                <GitCompare className={`w-4 h-4 ${
                                  selectedClause.templateDeviation.type === 'missing' 
                                    ? 'text-risk-high'
                                    : selectedClause.templateDeviation.type === 'different'
                                      ? 'text-risk-medium'
                                      : 'text-blue-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-medium text-ink-900">
                                  {selectedClause.templateDeviation.type === 'missing' && '缺失标准条款'}
                                  {selectedClause.templateDeviation.type === 'different' && '表述存在差异'}
                                  {selectedClause.templateDeviation.type === 'additional' && '额外增加条款'}
                                </h4>
                                <p className="text-xs text-ink-500">
                                  与标准合同模板对比结果
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 space-y-4">
                            <div>
                              <h5 className="text-xs font-medium text-ink-500 mb-2">偏差说明</h5>
                              <p className="text-sm text-ink-700 leading-relaxed">
                                {selectedClause.templateDeviation.description}
                              </p>
                            </div>
                            {selectedClause.templateDeviation.templateContent && (
                              <div className="bg-ivory-50 rounded-md p-4 border border-ivory-200">
                                <h5 className="text-xs font-medium text-ink-500 mb-2 flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  标准模板表述
                                </h5>
                                <p className="text-sm text-ink-700 leading-relaxed">
                                  {selectedClause.templateDeviation.templateContent}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-risk-lowLight rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-risk-low" />
                          </div>
                          <h4 className="font-medium text-ink-900 mb-1">与标准模板一致</h4>
                          <p className="text-sm text-ink-500">该条款与标准合同模板表述基本一致</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-ivory-200 shadow-soft h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-ivory-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-ink-400" />
                  </div>
                  <h3 className="text-lg font-medium text-ink-700 mb-1">选择条款查看详情</h3>
                  <p className="text-sm text-ink-500">点击左侧条款列表查看详细分析</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-amber-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-amber-800 font-medium mb-0.5">
              重要提示
            </p>
            <p className="text-sm text-amber-700/80">
              本系统的审查结果仅供参考，不构成法律意见。合同签署前建议咨询专业律师，
              以确保合同的合法性和有效性。系统无法覆盖所有法律风险场景，
              实际情况可能因具体事实、适用法律等因素而有所不同。
            </p>
          </div>
        </div>
      </div>

      <DisclaimerModal isOpen={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
    </div>
  );
}
