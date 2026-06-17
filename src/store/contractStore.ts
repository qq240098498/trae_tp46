import { create } from 'zustand';
import type { ReviewResult, ContractClause, ContractTemplate } from '@/types';
import { mockReviewResult } from '@/data/mockContract';
import { contractTemplates } from '@/data/templates';

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
    set({ isAnalyzing: true });
    setTimeout(() => {
      set({ 
        reviewResult: mockReviewResult,
        isAnalyzing: false,
        selectedClauseId: mockReviewResult.clauses[0]?.id || null,
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
