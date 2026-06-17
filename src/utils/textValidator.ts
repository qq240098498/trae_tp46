export interface ValidationResult {
  isValid: boolean;
  errorType?: 'too_short' | 'no_keywords' | 'gibberish' | 'too_much_repetition';
  message: string;
  suggestions?: string[];
}

const MIN_CONTRACT_LENGTH = 150;

const CONTRACT_KEYWORDS = [
  '合同', '协议', '甲方', '乙方', '双方', '条款', '签订', '签署',
  '约定', '履行', '义务', '权利', '责任', '违约', '赔偿',
  '期限', '生效', '终止', '解除', '争议', '管辖',
  '价款', '支付', '报酬', '费用', '服务', '买卖', '租赁',
  '保密', '知识产权', '交付', '验收', '保证',
];

export function validateContractText(text: string): ValidationResult {
  const trimmed = text.trim();
  
  if (!trimmed) {
    return {
      isValid: false,
      errorType: 'too_short',
      message: '请输入合同文本内容',
      suggestions: ['上传合同文件', '粘贴合同文本', '使用示例合同体验'],
    };
  }
  
  if (trimmed.length < MIN_CONTRACT_LENGTH) {
    return {
      isValid: false,
      errorType: 'too_short',
      message: `合同文本过短（当前${trimmed.length}字），建议至少输入${MIN_CONTRACT_LENGTH}字`,
      suggestions: ['补充完整的合同条款内容', '包含甲方乙方信息和主要条款'],
    };
  }
  
  const foundKeywords = CONTRACT_KEYWORDS.filter(kw => trimmed.includes(kw));
  
  if (foundKeywords.length < 3) {
    return {
      isValid: false,
      errorType: 'no_keywords',
      message: '输入内容缺少合同常见要素，可能不是有效的合同文本',
      suggestions: [
        '确保包含"甲方"、"乙方"等合同主体',
        '包含合同目的、权利义务等主要内容',
        '如果是测试请使用"使用示例合同"功能',
      ],
    };
  }
  
  if (isGibberish(trimmed)) {
    return {
      isValid: false,
      errorType: 'gibberish',
      message: '检测到输入内容可能为乱码或无意义字符',
      suggestions: [
        '请输入正常的合同文本内容',
        '检查文件编码是否正确',
        '避免输入大量重复或无意义的字符',
      ],
    };
  }
  
  if (hasExcessiveRepetition(trimmed)) {
    return {
      isValid: false,
      errorType: 'too_much_repetition',
      message: '检测到大量重复内容，请输入真实的合同文本',
      suggestions: [
        '避免复制粘贴重复内容',
        '输入完整且有实际意义的合同条款',
        '使用"使用示例合同"功能快速体验',
      ],
    };
  }
  
  return {
    isValid: true,
    message: '合同文本验证通过',
  };
}

function isGibberish(text: string): boolean {
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
  const chineseRatio = chineseChars.length / text.length;
  
  const hasStructuralMarkers = /第[一二三四五六七八九十百千万零〇]+[条章节]/.test(text);
  const hasNumberedItems = /\d+[\.．、)）]/.test(text);
  
  if (chineseRatio < 0.3 && !hasStructuralMarkers && !hasNumberedItems) {
    return true;
  }
  
  const normalPunctuation = text.match(/[，。！？、；：""''（）《》【】,\.!\?;:\(\)\[\]]/g) || [];
  const normalRatio = normalPunctuation.length / text.length;
  
  const strangeChars = text.match(/[~～\^\|\\\/_=\+\*\#\@\&\%\$\§\¶\@]/g) || [];
  const strangeRatio = strangeChars.length / text.length;
  
  if (strangeRatio > 0.1 && normalRatio < 0.01) {
    return true;
  }
  
  return false;
}

function hasExcessiveRepetition(text: string): boolean {
  const cleanText = text.replace(/\s+/g, '');
  
  for (let len = 2; len <= 6; len++) {
    for (let i = 0; i <= cleanText.length - len * 5; i++) {
      const pattern = cleanText.substring(i, i + len);
      let repeatCount = 1;
      let pos = i + len;
      
      while (pos + len <= cleanText.length && cleanText.substring(pos, pos + len) === pattern) {
        repeatCount++;
        pos += len;
      }
      
      if (repeatCount >= 10) {
        return true;
      }
    }
  }
  
  const uniqueRatio = new Set(cleanText.split('')).size / cleanText.length;
  if (cleanText.length > 500 && uniqueRatio < 0.05) {
    return true;
  }
  
  return false;
}
