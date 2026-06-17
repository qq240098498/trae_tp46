import { useState } from 'react';
import { useRegulationStore } from '@/store/regulationStore';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Ban,
  RefreshCw,
  Gavel,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Link,
} from 'lucide-react';
import { REGULATION_TYPE_OPTIONS, RELEVANCE_TYPE_OPTIONS, RISK_TYPE_INFO } from '@/types';
import type { RegulationType, RelevanceType } from '@/types';

export default function Regulations() {
  const {
    regulations,
    matchPatterns,
    isEditing,
    editingRegulation,
    editingArticles,
    editingPattern,
    activeTab,
    searchKeyword,
    filterType,
    setSearchKeyword,
    setFilterType,
    setActiveTab,
    startEditRegulation,
    cancelEdit,
    updateEditingRegulation,
    addArticle,
    updateArticle,
    removeArticle,
    saveRegulation,
    deleteRegulation,
    toggleRepealed,
    resetToDefault,
    startEditPattern,
    cancelEditPattern,
    updateEditingPattern,
    addPatternReference,
    updatePatternReference,
    removePatternReference,
    addPatternKeyword,
    updatePatternKeyword,
    removePatternKeyword,
    addPatternRiskType,
    updatePatternRiskType,
    removePatternRiskType,
    savePattern,
    deletePattern,
  } = useRegulationStore();

  const [expandedRegulation, setExpandedRegulation] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const regulationList = Object.values(regulations).filter((reg) => {
    const matchesSearch =
      reg.name.includes(searchKeyword) ||
      reg.scope.includes(searchKeyword) ||
      Object.keys(reg.articleIndex).some((key) =>
        reg.articleIndex[key].includes(searchKeyword)
      );
    const matchesType = filterType === 'all' || reg.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteRegulation = (id: string) => {
    deleteRegulation(id);
    setShowDeleteConfirm(null);
  };

  const getRegulationTypeIcon = (type: string) => {
    switch (type) {
      case 'law':
        return <Gavel className="w-4 h-4" />;
      case 'judicial_interpretation':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'directly_applicable':
        return 'bg-primary-100 text-primary-700';
      case 'related':
        return 'bg-amber-100 text-amber-700';
      case 'reference':
        return 'bg-ink-100 text-ink-600';
      default:
        return 'bg-ink-100 text-ink-600';
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50">
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary-800 mb-2">
                法规库管理
              </h1>
              <p className="text-ink-500">
                管理合同风险审查系统使用的法律法规、司法解释及匹配规则
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                恢复默认
              </button>
              {activeTab === 'regulations' ? (
                <button
                  onClick={() => startEditRegulation()}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  新增法规
                </button>
              ) : (
                <button
                  onClick={() => startEditPattern()}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  新增匹配规则
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft border border-ivory-200">
            <div className="border-b border-ivory-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('regulations')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'regulations'
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-ink-500 hover:text-ink-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    法规库
                    <span className="px-2 py-0.5 bg-ivory-100 text-ink-600 rounded-full text-xs">
                      {Object.keys(regulations).length}
                    </span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('patterns')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'patterns'
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-ink-500 hover:text-ink-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    匹配规则
                    <span className="px-2 py-0.5 bg-ivory-100 text-ink-600 rounded-full text-xs">
                      {matchPatterns.length}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {activeTab === 'regulations' && (
              <>
                <div className="p-4 border-b border-ivory-200 bg-ivory-50">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                      <input
                        type="text"
                        placeholder="搜索法规名称、内容..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      <option value="all">全部类型</option>
                      {REGULATION_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="divide-y divide-ivory-100">
                  {regulationList.length === 0 ? (
                    <div className="p-12 text-center">
                      <BookOpen className="w-12 h-12 text-ink-300 mx-auto mb-4" />
                      <p className="text-ink-500">暂无匹配的法规</p>
                    </div>
                  ) : (
                    regulationList.map((regulation) => (
                      <div
                        key={regulation.id}
                        className={`${regulation.isRepealed ? 'bg-rose-50' : ''}`}
                      >
                        <div
                          className="p-4 cursor-pointer hover:bg-ivory-50 transition-colors"
                          onClick={() =>
                            setExpandedRegulation(
                              expandedRegulation === regulation.id ? null : regulation.id
                            )
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  regulation.isRepealed
                                    ? 'bg-rose-100 text-rose-600'
                                    : 'bg-primary-100 text-primary-600'
                                }`}
                              >
                                {getRegulationTypeIcon(regulation.type)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-ink-800">
                                    {regulation.name}
                                  </h3>
                                  {regulation.isRepealed && (
                                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs rounded-full">
                                      已废止
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-ink-500">
                                  <span>
                                    {REGULATION_TYPE_OPTIONS.find(
                                      (o) => o.value === regulation.type
                                    )?.label || regulation.type}
                                  </span>
                                  <span>发布：{regulation.issueAuthority}</span>
                                  <span>生效：{regulation.effectiveDate}</span>
                                  <span>
                                    共 {Object.keys(regulation.articleIndex).length} 条
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!regulation.isRepealed && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleRepealed(regulation.id);
                                  }}
                                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                  title="标记为已废止"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              )}
                              {regulation.isRepealed && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleRepealed(regulation.id);
                                  }}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="恢复为有效"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditRegulation(regulation);
                                }}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                title="编辑"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDeleteConfirm(regulation.id);
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="删除"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              {expandedRegulation === regulation.id ? (
                                <ChevronUp className="w-5 h-5 text-ink-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-ink-400" />
                              )}
                            </div>
                          </div>
                        </div>

                        {expandedRegulation === regulation.id && (
                          <div className="px-4 pb-4 border-t border-ivory-100 bg-ivory-50">
                            <div className="mt-4 space-y-4">
                              <div className="bg-white rounded-lg p-4 border border-ivory-200">
                                <h4 className="text-sm font-medium text-ink-700 mb-2">
                                  适用范围
                                </h4>
                                <p className="text-sm text-ink-600">{regulation.scope}</p>
                              </div>

                              <div className="bg-white rounded-lg p-4 border border-ivory-200">
                                <h4 className="text-sm font-medium text-ink-700 mb-3">
                                  法条索引
                                </h4>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                  {Object.entries(regulation.articleIndex).map(
                                    ([articleNumber, articleContent]) => (
                                      <div
                                        key={articleNumber}
                                        className="p-3 bg-ivory-50 rounded-lg border border-ivory-200"
                                      >
                                        <div className="font-medium text-primary-700 text-sm mb-1">
                                          {articleNumber}
                                        </div>
                                        <p className="text-sm text-ink-600 leading-relaxed">
                                          {articleContent}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'patterns' && (
              <div className="divide-y divide-ivory-100">
                {matchPatterns.length === 0 ? (
                  <div className="p-12 text-center">
                    <Link className="w-12 h-12 text-ink-300 mx-auto mb-4" />
                    <p className="text-ink-500">暂无匹配规则</p>
                  </div>
                ) : (
                  matchPatterns.map((pattern, index) => (
                    <div key={index} className="p-4 hover:bg-ivory-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                              规则 #{index + 1}
                            </span>
                            {pattern.riskTypes.map((rt) => {
                              const info = RISK_TYPE_INFO.find((r) => r.type === rt);
                              return (
                                <span
                                  key={rt}
                                  className="px-2 py-0.5 bg-ink-100 text-ink-600 text-xs rounded-full"
                                >
                                  {info?.label || rt}
                                </span>
                              );
                            })}
                          </div>
                          <div className="mb-2">
                            <span className="text-xs text-ink-500">关键词：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pattern.keywords.map((kw, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-ink-500">关联法条：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pattern.regulationReferences.map((ref, i) => {
                                const reg = regulations[ref.regulationId];
                                return (
                                  <span
                                    key={i}
                                    className={`px-2 py-0.5 text-xs rounded ${getRelevanceColor(
                                      ref.relevance
                                    )}`}
                                  >
                                    {reg?.name || ref.regulationId} {ref.articleNumber}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => startEditPattern(pattern)}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="编辑"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('确定要删除此匹配规则吗？')) {
                                deletePattern(index);
                              }
                            }}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && editingRegulation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-ivory-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink-800">
                {editingRegulation.name ? '编辑法规' : '新增法规'}
              </h2>
              <button
                onClick={cancelEdit}
                className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ivory-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    法规名称 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingRegulation.name}
                    onChange={(e) =>
                      updateEditingRegulation('name', e.target.value)
                    }
                    placeholder="如：中华人民共和国民法典"
                    className="w-full px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    法规类型 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={editingRegulation.type}
                    onChange={(e) =>
                      updateEditingRegulation('type', e.target.value as RegulationType)
                    }
                    className="w-full px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                  >
                    {REGULATION_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    发布机关 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingRegulation.issueAuthority}
                    onChange={(e) =>
                      updateEditingRegulation('issueAuthority', e.target.value)
                    }
                    placeholder="如：全国人民代表大会"
                    className="w-full px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    发布日期
                  </label>
                  <input
                    type="date"
                    value={editingRegulation.issueDate}
                    onChange={(e) =>
                      updateEditingRegulation('issueDate', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    生效日期 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={editingRegulation.effectiveDate}
                    onChange={(e) =>
                      updateEditingRegulation('effectiveDate', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    适用范围 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={editingRegulation.scope}
                    onChange={(e) =>
                      updateEditingRegulation('scope', e.target.value)
                    }
                    placeholder="描述本法条的适用范围和调整对象"
                    rows={2}
                    className="w-full px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-ink-700">
                      法条索引 <span className="text-rose-500">*</span>
                    </label>
                    <button
                      onClick={addArticle}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      添加法条
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editingArticles.map((article, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-ivory-50 rounded-lg border border-ivory-200"
                      >
                        <div className="w-32 flex-shrink-0">
                          <input
                            type="text"
                            value={article.articleNumber}
                            onChange={(e) =>
                              updateArticle(index, 'articleNumber', e.target.value)
                            }
                            placeholder="如：第1条"
                            className="w-full px-3 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={article.articleContent}
                            onChange={(e) =>
                              updateArticle(index, 'articleContent', e.target.value)
                            }
                            placeholder="法条内容"
                            rows={2}
                            className="w-full px-3 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          />
                        </div>
                        <button
                          onClick={() => removeArticle(index)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors h-fit"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-ivory-200 flex items-center justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="btn-secondary px-6 py-2 text-sm"
              >
                取消
              </button>
              <button
                onClick={saveRegulation}
                disabled={!editingRegulation.name || !editingRegulation.effectiveDate}
                className="btn-primary px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {editingPattern && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-ivory-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink-800">
                {editingPattern.keywords[0] ? '编辑匹配规则' : '新增匹配规则'}
              </h2>
              <button
                onClick={cancelEditPattern}
                className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ivory-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-ink-700">
                    触发关键词 <span className="text-rose-500">*</span>
                  </label>
                  <button
                    onClick={addPatternKeyword}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    添加关键词
                  </button>
                </div>
                <div className="space-y-2">
                  {editingPattern.keywords.map((keyword, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={keyword}
                        onChange={(e) =>
                          updatePatternKeyword(index, e.target.value)
                        }
                        placeholder="输入关键词"
                        className="flex-1 px-4 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      {editingPattern.keywords.length > 1 && (
                        <button
                          onClick={() => removePatternKeyword(index)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-ink-700">
                    适用风险类型 <span className="text-rose-500">*</span>
                  </label>
                  <button
                    onClick={addPatternRiskType}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    添加风险类型
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingPattern.riskTypes.map((riskType, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <select
                        value={riskType}
                        onChange={(e) =>
                          updatePatternRiskType(index, e.target.value)
                        }
                        className="px-3 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                      >
                        {RISK_TYPE_INFO.map((info) => (
                          <option key={info.type} value={info.type}>
                            {info.label}
                          </option>
                        ))}
                      </select>
                      {editingPattern.riskTypes.length > 1 && (
                        <button
                          onClick={() => removePatternRiskType(index)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-ink-700">
                    关联法条 <span className="text-rose-500">*</span>
                  </label>
                  <button
                    onClick={addPatternReference}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    添加关联
                  </button>
                </div>
                <div className="space-y-3">
                  {editingPattern.regulationReferences.map((ref, index) => (
                    <div
                      key={index}
                      className="p-3 bg-ivory-50 rounded-lg border border-ivory-200"
                    >
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <select
                          value={ref.regulationId}
                          onChange={(e) =>
                            updatePatternReference(index, 'regulationId', e.target.value)
                          }
                          className="px-3 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        >
                          <option value="">选择法规</option>
                          {Object.values(regulations)
                            .filter((r) => !r.isRepealed)
                            .map((reg) => (
                              <option key={reg.id} value={reg.id}>
                                {reg.name}
                              </option>
                            ))}
                        </select>
                        <input
                          type="text"
                          value={ref.articleNumber}
                          onChange={(e) =>
                            updatePatternReference(index, 'articleNumber', e.target.value)
                          }
                          placeholder="如：第496条"
                          className="px-3 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <select
                          value={ref.relevance}
                          onChange={(e) =>
                            updatePatternReference(index, 'relevance', e.target.value)
                          }
                          className="px-3 py-2 border border-ivory-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        >
                          {RELEVANCE_TYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {editingPattern.regulationReferences.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => removePatternReference(index)}
                            className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            移除此关联
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-ivory-200 flex items-center justify-end gap-3">
              <button
                onClick={cancelEditPattern}
                className="btn-secondary px-6 py-2 text-sm"
              >
                取消
              </button>
              <button
                onClick={savePattern}
                disabled={
                  editingPattern.keywords.length === 0 ||
                  !editingPattern.keywords[0] ||
                  editingPattern.regulationReferences.length === 0
                }
                className="btn-primary px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-800">确认删除</h3>
                <p className="text-sm text-ink-500">
                  删除后无法恢复，确定要删除此法规吗？
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn-secondary px-4 py-2 text-sm"
              >
                取消
              </button>
              <button
                onClick={() => handleDeleteRegulation(showDeleteConfirm)}
                className="px-4 py-2 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink-800">恢复默认</h3>
                <p className="text-sm text-ink-500">
                  这将重置所有法规和匹配规则为系统默认值，您的自定义修改将会丢失。确定要继续吗？
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary px-4 py-2 text-sm"
              >
                取消
              </button>
              <button
                onClick={() => {
                  resetToDefault();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                确认恢复
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
