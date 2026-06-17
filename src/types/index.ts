export type RiskType = 'inequality' | 'ambiguity' | 'missing' | 'compliance';
export type RiskSeverity = 'high' | 'medium' | 'low';
export type SuggestionType = 'modification' | 'addition' | 'deletion';
export type ContractCategory = 'sales' | 'service' | 'employment' | 'ndA' | 'lease' | 'other';

export interface RiskItem {
  id: string;
  type: RiskType;
  severity: RiskSeverity;
  title: string;
  description: string;
  relatedText: string;
}

export interface SuggestionItem {
  id: string;
  type: SuggestionType;
  originalText?: string;
  suggestedText: string;
  explanation: string;
}

export interface TemplateDeviation {
  type: 'missing' | 'different' | 'additional';
  description: string;
  templateContent?: string;
}

export interface ContractClause {
  id: string;
  number: string;
  title: string;
  content: string;
  category: string;
  risks: RiskItem[];
  suggestions: SuggestionItem[];
  templateDeviation?: TemplateDeviation;
}

export interface ReviewResult {
  contractTitle: string;
  contractType: string;
  reviewDate: string;
  overallScore: number;
  riskSummary: {
    high: number;
    medium: number;
    low: number;
  };
  clauses: ContractClause[];
}

export interface TemplateClause {
  number: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface ContractTemplate {
  id: string;
  name: string;
  category: ContractCategory;
  description: string;
  clauses: TemplateClause[];
}

export interface RiskTypeInfo {
  type: RiskType;
  label: string;
  description: string;
}

export const RISK_TYPE_INFO: RiskTypeInfo[] = [
  { type: 'inequality', label: '不对等条款', description: '权利义务失衡，一方明显处于不利地位' },
  { type: 'ambiguity', label: '模糊表述', description: '表述不明确，可能产生争议和解读分歧' },
  { type: 'missing', label: '缺失保障', description: '缺少必要的保护性条款' },
  { type: 'compliance', label: '合规风险', description: '可能违反法律法规的强制性规定' },
];

export const CONTRACT_CATEGORIES: { value: ContractCategory; label: string }[] = [
  { value: 'sales', label: '买卖合同' },
  { value: 'service', label: '服务合同' },
  { value: 'employment', label: '劳动合同' },
  { value: 'ndA', label: '保密协议' },
  { value: 'lease', label: '租赁合同' },
  { value: 'other', label: '其他合同' },
];
