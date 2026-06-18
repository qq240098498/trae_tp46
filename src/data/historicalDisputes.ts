import type { HistoricalDisputeCase } from '@/types';

export const HISTORICAL_DISPUTE_CASES: HistoricalDisputeCase[] = [
  {
    id: 'case-001',
    caseNumber: '(2023)京01民终8567号',
    caseName: '北京某科技公司与某软件开发公司服务合同纠纷案',
    caseType: 'second_instance',
    court: '北京市第一中级人民法院',
    trialDate: '2023-11-15',
    verdictType: 'partial_win',
    caseSummary: '科技公司委托软件公司开发系统，合同约定"具体需求另行协商确定"。开发过程中双方对需求范围产生争议，科技公司认为软件公司交付内容不符合预期，诉请解除合同并返还预付款。',
    disputeClauseContent: '具体的开发内容、交付时间和验收标准由双方另行协商确定。乙方应尽合理努力完成相关工作。',
    disputedIssues: [
      '"另行协商确定"的条款是否构成有效约定',
      '服务范围不明确时的举证责任分配',
      '"尽合理努力"的履约标准认定'
    ],
    courtOpinion: '法院认为，合同中约定"另行协商确定"但未约定协商不成时的处理方式，属于约定不明。根据《民法典》第510条，应结合合同相关条款和交易习惯确定。本案中，双方在合同签订前的沟通记录可作为确定需求范围的参考，但因约定过于模糊，双方均存在过错。"尽合理努力"系原则性表述，无法作为判断是否履约的具体标准，应根据行业通常标准及合同目的综合认定。',
    judgmentResult: '判决解除合同，软件公司返还60%已收款项；科技公司对需求范围不清导致的损失自行承担40%责任。',
    practicalGuidance: '建议将具体需求内容、验收标准等作为合同附件详细列明，避免使用"另行协商"等模糊表述；履约标准应采用可量化的具体指标，如"按期完成并通过验收"而非"尽合理努力"。',
    clausePatterns: ['另行协商', '另行约定', '双方协商', '协商确定', '尽合理努力', '合理努力', '尽力', '尽可能'],
    relatedCategories: ['scope'],
    riskTypes: ['ambiguity'],
  },
  {
    id: 'case-002',
    caseNumber: '(2023)沪02民终3421号',
    caseName: '上海某贸易公司与某信息技术公司买卖合同纠纷案',
    caseType: 'second_instance',
    court: '上海市第二中级人民法院',
    trialDate: '2023-08-22',
    verdictType: 'plaintiff_win',
    caseSummary: '贸易公司向信息技术公司支付50%预付款用于采购定制设备，合同约定"余款在项目完成后一次性支付"。后信息技术公司逾期交付且质量不达标，贸易公司诉请解除合同并返还预付款。',
    disputeClauseContent: '甲方应在合同签订后支付50%预付款，余款在项目完成后一次性支付。',
    disputedIssues: [
      '50%预付款比例是否合理',
      '"项目完成"作为付款条件是否明确',
      '收款方违约时预付款的返还问题'
    ],
    courtOpinion: '法院认为，虽然50%预付款比例系双方自愿约定，但结合定制设备采购的行业惯例，该比例偏高。"项目完成"未明确验收标准，应按国家标准或行业标准认定。信息技术公司既未按期交付，交付物也无法通过基本功能测试，构成根本违约，应返还全部预付款并支付违约金。',
    judgmentResult: '判决解除合同，信息技术公司全额返还预付款50万元，并按合同总价款15%支付违约金7.5万元。',
    practicalGuidance: '建议采用里程碑式分期付款，预付款比例一般不超过30%；尾款支付应与验收合格等明确节点挂钩；同时约定收款方违约时预付款的双倍返还或违约金计算方式。',
    clausePatterns: ['50%', '百分之五十', '一次性支付', '全部付清', '一次性付清', '预付款'],
    relatedCategories: ['payment'],
    riskTypes: ['inequality'],
  },
  {
    id: 'case-003',
    caseNumber: '(2024)粤0305民初1234号',
    caseName: '深圳某科技公司诉某软件企业知识产权权属纠纷案',
    caseType: 'first_instance',
    court: '深圳市南山区人民法院',
    trialDate: '2024-03-10',
    verdictType: 'partial_win',
    caseSummary: '科技公司委托软件企业定制开发管理系统，合同约定"所有知识产权归甲方所有"。后软件企业将开发过程中使用的通用模块许可给第三方使用，科技公司诉请认定通用模块侵权。',
    disputeClauseContent: '乙方在履行本合同过程中产生的所有知识产权归甲方所有。',
    disputedIssues: [
      '"所有知识产权"的范围界定',
      '定制开发部分与通用组件的区分',
      '开发方原有技术的保护'
    ],
    courtOpinion: '法院认为，"所有知识产权归甲方所有"的约定过于绝对。应区分定制开发部分和开发方原有技术、通用组件：定制开发部分的著作权按约定归委托方所有；开发方在合同签订前已拥有的通用组件、开发工具和方法论，其知识产权仍归开发方所有，委托方仅享有使用权。软件企业许可第三方使用的通用模块系其原有技术，不构成侵权。',
    judgmentResult: '判决定制开发部分软件著作权归科技公司所有；驳回科技公司关于通用模块侵权的诉讼请求。',
    practicalGuidance: '建议明确区分定制开发成果和开发方原有知识产权的归属；定制开发部分归委托方所有，开发方原有技术、通用组件仍归开发方所有，委托方享有非排他性使用权；同时约定开发方保证交付成果不侵犯第三方知识产权。',
    clausePatterns: ['所有知识产权', '全部知识产权', '一切知识产权', '所有权利', '知识产权归'],
    relatedCategories: ['ip'],
    riskTypes: ['inequality'],
  },
  {
    id: 'case-004',
    caseNumber: '(2023)苏01民终5678号',
    caseName: '南京某生物医药公司与某数据科技公司保密义务纠纷案',
    caseType: 'second_instance',
    court: '江苏省南京市中级人民法院',
    trialDate: '2023-09-28',
    verdictType: 'plaintiff_win',
    caseSummary: '生物医药公司委托数据科技公司处理临床试验数据，合同约定保密期限为"合同有效期内"。合同终止后，数据科技公司将知悉的临床试验信息披露给其关联公司，生物医药公司诉请违反保密义务。',
    disputeClauseContent: '保密期限为合同有效期内。',
    disputedIssues: [
      '商业秘密的保密期限是否因合同到期而终止',
      '仅约定"合同有效期内"的保密期限效力',
      '合同终止后的保密义务认定'
    ],
    courtOpinion: '法院认为，商业秘密的保密义务具有法定性和延续性，不因合同到期而当然终止。合同虽约定保密期限为"合同有效期内"，但根据《反不正当竞争法》及诚实信用原则，知悉商业秘密的一方在合同终止后仍应承担保密义务，直至相关信息公开。数据科技公司在合同终止后披露保密信息构成不正当竞争。',
    judgmentResult: '判决数据科技公司停止披露保密信息，赔偿生物医药公司经济损失80万元及合理维权费用12万元。',
    practicalGuidance: '建议保密期限约定为"自保密信息披露之日起X年，或直至该信息公开为止（以较长者为准）"；明确约定合同终止后保密义务仍然有效；同时约定违反保密义务的违约金计算方式，如违约金不低于合同总价款的X倍。',
    clausePatterns: ['合同有效期内', '合同期内', '保密期限', '保密义务'],
    relatedCategories: ['confidentiality'],
    riskTypes: ['missing'],
  },
  {
    id: 'case-005',
    caseNumber: '(2022)最高法民申7890号',
    caseName: '某建设工程公司与某房地产开发公司违约损害赔偿纠纷案',
    caseType: 'retrial',
    court: '最高人民法院',
    trialDate: '2022-12-18',
    verdictType: 'partial_win',
    caseSummary: '建设工程合同约定"任何一方违反本合同约定，应承担违约责任"。建设公司逾期交付工程60天，开发公司诉请支付逾期违约金，建设公司以违约责任约定不明抗辩。',
    disputeClauseContent: '任何一方违反本合同约定，应承担违约责任。',
    disputedIssues: [
      '仅约定"承担违约责任"是否具有可执行性',
      '违约责任约定不明时的损失计算',
      '逾期交付的违约金标准认定'
    ],
    courtOpinion: '法院认为，合同仅约定"承担违约责任"属于对违约责任承担方式约定不明，根据《民法典》第582条、584条，应参照履行情况、合同性质及行业惯例确定损失赔偿范围。本案中，逾期交付工程确实给开发公司造成了资金占用损失和延期交付业主的赔偿损失，应按中国人民银行同期同类贷款利率上浮30%计算逾期违约金。',
    judgmentResult: '改判建设工程公司按工程总价款日万分之三的标准支付逾期交付违约金共计126万元。',
    practicalGuidance: '建议针对不同违约情形（逾期交付、质量不合格、单方解除等）分别约定具体的违约金计算方式，如"逾期交付的，每逾期一日按合同总价款的万分之五支付违约金"；同时明确损失赔偿范围包括直接损失和间接损失。',
    clausePatterns: ['承担违约责任', '承担相应责任', '任何一方违反', '违反本合同约定'],
    relatedCategories: ['liability'],
    riskTypes: ['ambiguity'],
  },
  {
    id: 'case-006',
    caseNumber: '(2023)浙01民终2345号',
    caseName: '杭州某制造公司与某物流有限公司管辖异议案',
    caseType: 'second_instance',
    court: '浙江省杭州市中级人民法院',
    trialDate: '2023-05-12',
    verdictType: 'defendant_win',
    caseSummary: '制造公司与物流公司签订运输合同，约定"发生争议提交法院诉讼解决"。制造公司向其所在地法院起诉，物流公司提出管辖异议。',
    disputeClauseContent: '因本合同引起的争议，双方应友好协商解决。协商不成的，提交法院诉讼解决。',
    disputedIssues: [
      '"提交法院诉讼解决"是否构成有效管辖约定',
      '约定不明时的法定管辖适用',
      '合同履行地的认定'
    ],
    courtOpinion: '法院认为，合同仅约定"提交法院诉讼解决"未明确具体管辖法院，属于管辖约定不明，该约定无效。应适用法定管辖规则，由被告住所地或合同履行地法院管辖。本案运输合同的履行地为收货地（被告所在地），且被告住所地亦非原告所在地，故裁定移送被告所在地法院审理。',
    judgmentResult: '裁定撤销一审裁定，本案移送被告住所地（宁波市鄞州区人民法院）审理。',
    practicalGuidance: '建议明确约定管辖法院为"甲方所在地有管辖权的人民法院"或合同履行地、签订地等与争议有实际联系地点的法院；考虑到执行便利性，建议约定为己方所在地法院管辖。',
    clausePatterns: ['提交法院', '向法院起诉', '诉讼解决', '法院诉讼'],
    relatedCategories: ['dispute'],
    riskTypes: ['ambiguity'],
  },
  {
    id: 'case-007',
    caseNumber: '(2023)京04民终1123号',
    caseName: '某互联网公司与李某个人信息保护纠纷案',
    caseType: 'second_instance',
    court: '北京市第四中级人民法院',
    trialDate: '2023-10-20',
    verdictType: 'plaintiff_win',
    caseSummary: '李某将用户信息处理业务外包给互联网公司，合同仅约定"乙方应妥善保管甲方提供的数据资料"。后互联网公司发生数据泄露，致使用户起诉李某赔偿。李某向互联网公司追偿。',
    disputeClauseContent: '乙方应妥善保管甲方提供的数据资料，不得用于本合同以外的目的。',
    disputedIssues: [
      '"妥善保管"的认定标准',
      '个人信息处理者与受托处理方的责任划分',
      '数据泄露时的举证责任分配'
    ],
    courtOpinion: '法院认为，本案涉及个人信息处理，根据《个人信息保护法》第21条，受托处理方应按照约定处理个人信息并采取安全措施。合同仅约定"妥善保管"未明确具体标准，互联网公司作为专业数据处理公司，应采取符合行业标准的加密、访问控制等技术措施。互联网公司未举证证明采取了充分的安全措施，应承担数据泄露的全部赔偿责任。',
    judgmentResult: '判决互联网公司赔偿李某已向用户支付的赔偿金158万元、行政处罚罚款45万元及其他合理费用12万元。',
    practicalGuidance: '涉及个人信息处理的，应明确约定：1)双方的法律角色（处理者/受托处理者）；2)处理的目的、方式、范围；3)具体的数据安全保障措施（加密、备份、访问控制等）；4)数据泄露时的通知时限（建议24小时内）和责任承担方式。',
    clausePatterns: ['妥善保管', '妥善处理', '个人信息', '个人数据', '隐私数据', '数据资料'],
    relatedCategories: ['privacy'],
    riskTypes: ['compliance'],
  },
  {
    id: 'case-008',
    caseNumber: '(2023)沪0115民初6789号',
    caseName: '某科技公司与王某竞业限制纠纷案',
    caseType: 'first_instance',
    court: '上海市浦东新区人民法院',
    trialDate: '2023-07-05',
    verdictType: 'defendant_win',
    caseSummary: '科技公司与员工王某在劳动合同外另行签订《服务合作协议》，约定"乙方保证在合同履行期间及合同终止后，不从事任何与甲方业务相竞争的活动"，未约定经济补偿。王某离职后加入竞争企业，科技公司诉请履行竞业限制义务。',
    disputeClauseContent: '乙方保证在合同履行期间及合同终止后，不从事任何与甲方业务相竞争的活动。',
    disputedIssues: [
      '未约定经济补偿的竞业限制条款效力',
      '"不从事相竞争活动"的范围界定',
      '竞业限制期限的合理性'
    ],
    courtOpinion: '法院认为，根据《劳动合同法》第23、24条，竞业限制仅适用于特定劳动者（高管、高技、保密人员），且应约定经济补偿。本案中，《服务合作协议》虽名为合作协议，但实际构成劳动关系，王某系普通技术人员，不属于法定竞业限制适用主体范围。且条款未约定经济补偿，也未明确竞业限制的具体范围、地域和期限（仅约定"合同终止后"未约定具体期限），约定过于宽泛，该竞业限制条款应属无效。',
    judgmentResult: '判决驳回科技公司全部诉讼请求，认定竞业限制条款无效。',
    practicalGuidance: '1) 如为劳动者竞业限制，应明确适用对象（法定三类人员）、期限（不超过2年）、范围（具体业务+地域）、经济补偿标准（不低于离职前月均工资30%且不低于当地最低工资）；2) 如为企业间合作，建议表述为"不得为与本合同项下业务相同或相似的第三方提供相同或类似服务"，期限合理（一般6个月-1年），同时约定违约责任。',
    clausePatterns: ['竞业限制', '竞业禁止', '不从事竞争', '相竞争的业务', '相竞争的活动'],
    relatedCategories: ['non-compete'],
    riskTypes: ['compliance'],
  },
  {
    id: 'case-009',
    caseNumber: '(2024)川01民终4567号',
    caseName: '成都某文化传播公司与某广告公司合同解除纠纷案',
    caseType: 'second_instance',
    court: '四川省成都市中级人民法院',
    trialDate: '2024-02-15',
    verdictType: 'partial_win',
    caseSummary: '合同约定"有效期一年，合同期满后自动终止"。履行过程中广告公司多次逾期交付成果，文化传播公司在合同期满前15天发函解除合同，广告公司以合同未约定解除权为由抗辩。',
    disputeClauseContent: '本合同自双方签字盖章之日起生效，有效期一年。合同期满后自动终止。',
    disputedIssues: [
      '合同未约定解除权时的法定解除适用',
      '逾期交付是否构成根本违约',
      '合同终止后的善后处理'
    ],
    courtOpinion: '法院认为，合同虽未约定解除条款，但根据《民法典》第563条，当事人一方迟延履行主要债务经催告后在合理期限内仍未履行的，守约方可以解除合同。本案广告公司逾期交付5次，经催告后仍有2次未按期交付，已影响文化传播公司的活动开展，构成根本违约，文化传播公司享有法定解除权。但合同未约定终止后的交接事宜，双方对交接过程中造成的损失各自承担相应责任。',
    judgmentResult: '判决确认合同解除，广告公司退还未履行部分服务费28万元；双方对交接期间的损失各自承担。',
    practicalGuidance: '建议明确约定：1) 合同解除条件（如一方迟延履行超过15日经催告仍不改正的、严重违约的等）；2) 解除程序（书面通知+异议期）；3) 解除后的清算条款（已完成工作量结算、资料返还、保密义务延续等）；4) 合同终止后的资料交接和费用结算时限。',
    clausePatterns: ['自动终止', '自动解除', '有效期一年', '合同期满'],
    relatedCategories: ['term'],
    riskTypes: ['missing'],
  },
  {
    id: 'case-010',
    caseNumber: '(2023)鲁01民终8901号',
    caseName: '某建材集团与某装饰工程公司买卖合同纠纷案',
    caseType: 'second_instance',
    court: '山东省济南市中级人民法院',
    trialDate: '2023-06-30',
    verdictType: 'partial_win',
    caseSummary: '合同约定"乙方必须严格按照甲方要求供货，甲方有权单方解除合同"。履行中建材集团因价格上涨单方解除合同，装饰工程公司认为解除权仅适用于己方违约情形，起诉要求继续履行或赔偿可得利益损失。',
    disputeClauseContent: '乙方必须严格按照甲方要求供货。甲方有权单方解除合同。',
    disputedIssues: [
      '"必须"、"有权"等单方权利义务条款的公平性',
      '单方任意解除权的适用限制',
      '显失公平条款的认定标准'
    ],
    courtOpinion: '法院认为，合同条款仅约定乙方的义务和甲方的单方解除权，未约定甲方的相应义务或乙方在甲方违约时的救济，权利义务明显不对等。甲方在乙方不存在任何违约情形下，仅因价格上涨单方解除合同，属于滥用解除权。根据《民法典》第151条、第497条，该单方解除权条款在甲方非因乙方违约而行使时，应认定为显失公平的格式条款，不发生法律效力。',
    judgmentResult: '判决建材集团继续履行合同；如不履行则赔偿装饰工程公司可得利益损失（按合同履行后可获利润的80%计算）共计145万元。',
    practicalGuidance: '1) 避免使用仅约束单方的"必须"、"应当"等表述，建议使用"双方均应"或在约定单方义务时约定对方的相应义务；2) 单方解除权应约定明确的行使条件（如对方违约且经催告后不改正），避免约定无理由的任意解除权；3) 合同条款应确保双方权利义务对等，避免出现显失公平的约定。',
    clausePatterns: ['乙方必须', '乙方应当', '乙方应', '乙方需', '甲方有权', '甲方可以', '甲方可随时', '单方解除'],
    relatedCategories: ['liability', 'scope'],
    riskTypes: ['inequality'],
  },
  {
    id: 'case-011',
    caseNumber: '(2022)渝05民终5678号',
    caseName: '重庆某汽车零部件公司与某机械制造公司质量纠纷案',
    caseType: 'second_instance',
    court: '重庆市第五中级人民法院',
    trialDate: '2022-11-08',
    verdictType: 'partial_win',
    caseSummary: '合同约定零部件"符合相关质量标准"。交付后零部件出现断裂问题，汽车公司主张不符合GB/TXXXX国家标准，机械公司主张国家标准非强制性且合同未明确约定适用，双方就质量标准产生争议。',
    disputeClauseContent: '乙方交付的产品应符合相关标准，保证质量合格。',
    disputedIssues: [
      '"相关标准"的具体所指',
      '国家标准、行业标准的适用顺序',
      '质量约定不明时的解释规则'
    ],
    courtOpinion: '法院认为，合同约定"符合相关标准"但未明确具体标准编号，属于质量要求约定不明。根据《民法典》第511条，应依次按照强制性国家标准、推荐性国家标准、行业标准履行。本案中GB/TXXXX为推荐性国家标准，但属于该领域最常用的质量标准，汽车行业普遍适用，机械公司作为专业制造商理应知晓，故认定该标准为本案质量标准。产品经鉴定不符合该标准，机械公司应承担质量违约责任。',
    judgmentResult: '判决机械公司接受退货，返还货款320万元并支付鉴定费8万元；汽车公司因未明确约定标准承担部分检测费用2万元。',
    practicalGuidance: '建议明确约定质量标准的具体编号和名称，如"符合GB/TXXXX-XXXX《XX产品通用技术条件》及双方约定的技术附件要求"；同时约定质量验收方法、验收机构和异议期限；对于定制产品，应将详细的技术参数和测试方法作为合同附件。',
    clausePatterns: ['合理的', '适当的', '相关的', '相应的', '必要的', '符合标准', '质量合格'],
    relatedCategories: ['scope'],
    riskTypes: ['ambiguity'],
  },
  {
    id: 'case-012',
    caseNumber: '(2023)闽02民终3421号',
    caseName: '厦门某外贸公司与某货运代理公司保密信息纠纷案',
    caseType: 'second_instance',
    court: '福建省厦门市中级人民法院',
    trialDate: '2023-04-18',
    verdictType: 'partial_win',
    caseSummary: '合同约定"乙方不得擅自使用或向第三方披露甲方商业秘密"。后货运代理公司将外贸公司的客户名单提供给其关联公司使用，外贸公司诉请侵权赔偿。货运代理公司辩称客户名单非商业秘密且未约定保密义务具体范围。',
    disputeClauseContent: '乙方不得擅自使用或向任何第三方披露。',
    disputedIssues: [
      '未明确保密信息范围时商业秘密的认定',
      '客户名单的商业秘密属性',
      '未约定违约责任时的损失赔偿'
    ],
    courtOpinion: '法院认为，虽然合同未明确保密信息的具体范围，但客户名单包含了客户的联系方式、交易习惯、价格敏感度等深度信息，外贸公司采取了一定的保密措施，具有商业价值，应认定为商业秘密。货运代理公司向关联公司披露该客户名单构成侵犯商业秘密。但合同未约定违约金，损失应按实际损失或侵权获利计算，外贸公司举证损失不充分，法院酌情确定赔偿金额。',
    judgmentResult: '判决货运代理公司停止使用客户名单，赔偿外贸公司经济损失35万元及维权费用6万元。',
    practicalGuidance: '建议详细列举保密信息的范围（如"技术信息、经营信息、客户名单、财务数据、采购渠道等"），同时明确保密信息的除外情形（已公开的、接收方事前拥有的、从第三方合法取得的等）；明确约定违反保密义务的违约金金额（建议不低于合同总价款或预期利益），以及举证责任分配。',
    clausePatterns: ['不得擅自使用', '不得向第三方披露', '商业秘密', '保密信息'],
    relatedCategories: ['confidentiality'],
    riskTypes: ['missing'],
  },
];

export function getCaseById(caseId: string): HistoricalDisputeCase | undefined {
  return HISTORICAL_DISPUTE_CASES.find(c => c.id === caseId);
}

export function getCaseTypeLabel(type: string): string {
  const option = [
    { value: 'first_instance', label: '一审' },
    { value: 'second_instance', label: '二审' },
    { value: 'retrial', label: '再审' },
    { value: 'arbitration', label: '仲裁' },
  ].find(o => o.value === type);
  return option?.label || type;
}

export function getVerdictTypeLabel(type: string): string {
  const option = [
    { value: 'plaintiff_win', label: '原告胜诉' },
    { value: 'defendant_win', label: '被告胜诉' },
    { value: 'partial_win', label: '部分胜诉' },
    { value: 'settlement', label: '调解结案' },
  ].find(o => o.value === type);
  return option?.label || type;
}

export function getMatchRelevanceLabel(relevance: string): string {
  const option = [
    { value: 'high', label: '高度相关' },
    { value: 'medium', label: '中度相关' },
    { value: 'low', label: '参考案例' },
  ].find(o => o.value === relevance);
  return option?.label || relevance;
}
