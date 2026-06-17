import type { RegulationItem, RegulationReference, RelevanceType } from '@/types';

export const REGULATIONS: Record<string, RegulationItem> = {
  civil_code: {
    id: 'civil_code',
    name: '中华人民共和国民法典',
    type: 'law',
    issueAuthority: '全国人民代表大会',
    issueDate: '2020-05-28',
    effectiveDate: '2021-01-01',
    isRepealed: false,
    scope: '全国范围内适用，调整平等主体的自然人、法人和非法人组织之间的人身关系和财产关系',
    articleIndex: {
      '第4条': '民事主体在民事活动中的法律地位一律平等。',
      '第5条': '民事主体从事民事活动，应当遵循自愿原则，按照自己的意思设立、变更、终止民事法律关系。',
      '第6条': '民事主体从事民事活动，应当遵循公平原则，合理确定各方的权利和义务。',
      '第7条': '民事主体从事民事活动，应当遵循诚信原则，秉持诚实，恪守承诺。',
      '第8条': '民事主体从事民事活动，不得违反法律，不得违背公序良俗。',
      '第464条': '合同是民事主体之间设立、变更、终止民事法律关系的协议。',
      '第465条': '依法成立的合同，受法律保护。依法成立的合同，仅对当事人具有法律约束力，但是法律另有规定的除外。',
      '第470条': '合同的内容由当事人约定，一般包括下列条款：（一）当事人的姓名或者名称和住所；（二）标的；（三）数量；（四）质量；（五）价款或者报酬；（六）履行期限、地点和方式；（七）违约责任；（八）解决争议的方法。',
      '第496条': '格式条款是当事人为了重复使用而预先拟定，并在订立合同时未与对方协商的条款。提供格式条款的一方应当遵循公平原则确定当事人之间的权利和义务，并采取合理的方式提示对方注意免除或者减轻其责任等与对方有重大利害关系的条款。',
      '第497条': '有下列情形之一的，该格式条款无效：（一）具有本法第一编第六章第三节和本法第五百零六条规定的无效情形；（二）提供格式条款一方不合理地免除或者减轻其责任、加重对方责任、限制对方主要权利；（三）提供格式条款一方排除对方主要权利。',
      '第502条': '依法成立的合同，自成立时生效，但是法律另有规定或者当事人另有约定的除外。',
      '第509条': '当事人应当按照约定全面履行自己的义务。当事人应当遵循诚信原则，根据合同的性质、目的和交易习惯履行通知、协助、保密等义务。',
      '第577条': '当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。',
      '第578条': '当事人一方明确表示或者以自己的行为表明不履行合同义务的，对方可以在履行期限届满前请求其承担违约责任。',
      '第584条': '当事人一方不履行合同义务或者履行合同义务不符合约定，造成对方损失的，损失赔偿额应当相当于因违约所造成的损失，包括合同履行后可以获得的利益；但是，不得超过违约一方订立合同时预见到或者应当预见到的因违约可能造成的损失。',
      '第585条': '当事人可以约定一方违约时应当根据违约情况向对方支付一定数额的违约金，也可以约定因违约产生的损失赔偿额的计算方法。约定的违约金低于造成的损失的，人民法院或者仲裁机构可以根据当事人的请求予以增加；约定的违约金过分高于造成的损失的，人民法院或者仲裁机构可以根据当事人的请求予以适当减少。',
      '第845条': '技术合同的内容一般包括项目的名称，标的的内容、范围和要求，履行的计划、地点和方式，技术信息和资料的保密，技术成果的归属和收益的分配办法，验收标准和方法等条款。',
      '第847条': '职务技术成果的使用权、转让权属于法人或者非法人组织的，法人或者非法人组织可以就该项职务技术成果订立技术合同。',
      '第848条': '非职务技术成果的使用权、转让权属于完成技术成果的个人，完成技术成果的个人可以就该项非职务技术成果订立技术合同。',
      '第861条': '委托开发或者合作开发完成的技术秘密成果的使用权、转让权以及收益的分配办法，由当事人约定；没有约定或者约定不明确，依据本法第五百一十条的规定仍不能确定的，在没有相同技术方案被授予专利权前，当事人均有使用和转让的权利。',
    },
  },
  pipa_law: {
    id: 'pipa_law',
    name: '中华人民共和国个人信息保护法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2021-08-20',
    effectiveDate: '2021-11-01',
    isRepealed: false,
    scope: '全国范围内适用，保护自然人的个人信息权益，规范个人信息处理活动',
    articleIndex: {
      '第4条': '个人信息是以电子或者其他方式记录的与已识别或者可识别的自然人有关的各种信息，不包括匿名化处理后的信息。个人信息的处理包括个人信息的收集、存储、使用、加工、传输、提供、公开、删除等。',
      '第5条': '处理个人信息应当遵循合法、正当、必要和诚信原则，不得通过误导、欺诈、胁迫等方式处理个人信息。',
      '第6条': '处理个人信息应当具有明确、合理的目的，并应当与处理目的直接相关，采取对个人权益影响最小的方式。收集个人信息，应当限于实现处理目的的最小范围，不得过度收集个人信息。',
      '第13条': '符合下列情形之一的，个人信息处理者方可处理个人信息：（一）取得个人的同意；（二）为订立、履行个人作为一方当事人的合同所必需；（三）为履行法定职责或者法定义务所必需；（四）为应对突发公共卫生事件，或者紧急情况下为保护自然人的生命健康和财产安全所必需；（五）为公共利益实施新闻报道、舆论监督等行为，在合理的范围内处理个人信息；（六）依照本法规定在合理的范围内处理个人自行公开或者其他已经合法公开的个人信息。',
      '第21条': '个人信息处理者委托处理个人信息的，应当与受托人约定委托处理的目的、期限、处理方式、个人信息的种类、保护措施以及双方的权利和义务等，并对受托人的个人信息处理活动进行监督。',
      '第51条': '个人信息处理者应当根据个人信息的处理目的、处理方式、个人信息的种类以及对个人权益的影响、可能存在的安全风险等，采取下列措施确保个人信息处理活动符合法律、行政法规的规定，并防止未经授权的访问以及个人信息泄露、篡改、丢失：（一）制定内部管理制度和操作规程；（二）对个人信息实行分类管理；（三）采取相应的加密、去标识化等安全技术措施；（四）合理确定个人信息处理的操作权限，并定期对从业人员进行安全教育和培训；（五）制定并组织实施个人信息安全事件应急预案；（六）法律、行政法规规定的其他措施。',
      '第57条': '发生或者可能发生个人信息泄露、篡改、丢失的，个人信息处理者应当立即采取补救措施，并通知履行个人信息保护职责的部门和个人。',
    },
  },
  labor_law: {
    id: 'labor_law',
    name: '中华人民共和国劳动合同法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2012-12-28',
    effectiveDate: '2013-07-01',
    isRepealed: false,
    scope: '全国范围内适用，调整劳动关系，规范劳动合同的订立、履行、变更、解除或者终止',
    articleIndex: {
      '第3条': '订立劳动合同，应当遵循合法、公平、平等自愿、协商一致、诚实信用的原则。',
      '第23条': '用人单位与劳动者可以在劳动合同中约定保守用人单位的商业秘密和与知识产权相关的保密事项。对负有保密义务的劳动者，用人单位可以在劳动合同或者保密协议中与劳动者约定竞业限制条款，并约定在解除或者终止劳动合同后，在竞业限制期限内按月给予劳动者经济补偿。劳动者违反竞业限制约定的，应当按照约定向用人单位支付违约金。',
      '第24条': '竞业限制的人员限于用人单位的高级管理人员、高级技术人员和其他负有保密义务的人员。竞业限制的范围、地域、期限由用人单位与劳动者约定，竞业限制的约定不得违反法律、法规的规定。在解除或者终止劳动合同后，前款规定的人员到与本单位生产或者经营同类产品、从事同类业务的有竞争关系的其他用人单位，或者自己开业生产或者经营同类产品、从事同类业务的竞业限制期限，不得超过二年。',
      '第25条': '除本法第二十二条和第二十三条规定的情形外，用人单位不得与劳动者约定由劳动者承担违约金。',
      '第47条': '经济补偿按劳动者在本单位工作的年限，每满一年支付一个月工资的标准向劳动者支付。六个月以上不满一年的，按一年计算；不满六个月的，向劳动者支付半个月工资的经济补偿。劳动者月工资高于用人单位所在直辖市、设区的市级人民政府公布的本地区上年度职工月平均工资三倍的，向其支付经济补偿的标准按职工月平均工资三倍的数额支付，向其支付经济补偿的年限最高不超过十二年。',
    },
  },
  anti_unfair_competition_law: {
    id: 'anti_unfair_competition_law',
    name: '中华人民共和国反不正当竞争法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2019-04-23',
    effectiveDate: '2019-04-23',
    isRepealed: false,
    scope: '全国范围内适用，制止不正当竞争行为，保护经营者和消费者的合法权益',
    articleIndex: {
      '第9条': '经营者不得实施下列侵犯商业秘密的行为：（一）以盗窃、贿赂、欺诈、胁迫、电子侵入或者其他不正当手段获取权利人的商业秘密；（二）披露、使用或者允许他人使用以前项手段获取的权利人的商业秘密；（三）违反保密义务或者违反权利人有关保守商业秘密的要求，披露、使用或者允许他人使用其所掌握的商业秘密；（四）教唆、引诱、帮助他人违反保密义务或者违反权利人有关保守商业秘密的要求，获取、披露、使用或者允许他人使用权利人的商业秘密。本法所称的商业秘密，是指不为公众所知悉、具有商业价值并经权利人采取相应保密措施的技术信息、经营信息等商业信息。',
      '第17条': '经营者违反本法规定，给他人造成损害的，应当依法承担民事责任。因不正当竞争行为受到损害的经营者的赔偿数额，按照其因被侵权所受到的实际损失确定；实际损失难以计算的，按照侵权人因侵权所获得的利益确定。经营者恶意实施侵犯商业秘密行为，情节严重的，可以在按照上述方法确定数额的一倍以上五倍以下确定赔偿数额。',
    },
  },
  copyright_law: {
    id: 'copyright_law',
    name: '中华人民共和国著作权法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2020-11-11',
    effectiveDate: '2021-06-01',
    isRepealed: false,
    scope: '全国范围内适用，保护文学、艺术和科学作品作者的著作权，以及与著作权有关的权益',
    articleIndex: {
      '第3条': '本法所称的作品，是指文学、艺术和科学领域内具有独创性并能以一定形式表现的智力成果，包括：（一）文字作品；（二）口述作品；（三）音乐、戏剧、曲艺、舞蹈、杂技艺术作品；（四）美术、建筑作品；（五）摄影作品；（六）视听作品；（七）工程设计图、产品设计图、地图、示意图等图形作品和模型作品；（八）计算机软件；（九）符合作品特征的其他智力成果。',
      '第17条': '视听作品中的电影作品、电视剧作品的著作权由制作者享有，但编剧、导演、摄影、作词、作曲等作者享有署名权，并有权按照与制作者签订的合同获得报酬。',
      '第18条': '自然人为完成法人或者非法人组织工作任务所创作的作品是职务作品，除本条第二款的规定以外，著作权由作者享有，但法人或者非法人组织有权在其业务范围内优先使用。',
      '第19条': '受委托创作的作品，著作权的归属由委托人和受托人通过合同约定。合同未作明确约定或者没有订立合同的，著作权属于受托人。',
    },
  },
  patent_law: {
    id: 'patent_law',
    name: '中华人民共和国专利法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2020-10-17',
    effectiveDate: '2021-06-01',
    isRepealed: false,
    scope: '全国范围内适用，保护发明创造专利权，鼓励发明创造，推动发明创造的应用',
    articleIndex: {
      '第6条': '执行本单位的任务或者主要是利用本单位的物质技术条件所完成的发明创造为职务发明创造。职务发明创造申请专利的权利属于该单位，申请被批准后，该单位为专利权人。',
      '第8条': '两个以上单位或者个人合作完成的发明创造、一个单位或者个人接受其他单位或者个人委托所完成的发明创造，除另有协议的以外，申请专利的权利属于完成或者共同完成的单位或者个人；申请被批准后，申请的单位或者个人为专利权人。',
      '第71条': '侵犯专利权的赔偿数额按照权利人因被侵权所受到的实际损失或者侵权人因侵权所获得的利益确定；权利人的损失或者侵权人获得的利益难以确定的，参照该专利许可使用费的倍数合理确定。对故意侵犯专利权，情节严重的，可以在按照上述方法确定数额的一倍以上五倍以下确定赔偿数额。',
    },
  },
  data_security_law: {
    id: 'data_security_law',
    name: '中华人民共和国数据安全法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2021-06-10',
    effectiveDate: '2021-09-01',
    isRepealed: false,
    scope: '全国范围内适用，规范数据处理活动，保障数据安全，促进数据开发利用',
    articleIndex: {
      '第27条': '开展数据处理活动应当依照法律、法规的规定，建立健全全流程数据安全管理制度，组织开展数据安全教育培训，采取相应的技术措施和其他必要措施，保障数据安全。',
      '第29条': '开展数据处理活动应当加强风险监测，发现数据安全缺陷、漏洞等风险时，应当立即采取补救措施；发生数据安全事件时，应当立即采取处置措施，按照规定及时告知用户并向有关主管部门报告。',
    },
  },
  cybersecurity_law: {
    id: 'cybersecurity_law',
    name: '中华人民共和国网络安全法',
    type: 'law',
    issueAuthority: '全国人民代表大会常务委员会',
    issueDate: '2016-11-07',
    effectiveDate: '2017-06-01',
    isRepealed: false,
    scope: '全国范围内适用，保障网络安全，维护网络空间主权和国家安全、社会公共利益',
    articleIndex: {
      '第21条': '国家实行网络安全等级保护制度。网络运营者应当按照网络安全等级保护制度的要求，履行下列安全保护义务，保障网络免受干扰、破坏或者未经授权的访问，防止网络数据泄露或者被窃取、篡改：（一）制定内部安全管理制度和操作规程，确定网络安全负责人，落实网络安全保护责任；（二）采取防范计算机病毒和网络攻击、网络侵入等危害网络安全行为的技术措施；（三）采取监测、记录网络运行状态、网络安全事件的技术措施，并按照规定留存相关的网络日志不少于六个月；（四）采取数据分类、重要数据备份和加密等措施；（五）法律、行政法规规定的其他义务。',
      '第41条': '网络运营者收集、使用个人信息，应当遵循合法、正当、必要的原则，公开收集、使用规则，明示收集、使用信息的目的、方式和范围，并经被收集者同意。',
      '第42条': '网络运营者不得泄露、篡改、毁损其收集的个人信息；未经被收集者同意，不得向他人提供个人信息。网络运营者应当采取技术措施和其他必要措施，确保其收集的个人信息安全，防止信息泄露、毁损、丢失。',
    },
  },
  contract_law_interpretation: {
    id: 'contract_law_interpretation',
    name: '最高人民法院关于适用《中华人民共和国民法典》合同编通则若干问题的解释',
    type: 'judicial_interpretation',
    issueAuthority: '最高人民法院',
    issueDate: '2023-12-05',
    effectiveDate: '2023-12-05',
    isRepealed: false,
    scope: '全国范围内适用，指导人民法院正确审理合同纠纷案件',
    articleIndex: {
      '第1条': '人民法院依据民法典第一百四十二条第一款的规定确定争议条款的含义时，应当考虑争议条款所使用的词句的通常含义、结合相关条款、行为的性质和目的、习惯以及诚信原则，按照一个理性人处于相同情境下所理解的含义予以确定。',
      '第6条': '当事人以合同存在漏洞为由主张补充的，人民法院应当适用民法典第五百一十条、第五百一十一条的规定确定当事人的权利义务。',
      '第56条': '当事人一方以对方违约造成的损失属于可得利益损失为由主张赔偿的，人民法院应当综合运用可预见规则、减损规则、损益相抵规则以及过失相抵规则等确定赔偿数额。',
      '第60条': '人民法院在判断是否构成过分高于造成的损失时，应当兼顾合同履行情况、当事人过错程度、交易习惯、预期利益等因素综合确定。约定的违约金超过造成损失的百分之三十的，一般可以认定为过分高于造成的损失。',
    },
  },
  labor_dispute_interpretation: {
    id: 'labor_dispute_interpretation',
    name: '最高人民法院关于审理劳动争议案件适用法律问题的解释（一）',
    type: 'judicial_interpretation',
    issueAuthority: '最高人民法院',
    issueDate: '2020-12-29',
    effectiveDate: '2021-01-01',
    isRepealed: false,
    scope: '全国范围内适用，指导人民法院正确审理劳动争议案件',
    articleIndex: {
      '第36条': '当事人在劳动合同或者保密协议中约定了竞业限制，但未约定解除或者终止劳动合同后给予劳动者经济补偿，劳动者履行了竞业限制义务，要求用人单位按照劳动者在劳动合同解除或者终止前十二个月平均工资的30%按月支付经济补偿的，人民法院应予支持。前款规定的月平均工资的30%低于劳动合同履行地最低工资标准的，按照劳动合同履行地最低工资标准支付。',
      '第37条': '当事人在劳动合同或者保密协议中约定了竞业限制和经济补偿，当事人解除劳动合同时，除另有约定外，用人单位要求劳动者履行竞业限制义务，或者劳动者履行了竞业限制义务后要求用人单位支付经济补偿的，人民法院应予支持。',
      '第38条': '当事人在劳动合同或者保密协议中约定了竞业限制和经济补偿，劳动合同解除或者终止后，因用人单位的原因导致三个月未支付经济补偿，劳动者请求解除竞业限制约定的，人民法院应予支持。',
    },
  },
};

export interface RegulationMatchPattern {
  keywords: string[];
  riskTypes: string[];
  regulationReferences: {
    regulationId: string;
    articleNumber: string;
    relevance: RelevanceType;
  }[];
}

export const REGULATION_MATCH_PATTERNS: RegulationMatchPattern[] = [
  {
    keywords: ['个人信息', '个人数据', '隐私数据', '个人信息保护', '数据隐私'],
    riskTypes: ['compliance'],
    regulationReferences: [
      { regulationId: 'pipa_law', articleNumber: '第4条', relevance: 'directly_applicable' },
      { regulationId: 'pipa_law', articleNumber: '第5条', relevance: 'related' },
      { regulationId: 'pipa_law', articleNumber: '第6条', relevance: 'related' },
      { regulationId: 'pipa_law', articleNumber: '第13条', relevance: 'directly_applicable' },
      { regulationId: 'pipa_law', articleNumber: '第21条', relevance: 'directly_applicable' },
      { regulationId: 'pipa_law', articleNumber: '第51条', relevance: 'directly_applicable' },
      { regulationId: 'data_security_law', articleNumber: '第27条', relevance: 'related' },
      { regulationId: 'cybersecurity_law', articleNumber: '第41条', relevance: 'related' },
    ],
  },
  {
    keywords: ['数据安全', '数据泄露', '数据丢失', '数据保护', '信息安全'],
    riskTypes: ['compliance'],
    regulationReferences: [
      { regulationId: 'data_security_law', articleNumber: '第27条', relevance: 'directly_applicable' },
      { regulationId: 'data_security_law', articleNumber: '第29条', relevance: 'directly_applicable' },
      { regulationId: 'pipa_law', articleNumber: '第51条', relevance: 'directly_applicable' },
      { regulationId: 'pipa_law', articleNumber: '第57条', relevance: 'directly_applicable' },
      { regulationId: 'cybersecurity_law', articleNumber: '第21条', relevance: 'related' },
      { regulationId: 'cybersecurity_law', articleNumber: '第42条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['竞业限制', '竞业禁止', '不从事竞争', '相竞争的业务', '同业竞争'],
    riskTypes: ['compliance', 'inequality'],
    regulationReferences: [
      { regulationId: 'labor_law', articleNumber: '第23条', relevance: 'directly_applicable' },
      { regulationId: 'labor_law', articleNumber: '第24条', relevance: 'directly_applicable' },
      { regulationId: 'labor_law', articleNumber: '第25条', relevance: 'related' },
      { regulationId: 'labor_dispute_interpretation', articleNumber: '第36条', relevance: 'directly_applicable' },
      { regulationId: 'labor_dispute_interpretation', articleNumber: '第37条', relevance: 'related' },
      { regulationId: 'labor_dispute_interpretation', articleNumber: '第38条', relevance: 'related' },
      { regulationId: 'anti_unfair_competition_law', articleNumber: '第9条', relevance: 'related' },
    ],
  },
  {
    keywords: ['知识产权', '著作权', '版权', '专利', '商标', '技术成果', '软件著作权'],
    riskTypes: ['compliance', 'inequality'],
    regulationReferences: [
      { regulationId: 'copyright_law', articleNumber: '第3条', relevance: 'related' },
      { regulationId: 'copyright_law', articleNumber: '第17条', relevance: 'directly_applicable' },
      { regulationId: 'copyright_law', articleNumber: '第18条', relevance: 'directly_applicable' },
      { regulationId: 'copyright_law', articleNumber: '第19条', relevance: 'directly_applicable' },
      { regulationId: 'patent_law', articleNumber: '第6条', relevance: 'directly_applicable' },
      { regulationId: 'patent_law', articleNumber: '第8条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第845条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第847条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第848条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第861条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['保密', '商业秘密', '保密信息', '保密义务', '涉密'],
    riskTypes: ['compliance', 'missing', 'inequality'],
    regulationReferences: [
      { regulationId: 'anti_unfair_competition_law', articleNumber: '第9条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第509条', relevance: 'related' },
      { regulationId: 'labor_law', articleNumber: '第23条', relevance: 'related' },
    ],
  },
  {
    keywords: ['违约责任', '违约金', '赔偿损失', '损害赔偿'],
    riskTypes: ['ambiguity', 'missing', 'inequality'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第577条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第578条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第584条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第585条', relevance: 'directly_applicable' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第60条', relevance: 'directly_applicable' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第56条', relevance: 'related' },
    ],
  },
  {
    keywords: ['管辖', '法院', '诉讼', '仲裁', '争议解决'],
    riskTypes: ['ambiguity', 'missing'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第470条', relevance: 'directly_applicable' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第1条', relevance: 'related' },
    ],
  },
  {
    keywords: ['甲方有权', '甲方可以', '甲方可随时', '乙方必须', '乙方应当', '乙方应', '乙方需'],
    riskTypes: ['inequality'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第4条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第5条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第6条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第496条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第497条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['所有知识产权', '全部知识产权', '一切知识产权', '所有权利'],
    riskTypes: ['inequality'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第847条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第861条', relevance: 'directly_applicable' },
      { regulationId: 'copyright_law', articleNumber: '第19条', relevance: 'directly_applicable' },
      { regulationId: 'patent_law', articleNumber: '第8条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['另行协商', '另行约定', '双方协商', '协商确定', '另行确定'],
    riskTypes: ['ambiguity'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第470条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第509条', relevance: 'related' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第6条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['尽合理努力', '合理努力', '尽力', '尽可能', '合理的', '适当的', '相关的', '相应的', '必要的', '妥善保管', '妥善处理'],
    riskTypes: ['ambiguity'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第6条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第7条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第509条', relevance: 'directly_applicable' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第1条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['合同有效期内', '合同期内', '自动终止', '自动解除'],
    riskTypes: ['missing'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第502条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第584条', relevance: 'related' },
      { regulationId: 'anti_unfair_competition_law', articleNumber: '第9条', relevance: 'related' },
    ],
  },
  {
    keywords: ['50%', '百分之五十', '预付款', '一次性支付', '全部付清', '一次性付清'],
    riskTypes: ['inequality'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第6条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第509条', relevance: 'related' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第60条', relevance: 'related' },
    ],
  },
  {
    keywords: ['不得', '禁止', '严禁'],
    riskTypes: ['inequality'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第4条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第6条', relevance: 'directly_applicable' },
      { regulationId: 'labor_law', articleNumber: '第25条', relevance: 'related' },
    ],
  },
  {
    keywords: ['任何一方', '双方均可', '双方均有权'],
    riskTypes: ['ambiguity'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第577条', relevance: 'related' },
      { regulationId: 'civil_code', articleNumber: '第585条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['承担违约责任', '承担相应责任'],
    riskTypes: ['ambiguity'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第577条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第584条', relevance: 'directly_applicable' },
      { regulationId: 'civil_code', articleNumber: '第585条', relevance: 'directly_applicable' },
    ],
  },
  {
    keywords: ['提交法院', '向法院起诉', '诉讼解决'],
    riskTypes: ['ambiguity'],
    regulationReferences: [
      { regulationId: 'civil_code', articleNumber: '第470条', relevance: 'directly_applicable' },
      { regulationId: 'contract_law_interpretation', articleNumber: '第1条', relevance: 'related' },
    ],
  },
];

export function getRegulationReference(
  regulationId: string,
  articleNumber: string
): { regulation: RegulationItem | undefined; articleContent: string } {
  const regulation = REGULATIONS[regulationId];
  if (!regulation) {
    return { regulation: undefined, articleContent: '' };
  }
  const articleContent = regulation.articleIndex[articleNumber] || '法条内容未收录';
  return { regulation, articleContent };
}

export function getRegulationTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    law: '法律',
    regulation: '法规',
    judicial_interpretation: '司法解释',
    administrative_regulation: '行政法规',
  };
  return labels[type] || type;
}

export function getRelevanceLabel(relevance: string): string {
  const labels: Record<string, string> = {
    directly_applicable: '直接适用',
    related: '相关参考',
    reference: '参考适用',
  };
  return labels[relevance] || relevance;
}

export function findRegulationReferences(
  clauseContent: string,
  riskType: string,
  regulations: Record<string, RegulationItem> = REGULATIONS,
  matchPatterns: RegulationMatchPattern[] = REGULATION_MATCH_PATTERNS
): RegulationReference[] {
  const references: RegulationReference[] = [];
  const addedRefs = new Set<string>();

  for (const pattern of matchPatterns) {
    if (!pattern.riskTypes.includes(riskType)) {
      continue;
    }

    const keywordMatch = pattern.keywords.some(function(keyword) {
      return clauseContent.includes(keyword);
    });
    if (!keywordMatch) {
      continue;
    }

    for (const ref of pattern.regulationReferences) {
      const refKey = ref.regulationId + '-' + ref.articleNumber;
      if (addedRefs.has(refKey)) {
        continue;
      }
      addedRefs.add(refKey);

      const regulation = regulations[ref.regulationId];
      if (!regulation || regulation.isRepealed) {
        continue;
      }

      const articleContent = regulation.articleIndex[ref.articleNumber] || '法条内容未收录';

      references.push({
        regulationId: ref.regulationId,
        articleNumber: ref.articleNumber,
        articleContent: articleContent,
        relevance: ref.relevance,
      });
    }
  }

  const order: Record<string, number> = {
    directly_applicable: 0,
    related: 1,
    reference: 2,
  };

  return references.sort(function(a, b) {
    return order[a.relevance] - order[b.relevance];
  });
}
