import { useState } from 'react';
import {
  Scale,
  ChevronDown,
  ChevronUp,
  Gavel,
  FileText,
  Lightbulb,
  AlertTriangle,
  Clock,
  MapPin,
  Hash,
  Check,
} from 'lucide-react';
import type { HistoricalDisputeReference as HistoricalDisputeReferenceType } from '@/types';
import { HISTORICAL_DISPUTE_CASES, getCaseTypeLabel, getVerdictTypeLabel, getMatchRelevanceLabel } from '@/data/historicalDisputes';

interface HistoricalDisputeReferenceProps {
  references: HistoricalDisputeReferenceType[];
}

export default function HistoricalDisputeReference({ references }: HistoricalDisputeReferenceProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'high':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'plaintiff_win':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'defendant_win':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'partial_win':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'settlement':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (references.length === 0) {
    return null;
  }

  const highCount = references.filter(r => r.relevance === 'high').length;
  const mediumCount = references.filter(r => r.relevance === 'medium').length;

  return (
    <div className="bg-white rounded-lg border border-ivory-200 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-violet-50 to-white border-b border-ivory-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-ink-900">历史纠纷关联</h5>
              <p className="text-xs text-ink-500">
                共匹配 {references.length} 个相关诉讼案例，其中高度相关 {highCount} 例，中度相关 {mediumCount} 例
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (expandedIds.size === references.length) {
                setExpandedIds(new Set());
              } else {
                setExpandedIds(new Set(references.map(r => r.caseId)));
              }
            }}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
          >
            {expandedIds.size === references.length ? '全部收起' : '全部展开'}
          </button>
        </div>
      </div>

      <div className="divide-y divide-ivory-100">
        {references.map((ref) => {
          const disputeCase = HISTORICAL_DISPUTE_CASES.find(c => c.id === ref.caseId);
          if (!disputeCase) return null;

          const isExpanded = expandedIds.has(ref.caseId);
          const caseTypeLabel = getCaseTypeLabel(disputeCase.caseType);
          const verdictTypeLabel = getVerdictTypeLabel(disputeCase.verdictType);
          const relevanceLabel = getMatchRelevanceLabel(ref.relevance);

          return (
            <div key={ref.caseId} className="animate-fade-in">
              <div
                onClick={() => toggleExpand(ref.caseId)}
                className="p-3 cursor-pointer hover:bg-ivory-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getRelevanceColor(ref.relevance)}`}>
                        {ref.relevance === 'high' && <AlertTriangle className="w-3 h-3" />}
                        {relevanceLabel}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getVerdictColor(disputeCase.verdictType)}`}>
                        {verdictTypeLabel}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 text-ink-600 border border-ink-200">
                        {caseTypeLabel}
                      </span>
                    </div>
                    <h6 className="text-sm font-medium text-ink-800 mb-1">
                      {disputeCase.caseName}
                    </h6>
                    <div className="flex items-center gap-1.5 text-xs text-ink-500 mb-1">
                      <Hash className="w-3 h-3" />
                      <span>{disputeCase.caseNumber}</span>
                    </div>
                    {!isExpanded && (
                      <p className="text-xs text-ink-500 line-clamp-2 mt-1.5">
                        {disputeCase.practicalGuidance}
                      </p>
                    )}
                    {ref.matchedKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ref.matchedKeywords.slice(0, 4).map((kw, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded border border-violet-100"
                          >
                            {kw}
                          </span>
                        ))}
                        {ref.matchedKeywords.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-ink-400">
                            +{ref.matchedKeywords.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button className="text-ink-400 hover:text-ink-600 flex-shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-ink-500">
                      <MapPin className="w-3.5 h-3.5 text-ink-400" />
                      <span className="truncate">审理法院：{disputeCase.court}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink-500">
                      <Clock className="w-3.5 h-3.5 text-ink-400" />
                      <span>审理日期：{disputeCase.trialDate}</span>
                    </div>
                  </div>

                  {ref.clauseReference && (
                    <div className="bg-ink-50/80 rounded-md p-2.5 border border-ink-200/60">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <FileText className="w-3.5 h-3.5 text-ink-500" />
                        <p className="text-xs font-medium text-ink-600">关联条款片段</p>
                      </div>
                      <p className="text-xs text-ink-700 leading-relaxed">
                        {ref.clauseReference}
                      </p>
                    </div>
                  )}

                  <div className="bg-amber-50/60 rounded-md p-2.5 border border-amber-200/60">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <p className="text-xs font-medium text-amber-700">案情摘要</p>
                    </div>
                    <p className="text-xs text-amber-800/90 leading-relaxed">
                      {disputeCase.caseSummary}
                    </p>
                  </div>

                  <div className="bg-rose-50/60 rounded-md p-2.5 border border-rose-200/60">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Gavel className="w-3.5 h-3.5 text-rose-600" />
                      <p className="text-xs font-medium text-rose-700">争议焦点</p>
                    </div>
                    <ul className="space-y-1">
                      {disputeCase.disputedIssues.map((issue, idx) => (
                        <li key={idx} className="text-xs text-rose-800/90 leading-relaxed flex items-start gap-1.5">
                          <span className="text-rose-500 mt-0.5">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50/60 rounded-md p-2.5 border border-blue-200/60">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Scale className="w-3.5 h-3.5 text-blue-600" />
                      <p className="text-xs font-medium text-blue-700">法院裁判观点</p>
                    </div>
                    <p className="text-xs text-blue-800/90 leading-relaxed">
                      {disputeCase.courtOpinion}
                    </p>
                  </div>

                  <div className="bg-emerald-50/60 rounded-md p-2.5 border border-emerald-200/60">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <p className="text-xs font-medium text-emerald-700">裁判结果</p>
                    </div>
                    <p className="text-xs text-emerald-800/90 leading-relaxed">
                      {disputeCase.judgmentResult}
                    </p>
                  </div>

                  <div className="bg-violet-50 rounded-md p-2.5 border border-violet-200">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-violet-600" />
                      <p className="text-xs font-medium text-violet-700">实务建议参考</p>
                    </div>
                    <p className="text-xs text-violet-800/90 leading-relaxed">
                      {disputeCase.practicalGuidance}
                    </p>
                  </div>

                  <div className="bg-ivory-50 rounded-md p-2.5 border border-ivory-200">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-ink-500" />
                      <p className="text-xs font-medium text-ink-600">系争条款原文</p>
                    </div>
                    <p className="text-xs text-ink-700 leading-relaxed italic">
                      "{disputeCase.disputeClauseContent}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
