import { useState } from 'react';
import {
  FileText,
  BookOpen,
  ChevronRight,
  Check,
  Copy,
  Download,
  Search,
  Tag,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContractStore } from '@/store/contractStore';
import type { ContractTemplate, ContractCategory } from '@/types';
import { CONTRACT_CATEGORIES } from '@/types';

export default function Templates() {
  const navigate = useNavigate();
  const { templates } = useContractStore();
  const [selectedCategory, setSelectedCategory] = useState<ContractCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.includes(searchQuery) || 
                          template.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleCopyClause = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getCategoryLabel = (category: ContractCategory) => {
    return CONTRACT_CATEGORIES.find(c => c.value === category)?.label || category;
  };

  return (
    <div className="min-h-screen bg-ivory-100">
      <section className="bg-gradient-to-b from-primary-800 to-primary-700 text-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-primary-100">合同模板库</span>
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">
              标准合同模板参考
            </h1>
            <p className="text-lg text-primary-100 mb-6">
              精选各类合同标准模板，涵盖买卖、服务、劳动、保密、租赁等常见场景，
              为您的合同起草提供专业参考
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-primary-200">
                <FileText className="w-4 h-4" />
                {templates.length} 套标准模板
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-200">
                <Check className="w-4 h-4 text-accent-400" />
                专业律师审核
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="bg-white rounded-xl shadow-soft border border-ivory-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input
                  type="text"
                  placeholder="搜索合同模板..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ivory-300 bg-ivory-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-ink-500 flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  分类：
                </span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-ivory-100 text-ink-600 hover:bg-ivory-200'
                  }`}
                >
                  全部
                </button>
                {CONTRACT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-ivory-100 text-ink-600 hover:bg-ivory-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                className="card card-hover cursor-pointer group"
                onClick={() => setSelectedTemplate(template)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                    <span className="text-xs font-medium bg-ivory-100 text-ink-500 px-2.5 py-1 rounded-full">
                      {getCategoryLabel(template.category)}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-ink-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-ink-500 mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-ivory-100">
                    <span className="text-xs text-ink-400">
                      {template.clauses.length} 个标准条款
                    </span>
                    <span className="flex items-center gap-1 text-sm text-primary-600 font-medium group-hover:gap-2 transition-all">
                      查看详情
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-ivory-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-ink-400" />
              </div>
              <h3 className="text-lg font-medium text-ink-700 mb-1">未找到匹配的模板</h3>
              <p className="text-sm text-ink-500">尝试更换搜索关键词或选择其他分类</p>
            </div>
          )}
        </div>
      </section>

      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedTemplate(null)}
          />
          <div className="relative bg-white rounded-xl shadow-elevated max-w-3xl w-full max-h-[85vh] overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-ivory-200 bg-gradient-to-r from-primary-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg text-ink-900">
                    {selectedTemplate.name}
                  </h3>
                  <p className="text-xs text-ink-500">
                    {getCategoryLabel(selectedTemplate.category)} · {selectedTemplate.clauses.length} 个条款
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="p-2 text-ink-400 hover:text-ink-600 hover:bg-ivory-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 border-b border-ivory-200">
              <p className="text-sm text-ink-600">
                {selectedTemplate.description}
              </p>
            </div>

            <div className="overflow-y-auto max-h-[55vh] scrollbar-thin p-5">
              <div className="space-y-4">
                {selectedTemplate.clauses.map((clause, index) => (
                  <div 
                    key={index}
                    className="bg-ivory-50/50 rounded-lg border border-ivory-200 overflow-hidden"
                  >
                    <div className="p-4 bg-white/60 border-b border-ivory-100 flex items-start justify-between">
                      <div>
                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                          {clause.number}
                        </span>
                        <h4 className="font-medium text-ink-900 mt-1.5">
                          {clause.title}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyClause(clause.content, index);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-500 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                      >
                        {copiedIndex === index ? (
                          <><Check className="w-3.5 h-3.5" /> 已复制</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> 复制</>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-ink-700 leading-relaxed mb-3">
                        {clause.content}
                      </p>
                      <div className="pt-3 border-t border-ivory-100">
                        <p className="text-xs text-ink-500 mb-2">关键要点：</p>
                        <div className="flex flex-wrap gap-1.5">
                          {clause.keyPoints.map((point, pointIndex) => (
                            <span 
                              key={pointIndex}
                              className="inline-flex items-center gap-1 text-xs bg-accent-50 text-accent-700 px-2 py-1 rounded-md border border-accent-100"
                            >
                              <Check className="w-3 h-3" />
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-ivory-200 bg-ivory-50 flex items-center justify-between">
              <p className="text-xs text-ink-500">
                * 模板仅供参考，使用前建议咨询专业律师
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    navigate('/');
                    setSelectedTemplate(null);
                  }}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    使用此模板审查
                  </span>
                </button>
                <button 
                  onClick={() => alert('下载功能开发中')}
                  className="btn-primary px-4 py-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    下载模板
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
