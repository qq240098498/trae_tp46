import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Info,
} from 'lucide-react';
import type { RegulationReference as RegulationReferenceType } from '@/types';
import { REGULATIONS, getRegulationTypeLabel, getRelevanceLabel } from '@/data/regulations';

interface RegulationReferenceProps {
  references: RegulationReferenceType[];
}

export default function RegulationReference({ references }: RegulationReferenceProps) {
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
      case 'directly_applicable':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'related':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reference':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRelevanceIcon = (relevance: string) => {
    switch (relevance) {
      case 'directly_applicable':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'related':
        return <Info className="w-3 h-3" />;
      default:
        return <BookOpen className="w-3 h-3" />;
    }
  };

  if (references.length === 0) {
    return null;
  }

  const directlyApplicableCount = references.filter(r => r.relevance === 'directly_applicable').length;
  const relatedCount = references.filter(r => r.relevance === 'related').length;

  return (
    <div className="bg-white rounded-lg border border-ivory-200 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-emerald-50 to-white border-b border-ivory-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-ink-900">法条依据</h5>
              <p className="text-xs text-ink-500">
                共 {references.length} 条相关法规，其中直接适用 {directlyApplicableCount} 条，相关参考 {relatedCount} 条
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (expandedIds.size === references.length) {
                setExpandedIds(new Set());
              } else {
                setExpandedIds(new Set(references.map(r => `${r.regulationId}-${r.articleNumber}`)));
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
          const regulation = REGULATIONS[ref.regulationId];
          if (!regulation) return null;

          const id = `${ref.regulationId}-${ref.articleNumber}`;
          const isExpanded = expandedIds.has(id);
          const typeLabel = getRegulationTypeLabel(regulation.type);
          const relevanceLabel = getRelevanceLabel(ref.relevance);

          return (
            <div key={id} className="animate-fade-in">
              <div
                onClick={() => toggleExpand(id)}
                className="p-3 cursor-pointer hover:bg-ivory-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getRelevanceColor(ref.relevance)}`}>
                        {getRelevanceIcon(ref.relevance)}
                        {relevanceLabel}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 text-ink-600 border border-ink-200">
                        {typeLabel}
                      </span>
                      {regulation.isRepealed && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          已废止
                        </span>
                      )}
                    </div>
                    <h6 className="text-sm font-medium text-ink-800 mb-0.5">
                      {regulation.name} {ref.articleNumber}
                    </h6>
                    {!isExpanded && (
                      <p className="text-xs text-ink-500 line-clamp-2">
                        {ref.articleContent}
                      </p>
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
                  <div className="bg-ivory-50 rounded-md p-3 border border-ivory-200">
                    <p className="text-xs font-medium text-ink-600 mb-1.5">法条内容</p>
                    <p className="text-sm text-ink-700 leading-relaxed">
                      {ref.articleContent}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-ink-500">
                      <Clock className="w-3.5 h-3.5 text-ink-400" />
                      <span>
                        生效时间：{regulation.effectiveDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink-500">
                      <Info className="w-3.5 h-3.5 text-ink-400" />
                      <span>
                        发布机关：{regulation.issueAuthority}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-ink-500">
                    <MapPin className="w-3.5 h-3.5 text-ink-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      适用范围：{regulation.scope}
                    </span>
                  </div>

                  {regulation.isRepealed && (
                    <div className="bg-red-50 rounded-md p-2.5 border border-red-200">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-red-700">
                            注意：该法规已废止
                          </p>
                          {regulation.repealDate && (
                            <p className="text-xs text-red-600 mt-0.5">
                              废止时间：{regulation.repealDate}
                            </p>
                          )}
                          {regulation.replaceBy && (
                            <p className="text-xs text-red-600 mt-0.5">
                              替代法规：{regulation.replaceBy}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
