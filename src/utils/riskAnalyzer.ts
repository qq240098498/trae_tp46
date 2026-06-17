import type { ContractClause, RiskItem, SuggestionItem, TemplateDeviation, RiskType, RiskSeverity, SuggestionType, UrgencyLevel } from '@/types';
import { findRegulationReferences } from '@/data/regulations';

interface ParsedClause {
  number: string;
  title: string;
  content: string;
  category: string;
}

interface RiskPattern {
  keywords: string[];
  type: RiskType;
  severity: RiskSeverity;
  title: string;
  description: (matchedText: string) => string;
  relatedText: (text: string, keyword: string) => string;
  impactDescription: string;
  urgency: UrgencyLevel;
}

interface SuggestionPattern {
  condition: (risks: RiskItem[], content: string) => boolean;
  type: SuggestionType;
  generateOriginal?: (risks: RiskItem[], content: string) => string;
  generateSuggested: (risks: RiskItem[], content: string) => string;
  generateExplanation: (risks: RiskItem[]) => string;
}

const clauseCategoryMap: { [key: string]: string } = {
  '服务': 'scope',
  '范围': 'scope',
  '内容': 'scope',
  '标的': 'scope',
  '价款': 'payment',
  '支付': 'payment',
  '报酬': 'payment',
  '费用': 'payment',
  '价格': 'payment',
  '知识产权': 'ip',
  '著作权': 'ip',
  '专利': 'ip',
  '商标': 'ip',
  '版权': 'ip',
  '保密': 'confidentiality',
  '商业秘密': 'confidentiality',
  '违约': 'liability',
  '责任': 'liability',
  '赔偿': 'liability',
  '数据': 'privacy',
  '隐私': 'privacy',
  '个人信息': 'privacy',
  '竞业': 'non-compete',
  '竞争': 'non-compete',
  '争议': 'dispute',
  '诉讼': 'dispute',
  '仲裁': 'dispute',
  '管辖': 'dispute',
  '期限': 'term',
  '终止': 'term',
  '解除': 'term',
  '生效': 'term',
  '其他': 'miscellaneous',
  '附则': 'miscellaneous',
};

export function parseContractText(text: string): ParsedClause[] {
  const clauses: ParsedClause[] = [];
  
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  
  let currentClause: ParsedClause | null = null;
  const clauseRegex = /^(第[一二三四五六七八九十百千万零〇]+[条章节款])[\s、.．]+(.+)$/;
  const numberedRegex = /^(\d+[\.．、)\]】]|[\(（]\d+[\)）])[\s]*(.+)$/;
  const chineseNumberedRegex = /^([一二三四五六七八九十]+[、.．)])[\s]*(.+)$/;
  
  for (const line of lines) {
    let matched = false;
    
    const clauseMatch = line.match(clauseRegex);
    if (clauseMatch) {
      if (currentClause) {
        clauses.push(currentClause);
      }
      const number = clauseMatch[1];
      const title = clauseMatch[2];
      const category = determineCategory(title);
      currentClause = {
        number,
        title,
        content: line,
        category,
      };
      matched = true;
      continue;
    }
    
    const numberedMatch = line.match(numberedRegex);
    if (numberedMatch) {
      if (currentClause) {
        clauses.push(currentClause);
      }
      const number = numberedMatch[1].replace(/[\.．)）\]】]/g, '');
      const title = numberedMatch[2].substring(0, Math.min(30, numberedMatch[2].length));
      const category = determineCategory(title);
      currentClause = {
        number: `第${number}条`,
        title,
        content: line,
        category,
      };
      matched = true;
      continue;
    }
    
    const chineseNumberedMatch = line.match(chineseNumberedRegex);
    if (chineseNumberedMatch && chineseNumberedMatch[2].length > 5) {
      if (currentClause) {
        clauses.push(currentClause);
      }
      const number = chineseNumberedMatch[1].replace(/[、.．)]/g, '');
      const title = chineseNumberedMatch[2].substring(0, Math.min(30, chineseNumberedMatch[2].length));
      const category = determineCategory(title);
      currentClause = {
        number: `第${number}条`,
        title,
        content: line,
        category,
      };
      matched = true;
      continue;
    }
    
    if (!matched && currentClause) {
      currentClause.content += '\n' + line;
      if (currentClause.title.length < 30) {
        const category = determineCategory(line);
        if (category !== 'miscellaneous' && currentClause.category === 'miscellaneous') {
          currentClause.category = category;
        }
      }
    }
    
    if (!matched && !currentClause) {
      continue;
    }
  }
  
  if (currentClause) {
    clauses.push(currentClause);
  }
  
  if (clauses.length === 0 && text.trim().length > 0) {
    clauses.push({
      number: '第一条',
      title: '合同内容',
      content: text,
      category: 'miscellaneous',
    });
  }
  
  return clauses;
}

function determineCategory(text: string): string {
  for (const [keyword, category] of Object.entries(clauseCategoryMap)) {
    if (text.includes(keyword)) {
      return category;
    }
  }
  return 'miscellaneous';
}

const riskPatterns: RiskPattern[] = [
  {
    keywords: ['另行协商', '另行约定', '双方协商', '协商确定', '另行确定'],
    type: 'ambiguity',
    severity: 'high',
    title: '重要事项约定不明',
    description: () => '该条款中约定重要事项"另行协商确定"，但未明确协商不成时的处理方式，可能导致后续履行争议。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 15);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '可能导致合同关键条款无法执行，若协商不成将引发重大履约纠纷甚至合同解除，造成重大经济损失。',
    urgency: 'urgent',
  },
  {
    keywords: ['尽合理努力', '合理努力', '尽力', '尽可能'],
    type: 'ambiguity',
    severity: 'medium',
    title: '履约标准表述模糊',
    description: () => '"尽合理努力"等表述缺乏明确的衡量标准，难以界定是否履行了合同义务。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 15);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '履约标准模糊可能导致一方以"已尽合理努力"为由逃避责任，争议时难以举证违约，增加维权成本。',
    urgency: 'soon',
  },
  {
    keywords: ['合理的', '适当的', '相关的', '相应的', '必要的'],
    type: 'ambiguity',
    severity: 'medium',
    title: '模糊定性表述',
    description: (matched) => `"${matched}"属于模糊表述，缺乏明确界定标准，容易产生理解分歧。`,
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 20);
      return text.substring(start, end);
    },
    impactDescription: '模糊定性容易被对方做有利于己方的解释，在争议中处于被动地位，可能承担超出预期的义务。',
    urgency: 'soon',
  },
  {
    keywords: ['乙方必须', '乙方应当', '乙方应', '乙方需'],
    type: 'inequality',
    severity: 'high',
    title: '单方义务条款',
    description: () => '条款仅规定了乙方的义务，未对应规定甲方的相应义务，可能构成权利义务不对等。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 5);
      const end = Math.min(text.length, idx + keyword.length + 30);
      return text.substring(start, end);
    },
    impactDescription: '权利义务严重失衡，可能导致一方承担无限连带责任，在法律上可能被认定为显失公平条款，面临被撤销风险。',
    urgency: 'urgent',
  },
  {
    keywords: ['甲方有权', '甲方可以', '甲方可随时'],
    type: 'inequality',
    severity: 'high',
    title: '单方权利条款',
    description: () => '条款仅赋予甲方权利，未赋予乙方对等的权利或救济，权利义务可能失衡。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 5);
      const end = Math.min(text.length, idx + keyword.length + 30);
      return text.substring(start, end);
    },
    impactDescription: '单方解约权不对等，一方可能随时解除合同而无需承担对等责任，导致对方遭受重大经济损失且无法追偿。',
    urgency: 'urgent',
  },
  {
    keywords: ['不得', '禁止', '严禁'],
    type: 'inequality',
    severity: 'medium',
    title: '限制性义务条款',
    description: () => '条款包含限制性规定，建议确认是否存在对等的限制或相应的补偿。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 25);
      return text.substring(start, end);
    },
    impactDescription: '单方限制性义务可能导致一方行为自由受到不当约束，若缺乏对等限制或补偿，存在争议空间。',
    urgency: 'soon',
  },
  {
    keywords: ['所有知识产权', '全部知识产权', '一切知识产权', '所有权利'],
    type: 'inequality',
    severity: 'medium',
    title: '知识产权归属过于绝对',
    description: () => '约定"所有知识产权归一方所有"未区分原有技术和定制开发部分，可能不合理。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 25);
      return text.substring(start, end);
    },
    impactDescription: '知识产权全部归属一方可能导致另一方原创技术和智力成果被无偿占有，存在重大经济利益损失风险。',
    urgency: 'soon',
  },
  {
    keywords: ['合同有效期内', '合同期内'],
    type: 'missing',
    severity: 'high',
    title: '保密期限过短',
    description: () => '如该条款为保密义务，保密期限仅约定为合同有效期内，商业秘密的价值不会因合同到期而消失，建议延长保密期限。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 15);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '合同到期后商业秘密将失去保护，可能被对方自由使用或披露，造成不可逆的竞争优势损失和经济损害。',
    urgency: 'urgent',
  },
  {
    keywords: ['承担违约责任', '承担相应责任'],
    type: 'ambiguity',
    severity: 'high',
    title: '违约责任约定不明',
    description: () => '仅原则性约定"承担违约责任"，未明确违约情形、违约金计算方式和损失赔偿范围，实际发生违约时难以执行。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 10);
      return text.substring(start, end);
    },
    impactDescription: '违约责任不明确将导致违约方难以被追责，守约方可能面临举证困难、维权成本高昂等问题，直接影响合同约束力。',
    urgency: 'urgent',
  },
  {
    keywords: ['提交法院', '向法院起诉', '诉讼解决'],
    type: 'ambiguity',
    severity: 'medium',
    title: '管辖法院约定不明',
    description: () => '仅约定"提交法院诉讼"，未明确具体管辖法院，可能增加管辖争议的风险。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '管辖约定模糊可能导致争议解决时产生管辖权异议，增加诉讼时间和成本，且可能在不利地域进行诉讼。',
    urgency: 'soon',
  },
  {
    keywords: ['个人信息', '个人数据', '隐私数据'],
    type: 'compliance',
    severity: 'medium',
    title: '个人信息处理合规提示',
    description: () => '涉及个人信息处理，建议明确处理目的、方式、范围及双方权利义务，符合《个人信息保护法》要求。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '违反《个人信息保护法》可能面临行政处罚（最高5000万元或上一年度营业额5%罚款）、民事赔偿及刑事责任。',
    urgency: 'soon',
  },
  {
    keywords: ['竞业限制', '竞业禁止', '不从事竞争', '相竞争的业务'],
    type: 'compliance',
    severity: 'high',
    title: '竞业限制合规风险',
    description: () => '竞业限制约定如适用于劳动者，需依法支付经济补偿，且期限不得超过2年。如适用于企业，建议明确具体范围和期限，避免约定过于宽泛导致无效。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 20);
      return text.substring(start, end);
    },
    impactDescription: '竞业限制约定不合法可能导致条款无效，无法实现保护商业利益的目的；若未支付经济补偿，还可能引发劳动争议和赔偿。',
    urgency: 'urgent',
  },
  {
    keywords: ['50%', '百分之五十'],
    type: 'inequality',
    severity: 'medium',
    title: '预付款比例过高',
    description: () => '如该条款为付款约定，50%的预付款比例较高，收款方违约风险较大，建议降低比例或采用里程碑式付款。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 15);
      const end = Math.min(text.length, idx + keyword.length + 20);
      return text.substring(start, end);
    },
    impactDescription: '高比例预付款增加资金风险，若收款方违约或交付质量不达标，付款方难以追回已付款项，造成直接经济损失。',
    urgency: 'soon',
  },
  {
    keywords: ['一次性支付', '全部付清', '一次性付清'],
    type: 'inequality',
    severity: 'medium',
    title: '付款节点风险',
    description: () => '如该条款约定尾款一次性支付，建议与验收等节点挂钩，避免付款后质量问题难以追责。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 15);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '一次性付款后若对方违约或质量不达标，缺少付款杠杆，追偿难度大，可能造成经济损失。',
    urgency: 'soon',
  },
  {
    keywords: ['自动终止', '自动解除'],
    type: 'missing',
    severity: 'medium',
    title: '合同终止善后缺失',
    description: () => '约定合同自动终止，建议同时明确终止后的资料交接、费用结算、保密义务延续等善后事宜。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '合同终止后缺乏善后约定，可能导致资料交接不清、费用结算争议，保密义务中断等后续纠纷。',
    urgency: 'soon',
  },
  {
    keywords: ['不得擅自使用', '不得向第三方披露'],
    type: 'missing',
    severity: 'low',
    title: '保密义务范围可完善',
    description: () => '保密义务条款可进一步明确保密信息的范围、除外情形、保密义务人的范围等内容。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '保密范围不够细化，可能在执行中产生理解偏差，但整体保密意图明确，实质影响有限。',
    urgency: 'suggested',
  },
  {
    keywords: ['妥善保管', '妥善处理'],
    type: 'ambiguity',
    severity: 'low',
    title: '"妥善"表述可具体化',
    description: () => '"妥善保管"建议明确具体的保管措施、安全标准和泄露时的责任承担。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + keyword.length + 15);
      return text.substring(start, end);
    },
    impactDescription: '"妥善"缺乏具体衡量标准，但在实务中通常可参照行业惯例理解，措辞不严谨但实质影响有限。',
    urgency: 'suggested',
  },
  {
    keywords: ['任何一方', '双方均可', '双方均有权'],
    type: 'ambiguity',
    severity: 'low',
    title: '可进一步细化违约情形',
    description: () => '违约责任建议区分不同违约情形，约定具体的违约金计算方式。',
    relatedText: (text, keyword) => {
      const idx = text.indexOf(keyword);
      const start = Math.max(0, idx - 5);
      const end = Math.min(text.length, idx + keyword.length + 20);
      return text.substring(start, end);
    },
    impactDescription: '未区分违约情形虽不够精细，但已基本覆盖违约处理框架，措辞不严谨但实质影响有限。',
    urgency: 'suggested',
  },
];

export function analyzeRisks(
  clauseContent: string,
  regulations?: Record<string, any>,
  matchPatterns?: any[]
): RiskItem[] {
  const risks: RiskItem[] = [];
  let riskIdCounter = 0;
  
  const addedRisks = new Set<string>();
  
  for (const pattern of riskPatterns) {
    for (const keyword of pattern.keywords) {
      if (clauseContent.includes(keyword)) {
        const riskKey = `${pattern.type}-${keyword}`;
        if (addedRisks.has(riskKey)) continue;
        addedRisks.add(riskKey);
        
        const regulationReferences = findRegulationReferences(clauseContent, pattern.type, regulations, matchPatterns);
        
        risks.push({
          id: `risk-${Date.now()}-${riskIdCounter++}`,
          type: pattern.type,
          severity: pattern.severity,
          title: pattern.title,
          description: pattern.description(keyword),
          relatedText: pattern.relatedText(clauseContent, keyword),
          impactDescription: pattern.impactDescription,
          urgency: pattern.urgency,
          regulationReferences: regulationReferences.length > 0 ? regulationReferences : undefined,
        });
        break;
      }
    }
  }
  
  adjustSeverityByCategory(risks, clauseContent, regulations, matchPatterns);
  
  return risks;
}

function adjustSeverityByCategory(
  risks: RiskItem[],
  content: string,
  regulations?: Record<string, any>,
  matchPatterns?: any[]
) {
  if (content.includes('违约') && risks.length > 0) {
    const hasSpecific = content.includes('违约金') || content.includes('%') || content.includes('百分之');
    if (!hasSpecific) {
      const liabilityRisk = risks.find(r => r.title.includes('违约责任'));
      if (liabilityRisk) liabilityRisk.severity = 'high';
    }
  }
  
  if (content.includes('保密') && risks.length === 0) {
    if (content.length < 80) {
      const regulationReferences = findRegulationReferences(content, 'missing', regulations, matchPatterns);
      risks.push({
        id: `risk-missing-${Date.now()}`,
        type: 'missing',
        severity: 'medium',
        title: '保密条款内容简略',
        description: '保密条款内容较为简略，建议明确保密信息范围、除外情形、保密期限和违约责任等。',
        relatedText: content.substring(0, Math.min(50, content.length)),
        impactDescription: '保密条款过于简略可能导致保密范围不清、违约难以认定，商业秘密保护存在漏洞。',
        urgency: 'soon',
        regulationReferences: regulationReferences.length > 0 ? regulationReferences : undefined,
      });
    }
  }
}

export function checkMissingEssentialClauses(parsedClauses: ParsedClause[]): { [category: string]: boolean } {
  const essentialCategories: { [key: string]: string[] } = {
    'liability': ['违约', '赔偿', '责任'],
    'dispute': ['争议', '诉讼', '仲裁', '管辖'],
    'confidentiality': ['保密', '商业秘密'],
    'term': ['期限', '终止', '解除', '生效'],
  };
  
  const found: { [category: string]: boolean } = {};
  
  for (const [category, keywords] of Object.entries(essentialCategories)) {
    found[category] = parsedClauses.some(clause => 
      keywords.some(keyword => 
        clause.title.includes(keyword) || clause.content.includes(keyword)
      )
    );
  }
  
  return found;
}

export function generateSuggestions(clause: ParsedClause, risks: RiskItem[]): SuggestionItem[] {
  const suggestions: SuggestionItem[] = [];
  let idCounter = 0;
  
  const content = clause.content;
  
  for (const risk of risks) {
    const keywordMatch = risk.relatedText;
    
    if (risk.type === 'ambiguity') {
      if (risk.title.includes('约定不明') || risk.title.includes('另行协商')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch.length < content.length ? keywordMatch : undefined,
          suggestedText: '具体内容详见本合同附件X《XX说明书》，该附件为本合同不可分割的组成部分，与本合同具有同等法律效力。',
          explanation: '将模糊事项以附件形式明确约定，避免履行过程中产生争议。附件应详细约定具体内容和标准。',
        });
      }
      
      if (risk.title.includes('履约标准') || risk.title.includes('合理努力')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch.length < content.length ? keywordMatch : undefined,
          suggestedText: '应按照本合同约定的标准和时间要求，保质保量完成工作并通过对方验收确认。',
          explanation: '使用明确可衡量的履约标准替代模糊表述，便于界定违约责任和验收标准。',
        });
      }
      
      if (risk.title.includes('模糊定性')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '（根据实际情况明确具体标准，如："不超过合同总价款30%"、"按照XX行业标准"等）',
          explanation: '将模糊词汇替换为具体、可量化的标准，避免双方理解分歧。',
        });
      }
      
      if (risk.title.includes('违约责任约定不明')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '违约方应向守约方支付合同总价款20%的违约金，并赔偿守约方因此遭受的全部损失，包括但不限于直接损失、间接损失和合理维权费用。',
          explanation: '明确约定违约金计算方式和损失赔偿范围，确保违约条款具有可执行性。',
        });
      }
      
      if (risk.title.includes('管辖法院')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '任何一方均有权向甲方所在地有管辖权的人民法院提起诉讼。',
          explanation: '明确约定管辖法院，减少管辖争议，提高争议解决效率。建议约定对己方有利的管辖地。',
        });
      }
      
      if (risk.title.includes('妥善')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '应采取符合行业标准的安全技术措施（包括但不限于加密、访问控制、备份等）保障数据安全。',
          explanation: '将"妥善"具体化，明确安全标准和具体措施，便于界定责任。',
        });
      }
      
      if (risk.title.includes('可进一步细化')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'addition',
          suggestedText: '如乙方逾期交付，每逾期一日按合同总价款的万分之五支付违约金；逾期超过30日的，甲方有权解除合同。如甲方逾期付款，每逾期一日按逾期金额的万分之五支付违约金。',
          explanation: '区分不同违约情形，约定具体的违约金标准，使违约责任具有可操作性。',
        });
      }
    }
    
    if (risk.type === 'inequality') {
      if (risk.title.includes('单方义务') || risk.title.includes('单方权利')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: keywordMatch.replace('乙方', '双方').replace('甲方', '双方'),
          explanation: '建议平衡双方权利义务，或者在约定单方义务/权利的同时，约定相应的对价/救济措施。',
        });
      }
      
      if (risk.title.includes('知识产权归属')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '定制开发部分的知识产权归甲方所有。乙方原有技术、通用组件及方法论的知识产权仍归乙方所有，甲方享有非排他性的使用权。',
          explanation: '合理区分定制开发部分和乙方原有知识产权，平衡双方利益，符合行业惯例。',
        });
      }
      
      if (risk.title.includes('限制性义务')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: keywordMatch + '（甲方/双方亦承担同等义务/提供相应补偿）',
          explanation: '对于限制性义务，建议确认是否存在对等限制或相应的经济补偿，避免权利义务失衡。',
        });
      }
      
      if (risk.title.includes('预付款比例') || risk.title.includes('付款节点')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '采用里程碑式分期付款：（1）合同签订后支付30%预付款；（2）中期评审通过后支付30%进度款；（3）验收合格后支付35%验收款；（4）质保期满后支付5%质保金。',
          explanation: '分期付款与项目进度挂钩，降低资金风险，同时预留质保金保障质量。',
        });
      }
    }
    
    if (risk.type === 'missing') {
      if (risk.title.includes('保密期限')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '保密期限自信息披露之日起五年，或直至该信息公开之日止（以较长者为准）。本合同终止不影响保密义务的承担。',
          explanation: '延长保密期限，明确合同终止后保密义务仍然有效，更好地保护商业秘密。',
        });
      }
      
      if (risk.title.includes('善后缺失') || risk.title.includes('自动终止')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'addition',
          suggestedText: '合同终止后，双方应在15个工作日内完成工作交接、资料返还和费用结算。保密义务、违约责任条款在合同终止后仍然有效。',
          explanation: '明确合同终止后的交接事宜和存续条款，避免遗留问题。',
        });
      }
      
      if (risk.title.includes('保密条款内容简略') || risk.title.includes('保密义务范围')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'addition',
          suggestedText: '保密信息包括但不限于：技术信息、经营信息、客户资料、财务数据等。保密信息不包括已公开信息、接收方合法拥有的信息和独立开发的信息。',
          explanation: '明确保密信息的具体范围和除外情形，避免争议。',
        });
      }
    }
    
    if (risk.type === 'compliance') {
      if (risk.title.includes('个人信息')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'addition',
          suggestedText: '双方确认按照《个人信息保护法》等法律法规履行个人信息保护义务。乙方作为受托处理方，应按照甲方指示处理个人信息，采取加密、访问控制等安全措施，不得超出约定范围处理。发生数据泄露时应在24小时内通知甲方。',
          explanation: '完善个人信息保护条款，符合法律法规要求，降低合规风险。',
        });
      }
      
      if (risk.title.includes('竞业限制')) {
        suggestions.push({
          id: `sug-${Date.now()}-${idCounter++}`,
          type: 'modification',
          originalText: keywordMatch,
          suggestedText: '在合同履行期间及终止后6个月内，不得为与甲方本合同项下业务相同或相似的竞争对手提供相同或类似的服务。如涉及劳动者竞业限制，甲方应按月支付经济补偿（标准不低于离职前月均工资30%）。',
          explanation: '明确竞业限制的具体范围和期限，涉及劳动者的依法支付经济补偿，确保条款合法有效。',
        });
      }
    }
  }
  
  if (suggestions.length === 0 && risks.length > 0) {
    suggestions.push({
      id: `sug-${Date.now()}-${idCounter++}`,
      type: 'modification',
      suggestedText: '建议根据上述风险提示，结合实际交易情况和双方谈判地位，对该条款内容进行针对性修订完善。',
      explanation: '条款存在多项风险点，建议综合考虑，逐条进行修改和完善。',
    });
  }
  
  return suggestions;
}

export function generateTemplateDeviation(
  clause: ParsedClause, 
  risks: RiskItem[]
): TemplateDeviation | undefined {
  if (risks.some(r => r.type === 'missing')) {
    return {
      type: 'missing',
      description: `缺少标准模板中关于"${clause.title}"的常见约定内容，建议补充完善。`,
    };
  }
  
  if (risks.some(r => r.type === 'ambiguity' || r.type === 'inequality')) {
    return {
      type: 'different',
      description: `该条款表述与行业标准模板存在差异，存在${risks.length}处需关注的风险点。建议参考标准条款表述进行调整。`,
      templateContent: generateStandardTemplateText(clause.category),
    };
  }
  
  return undefined;
}

function generateStandardTemplateText(category: string): string {
  const templates: { [key: string]: string } = {
    'scope': '服务内容详见附件一《需求说明书》。乙方应严格按照附件约定的标准、质量要求和进度完成交付，交付物需经甲方书面验收确认。',
    'payment': '合同总价款为人民币XX元整。付款方式：（1）合同签订后3个工作日内支付30%；（2）中期验收通过后3个工作日内支付30%；（3）最终验收合格后3个工作日内支付35%；（4）质保期满后3个工作日内支付5%。逾期付款的，每逾期一日按应付金额万分之五支付违约金。',
    'ip': '定制开发部分的知识产权归甲方所有。乙方交付的软件应保证不侵犯任何第三方的知识产权。乙方原有技术、通用组件的知识产权仍归乙方所有，甲方享有永久的、非排他性的使用权。',
    'confidentiality': '双方对知悉的对方保密信息承担保密义务，保密期限为信息披露之日起五年。保密信息不包括已公开信息、合法取得的信息和独立开发的信息。违反保密义务的，应支付违约金XX万元并赔偿全部损失。',
    'liability': '任何一方违约应承担违约责任。乙方逾期交付的，每逾期一日按合同总价款万分之五支付违约金；逾期超过30日的，甲方有权解除合同。违约方应赔偿对方全部损失，包括直接损失、间接损失和维权费用。',
    'privacy': '涉及个人信息处理的，双方应依法履行保护义务。乙方应按照甲方指示处理，采取加密、访问控制等安全措施。发生数据安全事件应于24小时内通知甲方。合同终止后应返还并删除全部数据。',
    'non-compete': '合同履行期间及终止后6个月内，不得为与甲方本合同业务相同或相似的竞争对手提供服务。涉及劳动者竞业限制的，甲方按月支付不低于离职前月均工资30%的经济补偿。',
    'dispute': '因本合同引起的争议，双方应友好协商解决。协商不成的，任何一方均有权向甲方所在地有管辖权的人民法院提起诉讼。',
    'term': '本合同自双方签字盖章之日起生效，有效期XX年。任何一方严重违约经催告15日内未改正的，守约方有权解除合同。合同终止后，双方应完成交接和结算，保密、违约条款继续有效。',
    'miscellaneous': '本合同一式两份，双方各执一份，具有同等法律效力。未尽事宜由双方另行签订补充协议。通知应以书面形式发送至本合同载明的地址。',
  };
  
  return templates[category] || templates['miscellaneous'];
}

export function calculateOverallScore(clauses: ContractClause[]): {
  score: number;
  summary: { high: number; medium: number; low: number };
} {
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  
  for (const clause of clauses) {
    for (const risk of clause.risks) {
      if (risk.severity === 'high') highCount++;
      else if (risk.severity === 'medium') mediumCount++;
      else lowCount++;
    }
  }
  
  const weightedRisk = highCount * 10 + mediumCount * 5 + lowCount * 2;
  const baseScore = 100 - weightedRisk;
  const score = Math.max(0, Math.min(100, baseScore));
  
  return {
    score,
    summary: {
      high: highCount,
      medium: mediumCount,
      low: lowCount,
    },
  };
}

export function addMissingClauseWarnings(
  clauses: ContractClause[],
  parsedClauses: ParsedClause[],
  regulations?: Record<string, any>,
  matchPatterns?: any[]
): ContractClause[] {
  const missingCheck = checkMissingEssentialClauses(parsedClauses);
  const result = [...clauses];
  
  const missingMap: { [key: string]: { title: string; content: string; keywords: string[] } } = {
    'liability': { 
      title: '违约责任条款缺失', 
      content: '检测建议：合同应包含明确的违约责任条款，约定各类违约情形的处理方式和违约金标准。',
      keywords: ['违约责任', '违约金', '赔偿损失'],
    },
    'dispute': { 
      title: '争议解决条款缺失', 
      content: '检测建议：合同应约定争议解决方式（诉讼或仲裁）和管辖机构。',
      keywords: ['管辖', '法院', '诉讼', '仲裁', '争议解决'],
    },
    'confidentiality': { 
      title: '保密条款缺失', 
      content: '检测建议：建议增加保密条款，保护双方商业秘密和敏感信息。',
      keywords: ['保密', '商业秘密', '保密信息'],
    },
    'term': { 
      title: '合同期限与终止条款不完善', 
      content: '检测建议：建议明确合同期限、解除条件和终止后的善后事宜。',
      keywords: ['合同有效期', '合同期内', '自动终止', '自动解除'],
    },
  };
  
  let warningIndex = clauses.length + 1;
  
  for (const [category, isFound] of Object.entries(missingCheck)) {
    if (!isFound && missingMap[category]) {
      const info = missingMap[category];
      const sampleContent = info.keywords.join(' ');
      const regulationReferences = findRegulationReferences(sampleContent, 'missing', regulations, matchPatterns);
      
      result.push({
        id: `clause-warning-${warningIndex}`,
        number: '【缺失提醒】',
        title: info.title,
        content: info.content,
        category: 'warning',
        risks: [{
          id: `risk-missing-${warningIndex}`,
          type: 'missing',
          severity: 'medium',
          title: info.title,
          description: info.content,
          relatedText: '',
          impactDescription: `缺少${info.title}将导致合同在相关事项上缺乏明确约定，发生纠纷时难以依约处理。`,
          urgency: 'soon',
          regulationReferences: regulationReferences.length > 0 ? regulationReferences : undefined,
        }],
        suggestions: [{
          id: `sug-missing-${warningIndex}`,
          type: 'addition',
          suggestedText: generateStandardTemplateText(category),
          explanation: `建议在合同中增加${info.title}，避免因约定不明产生纠纷。`,
        }],
      });
      warningIndex++;
    }
  }
  
  return result;
}
