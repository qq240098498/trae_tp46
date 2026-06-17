import { create } from 'zustand';
import type { ReviewResult, ContractClause, ContractTemplate } from '@/types';
import { contractTemplates } from '@/data/templates';
import {
  parseContractText,
  analyzeRisks,
  generateSuggestions,
  generateTemplateDeviation,
  calculateOverallScore,
  addMissingClauseWarnings,
} from '@/utils/riskAnalyzer';
import { useRegulationStore } from './regulationStore';

interface ContractState {
  reviewResult: ReviewResult | null;
  selectedClauseId: string | null;
  isAnalyzing: boolean;
  contractText: string;
  contractType: string;
  templates: ContractTemplate[];
  activeTab: 'risks' | 'suggestions' | 'template';
  
  setContractText: (text: string) => void;
  setContractType: (type: string) => void;
  startAnalysis: () => void;
  setSelectedClause: (id: string | null) => void;
  setActiveTab: (tab: 'risks' | 'suggestions' | 'template') => void;
  getSelectedClause: () => ContractClause | undefined;
  resetAnalysis: () => void;
}

const categoryLabelMap: { [key: string]: string } = {
  'sales': '买卖合同',
  'service': '服务合同',
  'employment': '劳动合同',
  'ndA': '保密协议',
  'lease': '租赁合同',
  'other': '其他合同',
};

export const useContractStore = create<ContractState>((set, get) => ({
  reviewResult: null,
  selectedClauseId: null,
  isAnalyzing: false,
  contractText: '',
  contractType: 'service',
  templates: contractTemplates,
  activeTab: 'risks',
  
  setContractText: (text) => set({ contractText: text }),
  
  setContractType: (type) => set({ contractType: type }),
  
  startAnalysis: () => {
    const { contractText, contractType } = get();
    
    set({ isAnalyzing: true });
    
    setTimeout(() => {
      const { regulations, matchPatterns } = useRegulationStore.getState();
      const parsedClauses = parseContractText(contractText);
      
      const contractClauses: ContractClause[] = parsedClauses.map((parsed, index) => {
        const risks = analyzeRisks(parsed.content, regulations, matchPatterns);
        const suggestions = generateSuggestions(parsed, risks);
        const templateDeviation = generateTemplateDeviation(parsed, risks);
        
        return {
          id: `clause-${index}-${Date.now()}`,
          number: parsed.number,
          title: parsed.title,
          content: parsed.content,
          category: parsed.category,
          risks,
          suggestions,
          templateDeviation,
        };
      });
      
      const clausesWithWarnings = addMissingClauseWarnings(contractClauses, parsedClauses, regulations, matchPatterns);
      const { score, summary } = calculateOverallScore(clausesWithWarnings);
      
      const firstLine = contractText.split('\n').find(line => line.trim().length > 0)?.trim() || '未命名合同';
      const contractTitle = firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;
      
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      const reviewResult: ReviewResult = {
        contractTitle: contractTitle.includes('合同') || contractTitle.includes('协议') ? contractTitle : `${categoryLabelMap[contractType] || '合同'}审查`,
        contractType: categoryLabelMap[contractType] || contractType,
        reviewDate: dateStr,
        overallScore: score,
        riskSummary: summary,
        clauses: clausesWithWarnings,
      };
      
      set({ 
        reviewResult,
        isAnalyzing: false,
        selectedClauseId: clausesWithWarnings[0]?.id || null,
      });
    }, 2000);
  },
  
  setSelectedClause: (id) => set({ selectedClauseId: id }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  getSelectedClause: () => {
    const { reviewResult, selectedClauseId } = get();
    return reviewResult?.clauses.find(c => c.id === selectedClauseId);
  },
  
  resetAnalysis: () => set({
    reviewResult: null,
    selectedClauseId: null,
    isAnalyzing: false,
    activeTab: 'risks',
  }),
}));
