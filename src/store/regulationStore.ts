import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RegulationItem, RegulationMatchPattern } from '@/types';
import { REGULATIONS, REGULATION_MATCH_PATTERNS } from '@/data/regulations';

interface RegulationArticle {
  articleNumber: string;
  articleContent: string;
}

interface RegulationState {
  regulations: Record<string, RegulationItem>;
  matchPatterns: RegulationMatchPattern[];
  isEditing: boolean;
  editingRegulation: RegulationItem | null;
  editingArticles: RegulationArticle[];
  editingPattern: RegulationMatchPattern | null;
  activeTab: 'regulations' | 'patterns';
  searchKeyword: string;
  filterType: string;
  
  setSearchKeyword: (keyword: string) => void;
  setFilterType: (type: string) => void;
  setActiveTab: (tab: 'regulations' | 'patterns') => void;
  startEditRegulation: (regulation?: RegulationItem) => void;
  cancelEdit: () => void;
  updateEditingRegulation: (field: keyof RegulationItem, value: any) => void;
  addArticle: () => void;
  updateArticle: (index: number, field: 'articleNumber' | 'articleContent', value: string) => void;
  removeArticle: (index: number) => void;
  saveRegulation: () => void;
  deleteRegulation: (id: string) => void;
  toggleRepealed: (id: string) => void;
  resetToDefault: () => void;
  
  startEditPattern: (pattern?: RegulationMatchPattern) => void;
  cancelEditPattern: () => void;
  updateEditingPattern: (field: keyof RegulationMatchPattern, value: any) => void;
  addPatternReference: () => void;
  updatePatternReference: (index: number, field: string, value: string) => void;
  removePatternReference: (index: number) => void;
  addPatternKeyword: () => void;
  updatePatternKeyword: (index: number, value: string) => void;
  removePatternKeyword: (index: number) => void;
  addPatternRiskType: () => void;
  updatePatternRiskType: (index: number, value: string) => void;
  removePatternRiskType: (index: number) => void;
  savePattern: () => void;
  deletePattern: (index: number) => void;
}

const createEmptyRegulation = (): RegulationItem => ({
  id: `reg_${Date.now()}`,
  name: '',
  type: 'law',
  issueAuthority: '',
  issueDate: '',
  effectiveDate: '',
  isRepealed: false,
  scope: '',
  articleIndex: {},
});

const createEmptyPattern = (): RegulationMatchPattern => ({
  keywords: [''],
  riskTypes: ['compliance'],
  regulationReferences: [{ regulationId: '', articleNumber: '', relevance: 'related' }],
});

export const useRegulationStore = create<RegulationState>()(
  persist(
    (set, get) => ({
      regulations: REGULATIONS,
      matchPatterns: REGULATION_MATCH_PATTERNS,
      isEditing: false,
      editingRegulation: null,
      editingArticles: [],
      editingPattern: null,
      activeTab: 'regulations',
      searchKeyword: '',
      filterType: 'all',
      
      setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
      
      setFilterType: (type) => set({ filterType: type }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      startEditRegulation: (regulation) => {
        if (regulation) {
          const articles = Object.entries(regulation.articleIndex).map(([articleNumber, articleContent]) => ({
            articleNumber,
            articleContent,
          }));
          set({
            isEditing: true,
            editingRegulation: { ...regulation },
            editingArticles: articles,
          });
        } else {
          set({
            isEditing: true,
            editingRegulation: createEmptyRegulation(),
            editingArticles: [{ articleNumber: '', articleContent: '' }],
          });
        }
      },
      
      cancelEdit: () => set({
        isEditing: false,
        editingRegulation: null,
        editingArticles: [],
      }),
      
      updateEditingRegulation: (field, value) => {
        const { editingRegulation } = get();
        if (editingRegulation) {
          set({
            editingRegulation: { ...editingRegulation, [field]: value },
          });
        }
      },
      
      addArticle: () => {
        const { editingArticles } = get();
        set({
          editingArticles: [...editingArticles, { articleNumber: '', articleContent: '' }],
        });
      },
      
      updateArticle: (index, field, value) => {
        const { editingArticles } = get();
        const newArticles = [...editingArticles];
        newArticles[index] = { ...newArticles[index], [field]: value };
        set({ editingArticles: newArticles });
      },
      
      removeArticle: (index) => {
        const { editingArticles } = get();
        const newArticles = editingArticles.filter((_, i) => i !== index);
        set({ editingArticles: newArticles });
      },
      
      saveRegulation: () => {
        const { editingRegulation, editingArticles, regulations } = get();
        if (!editingRegulation) return;
        
        const articleIndex: Record<string, string> = {};
        editingArticles.forEach((article) => {
          if (article.articleNumber && article.articleContent) {
            articleIndex[article.articleNumber] = article.articleContent;
          }
        });
        
        const updatedRegulation = { ...editingRegulation, articleIndex };
        
        set({
          regulations: {
            ...regulations,
            [updatedRegulation.id]: updatedRegulation,
          },
          isEditing: false,
          editingRegulation: null,
          editingArticles: [],
        });
      },
      
      deleteRegulation: (id) => {
        const { regulations } = get();
        const newRegulations = { ...regulations };
        delete newRegulations[id];
        set({ regulations: newRegulations });
      },
      
      toggleRepealed: (id) => {
        const { regulations } = get();
        const regulation = regulations[id];
        if (regulation) {
          set({
            regulations: {
              ...regulations,
              [id]: { ...regulation, isRepealed: !regulation.isRepealed },
            },
          });
        }
      },
      
      resetToDefault: () => set({
        regulations: REGULATIONS,
        matchPatterns: REGULATION_MATCH_PATTERNS,
      }),
      
      startEditPattern: (pattern) => {
        if (pattern) {
          set({
            editingPattern: { ...pattern },
          });
        } else {
          set({
            editingPattern: createEmptyPattern(),
          });
        }
      },
      
      cancelEditPattern: () => set({ editingPattern: null }),
      
      updateEditingPattern: (field, value) => {
        const { editingPattern } = get();
        if (editingPattern) {
          set({
            editingPattern: { ...editingPattern, [field]: value },
          });
        }
      },
      
      addPatternReference: () => {
        const { editingPattern } = get();
        if (editingPattern) {
          set({
            editingPattern: {
              ...editingPattern,
              regulationReferences: [
                ...editingPattern.regulationReferences,
                { regulationId: '', articleNumber: '', relevance: 'related' },
              ],
            },
          });
        }
      },
      
      updatePatternReference: (index, field, value) => {
        const { editingPattern } = get();
        if (editingPattern) {
          const newReferences = [...editingPattern.regulationReferences];
          newReferences[index] = { ...newReferences[index], [field]: value };
          set({
            editingPattern: { ...editingPattern, regulationReferences: newReferences },
          });
        }
      },
      
      removePatternReference: (index) => {
        const { editingPattern } = get();
        if (editingPattern) {
          const newReferences = editingPattern.regulationReferences.filter((_, i) => i !== index);
          set({
            editingPattern: { ...editingPattern, regulationReferences: newReferences },
          });
        }
      },
      
      addPatternKeyword: () => {
        const { editingPattern } = get();
        if (editingPattern) {
          set({
            editingPattern: {
              ...editingPattern,
              keywords: [...editingPattern.keywords, ''],
            },
          });
        }
      },
      
      updatePatternKeyword: (index, value) => {
        const { editingPattern } = get();
        if (editingPattern) {
          const newKeywords = [...editingPattern.keywords];
          newKeywords[index] = value;
          set({
            editingPattern: { ...editingPattern, keywords: newKeywords },
          });
        }
      },
      
      removePatternKeyword: (index) => {
        const { editingPattern } = get();
        if (editingPattern) {
          const newKeywords = editingPattern.keywords.filter((_, i) => i !== index);
          set({
            editingPattern: { ...editingPattern, keywords: newKeywords },
          });
        }
      },
      
      addPatternRiskType: () => {
        const { editingPattern } = get();
        if (editingPattern) {
          set({
            editingPattern: {
              ...editingPattern,
              riskTypes: [...editingPattern.riskTypes, 'compliance'],
            },
          });
        }
      },
      
      updatePatternRiskType: (index, value) => {
        const { editingPattern } = get();
        if (editingPattern) {
          const newRiskTypes = [...editingPattern.riskTypes];
          newRiskTypes[index] = value as any;
          set({
            editingPattern: { ...editingPattern, riskTypes: newRiskTypes },
          });
        }
      },
      
      removePatternRiskType: (index) => {
        const { editingPattern } = get();
        if (editingPattern) {
          const newRiskTypes = editingPattern.riskTypes.filter((_, i) => i !== index);
          set({
            editingPattern: { ...editingPattern, riskTypes: newRiskTypes },
          });
        }
      },
      
      savePattern: () => {
        const { editingPattern, matchPatterns } = get();
        if (!editingPattern) return;
        
        const existingIndex = matchPatterns.findIndex(
          (p) => JSON.stringify(p.keywords) === JSON.stringify(editingPattern.keywords)
        );
        
        if (existingIndex >= 0) {
          const newPatterns = [...matchPatterns];
          newPatterns[existingIndex] = editingPattern;
          set({ matchPatterns: newPatterns });
        } else {
          set({ matchPatterns: [...matchPatterns, editingPattern] });
        }
        
        set({ editingPattern: null });
      },
      
      deletePattern: (index) => {
        const { matchPatterns } = get();
        const newPatterns = matchPatterns.filter((_, i) => i !== index);
        set({ matchPatterns: newPatterns });
      },
    }),
    {
      name: 'regulation-storage',
      partialize: (state) => ({
        regulations: state.regulations,
        matchPatterns: state.matchPatterns,
      }),
    }
  )
);
