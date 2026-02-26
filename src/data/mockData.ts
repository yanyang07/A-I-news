// ─── Type Definitions ────────────────────────────────────────────────────────

export interface TrendKeyword {
  keyword: string;
  rank: number;
}

export interface TrendScore {
  score: number;
  explanation: string;
}

export interface NewsItem {
  id: string;
  site: string;
  title: string;
  summary: string;
  publishedDate: string;
  aiGeneratedInsight: string;
  /** First item is the primary link used for title click-through */
  sourceLinks: string[];
  tags: {
    technology: string[];
    people: string[];
    company: string[];
  };
}

export interface DailyData {
  date: string;
  headline: string;
  aiInsight?: string;
  summary: string;
  trendKeywords: TrendKeyword[];
  trendScore: TrendScore;
  newsItems: NewsItem[];
}

// ─── 2026-02-24 ───────────────────────────────────────────────────────────────

const data_20260224: DailyData = {
  date: '2026-02-24',
  headline: 'AI Agent 商业化全面加速，多模态大模型进入实战部署阶段',
  summary: `
今日AI领域呈现出"技术落地"与"生态整合"双轮驱动的态势。

**技术趋势：**
多模态模型（Multimodal LLMs）正在突破单纯的"对话"范畴，向"行动"演进。OpenAI与Anthropic的新动作表明，模型不仅要看懂图像，更要理解物理世界的因果关系，为具身智能（Embodied AI）铺平道路。

**公司动态：**
Anthropic发布的Claude 4系列在代码生成与逻辑推理上再次刷新SOTA，特别是在长上下文（Long Context）的准确性上表现惊人。与此同时，Google DeepMind整合了Gemini与机器人团队，试图在物理世界复刻ChatGPT时刻。

**资本动向：**
硅谷风投正在从"基础模型"转向"垂直应用"。今日两笔过亿美元融资均流向了专注于法律与医疗领域的AI Agent初创公司，显示出资本市场对通用大模型"赢家通吃"格局的默认，以及对垂直场景变现能力的渴望。

**人物观点：**
Sam Altman在最新的访谈中暗示，算力瓶颈可能比预期更早到来，但算法效率的提升将成为新的摩尔定律。
`,
  trendKeywords: [
    { keyword: 'AI Agent', rank: 1 },
    { keyword: 'Multimodal', rank: 2 },
    { keyword: 'Claude 4', rank: 3 },
    { keyword: 'GPT-5', rank: 4 },
    { keyword: 'Open Source LLM', rank: 5 },
    { keyword: 'AI Coding', rank: 6 },
    { keyword: 'Enterprise AI', rank: 7 },
    { keyword: 'RLHF', rank: 8 },
    { keyword: 'AI Regulation', rank: 9 },
    { keyword: 'Embodied AI', rank: 10 },
  ],
  trendScore: {
    score: 82,
    explanation:
      '本日AI行业活跃度极高。Anthropic发布Claude 4系列，OpenAI推出GPT-5 Turbo，Google DeepMind在机器人领域取得突破，多家公司宣布AI Agent商业化产品。技术突破与商业落地并行推进，行业格局正在快速重塑。',
  },
  newsItems: [
    {
      id: '1',
      site: 'Anthropic',
      title: 'Introducing Claude 4: The New Standard for Reasoning and Coding',
      summary:
        'Anthropic正式发布Claude 4模型家族，包含Haiku、Sonnet与Opus三个版本。新模型在MathVista与HumanEval测试中全面超越GPT-4，并引入了"思维链可视化"功能。',
      publishedDate: '2026-02-24 09:00',
      aiGeneratedInsight:
        'Claude 4的发布标志着大模型竞争进入"精准度"与"可解释性"的新阶段。其在代码生成领域的统治力将对GitHub Copilot等产品构成直接威胁，同时也为企业级自动化Agent提供了更可靠的大脑。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Reasoning', 'Coding'],
        people: ['Dario Amodei'],
        company: ['Anthropic'],
      },
    },
    {
      id: '2',
      site: 'Anthropic',
      title: 'Constitutional AI v2: Safer and More Aligned Models',
      summary:
        'Anthropic更新了其宪法AI（Constitutional AI）框架，引入了动态原则调整机制，使模型在处理敏感话题时更加灵活且符合人类价值观。',
      publishedDate: '2026-02-24 10:30',
      aiGeneratedInsight:
        '安全对齐（Alignment）不再是单纯的限制，而是成为了产品差异化的核心竞争力。这将推动行业从RLHF向更自动化的RLAIF（Reinforcement Learning from AI Feedback）转型。',
      sourceLinks: [],
      tags: {
        technology: ['Safety', 'RLAIF', 'Alignment'],
        people: [],
        company: ['Anthropic'],
      },
    },
    {
      id: '3',
      site: 'OpenAI',
      title: 'GPT-5 Turbo Preview is now available for Enterprise customers',
      summary:
        'OpenAI突袭发布GPT-5 Turbo预览版，推理速度提升3倍，价格降低50%。新模型原生支持视频理解与生成，上下文窗口扩展至200k。',
      publishedDate: '2026-02-24 08:15',
      aiGeneratedInsight:
        'OpenAI正在通过极致的性价比构建护城河。原生视频能力的加入意味着多模态交互将成为2026年SaaS产品的标配，视频编辑与内容创作行业将迎来新一轮洗牌。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Multimodal', 'Video Gen'],
        people: ['Sam Altman'],
        company: ['OpenAI'],
      },
    },
    {
      id: '4',
      site: 'OpenAI',
      title: 'Sora 2.0: Real-time World Simulation',
      summary:
        'Sora 2.0展示了实时物理世界模拟能力，不仅能生成视频，还能预测物体的物理属性与交互结果，被视为迈向通用世界模型（World Model）的关键一步。',
      publishedDate: '2026-02-24 14:00',
      aiGeneratedInsight:
        'Sora 2.0不仅是视频工具，更是物理模拟器。这对自动驾驶、机器人训练以及游戏开发具有革命性意义，数据合成（Synthetic Data）的价值将进一步放大。',
      sourceLinks: [],
      tags: {
        technology: ['Video Gen', 'World Model', 'Simulation'],
        people: ['Greg Brockman'],
        company: ['OpenAI'],
      },
    },
    {
      id: '5',
      site: 'Google',
      title: 'Gemini 1.5 Pro updates: 10M context window and Agent capabilities',
      summary:
        'Google宣布Gemini 1.5 Pro上下文窗口突破1000万token，几乎可以吞下整个代码库或数小时的高清视频。同时发布了基于Gemini的自主Agent框架。',
      publishedDate: '2026-02-24 11:45',
      aiGeneratedInsight:
        '千万级Context Window彻底改变了RAG（检索增强生成）的玩法。企业知识库的构建成本将大幅降低，"全量数据直接推理"可能成为新的技术范式。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Long Context', 'Agent'],
        people: ['Demis Hassabis'],
        company: ['Google', 'DeepMind'],
      },
    },
    {
      id: '6',
      site: 'Google',
      title: 'Project Astra: The Universal Assistant for Daily Life',
      summary:
        'Google演示了Project Astra的最新进展，这款多模态助手能通过手机摄像头实时识别物体、解答问题并执行复杂指令，响应延迟低于300ms。',
      publishedDate: '2026-02-24 13:20',
      aiGeneratedInsight:
        '低延迟与多模态是AI助理走向C端的最后门槛。Google依托Android生态，极有可能在"个人AI助理"这场战争中占据硬件入口的先发优势。',
      sourceLinks: [],
      tags: {
        technology: ['Multimodal', 'Mobile AI', 'Assistant'],
        people: ['Sundar Pichai'],
        company: ['Google'],
      },
    },
    {
      id: '7',
      site: 'X (Twitter)',
      title: 'Elon Musk: Grok 3 will be open sourced next week',
      summary:
        'Elon Musk在X上宣布，xAI将在下周开源Grok 3模型权重。据称该模型在数学与物理推理能力上超越了GPT-4 Turbo。',
      publishedDate: '2026-02-24 16:50',
      aiGeneratedInsight:
        '开源最强模型的承诺将再次搅动开源社区。如果Grok 3如宣传般强大，将迫使Meta的Llama系列加快迭代，开源与闭源的差距将进一步缩小。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Open Source'],
        people: ['Elon Musk'],
        company: ['xAI', 'X'],
      },
    },
    {
      id: '8',
      site: 'HuggingFace',
      title: 'New Open LLM Leaderboard: Llama 4 takes the crown',
      summary:
        'HuggingFace更新了Open LLM Leaderboard评测标准，引入了更复杂的Agent任务与长文本测试。Meta尚未发布的Llama 4早期权重在榜单上登顶。',
      publishedDate: '2026-02-24 15:10',
      aiGeneratedInsight:
        '评测标准的更新反映了行业关注点从"刷榜"转向"实战"。Llama 4的霸榜预示着Meta在开源生态中的盟主地位依然稳固，企业私有化部署将有更强的底座。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Evaluation', 'Open Source'],
        people: ['Clem Delangue'],
        company: ['HuggingFace', 'Meta'],
      },
    },
    {
      id: '9',
      site: 'Meta AI',
      title: 'Yann LeCun: Generative AI is a dead end, World Models are the future',
      summary:
        'Yann LeCun再次抨击自回归LLM，认为它们缺乏对物理世界的真实理解。Meta AI发布了JEPA（Joint Embedding Predictive Architecture）的新研究成果。',
      publishedDate: '2026-02-24 12:00',
      aiGeneratedInsight:
        'LeCun的坚持代表了AI发展的另一条路径。虽然目前Transformer如日中天，但JEPA类架构在能效比与逻辑推理上的潜力，可能是突破当前大模型瓶颈的关键。',
      sourceLinks: [],
      tags: {
        technology: ['World Model', 'JEPA', 'Research'],
        people: ['Yann LeCun', 'Mark Zuckerberg'],
        company: ['Meta'],
      },
    },
  ],
};

// ─── 2026-02-23 ───────────────────────────────────────────────────────────────

const data_20260223: DailyData = {
  date: '2026-02-23',
  headline: '开源模型生态爆发，推理效率成为下一个核心战场',
  summary: `
昨日AI领域的焦点集中在开源生态的迅速崛起与推理效率的极致优化上。

**技术趋势：**
推理（Inference）优化正成为各大厂的新赛点。量化技术（Quantization）与投机采样（Speculative Decoding）的结合，让开源模型在消费级显卡上实现近乎商用的推理质量，极大地降低了部署门槛。

**公司动态：**
Mistral AI宣布开源其最新旗舰模型 Mistral Large 2，模型参数量达到123B，在多语言与代码任务上表现卓越，被誉为"欧洲最强开源模型"。

**资本动向：**
AI基础设施赛道持续火热。Groq宣布完成新一轮6亿美元融资，其自研LPU（Language Processing Unit）芯片的推理速度已是GPU的数十倍，正在重塑AI推理的经济学。

**人物观点：**
Andrej Karpathy发文表示，未来最重要的AI技能不是调模型，而是"数据工程"——高质量的数据集将成为稀缺资产。
`,
  trendKeywords: [
    { keyword: 'Open Source LLM', rank: 1 },
    { keyword: 'Inference Optimization', rank: 2 },
    { keyword: 'Mistral Large', rank: 3 },
    { keyword: 'Speculative Decoding', rank: 4 },
    { keyword: 'AI Infrastructure', rank: 5 },
    { keyword: 'LPU', rank: 6 },
    { keyword: 'Data Engineering', rank: 7 },
    { keyword: 'Quantization', rank: 8 },
    { keyword: 'Edge AI', rank: 9 },
    { keyword: 'Fine-tuning', rank: 10 },
  ],
  trendScore: {
    score: 74,
    explanation:
      '昨日行业热度中等偏高。开源生态的重大发布与推理硬件赛道的巨额融资是两大核心看点。整体偏向基础设施层，应用层相对平静，但为未来的爆发积蓄了势能。',
  },
  newsItems: [
    {
      id: '1',
      site: 'Mistral AI',
      title: 'Mistral Large 2: 123B Open-Source Frontier Model',
      summary:
        'Mistral AI正式开源Mistral Large 2，参数量达123B，支持80+种语言，代码生成能力直追GPT-4。采用Apache 2.0许可证，可免费用于商业用途。',
      publishedDate: '2026-02-23 10:00',
      aiGeneratedInsight:
        '欧洲AI的崛起不再只是口号。Mistral Large 2的开源将迫使国内外企业重新评估闭源模型的溢价，尤其是对于多语言场景，这可能是目前最具性价比的选择。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Open Source', 'Multilingual'],
        people: ['Arthur Mensch'],
        company: ['Mistral AI'],
      },
    },
    {
      id: '2',
      site: 'Groq',
      title: 'Groq raises $600M, LPU inference now 50x faster than GPU',
      summary:
        'AI推理芯片公司Groq完成6亿美元D轮融资，估值达28亿美元。其LPU（Language Processing Unit）在Llama 3推理基准上达到每秒500+ tokens，为GPU的50倍。',
      publishedDate: '2026-02-23 09:30',
      aiGeneratedInsight:
        'Groq的融资是对"推理将成为AI最大成本中心"这一判断的市场验证。LPU路线的成功将动摇英伟达在AI推理市场的垄断地位，AI芯片格局可能加速分化。',
      sourceLinks: [],
      tags: {
        technology: ['AI Chip', 'Inference', 'LPU'],
        people: [],
        company: ['Groq'],
      },
    },
    {
      id: '3',
      site: 'OpenAI',
      title: 'OpenAI launches o3-mini: Ultra-fast reasoning at low cost',
      summary:
        'OpenAI推出o3-mini模型，专为高速推理场景优化，响应延迟降至200ms以内，价格仅为o1的十分之一。特别适合需要快速逻辑推断的Agent应用。',
      publishedDate: '2026-02-23 14:00',
      aiGeneratedInsight:
        '小而快的推理模型将成为AI Agent的"神经系统"。o3-mini的定价策略意在颠覆API调用的经济模型，为高频Agent任务的规模化落地扫清成本障碍。',
      sourceLinks: [],
      tags: {
        technology: ['LLM', 'Reasoning', 'Agent'],
        people: ['Sam Altman'],
        company: ['OpenAI'],
      },
    },
    {
      id: '4',
      site: 'X (Twitter)',
      title: 'Andrej Karpathy: Data Engineering is the new AI superpower',
      summary:
        'Andrej Karpathy在长文中指出，随着模型架构趋于成熟，数据质量与数据工程能力将成为决定AI系统优劣的关键变量，并分享了构建高质量数据集的实践方法。',
      publishedDate: '2026-02-23 18:20',
      aiGeneratedInsight:
        'Karpathy的观点揭示了AI竞争的下一个战场：数据飞轮。拥有高质量专有数据的公司将建立起难以复制的护城河，数据标注与合成数据市场将迎来新一轮爆发。',
      sourceLinks: [],
      tags: {
        technology: ['Data Engineering', 'Fine-tuning', 'Synthetic Data'],
        people: ['Andrej Karpathy'],
        company: [],
      },
    },
    {
      id: '5',
      site: 'Google',
      title: 'Google releases Gemma 3: State-of-the-art small language models',
      summary:
        'Google开源Gemma 3系列小模型（2B/7B/27B），在同等参数量下超越所有现有开源模型。支持在单张消费级显卡上运行，并针对边缘设备进行了深度优化。',
      publishedDate: '2026-02-23 11:00',
      aiGeneratedInsight:
        'Gemma 3的发布是Google对边缘AI市场的战略布局。随着智能手机与IoT设备算力持续提升，端侧AI将成为继云端AI之后的下一个万亿市场。',
      sourceLinks: [],
      tags: {
        technology: ['SLM', 'Edge AI', 'Open Source'],
        people: ['Jeff Dean'],
        company: ['Google'],
      },
    },
    {
      id: '6',
      site: 'HuggingFace',
      title: 'Transformers.js 3.0: Run LLMs natively in the browser',
      summary:
        'HuggingFace发布Transformers.js 3.0，支持在浏览器中本地运行7B以下的语言模型，无需服务器。结合WebGPU加速，推理速度比上一版本提升4倍。',
      publishedDate: '2026-02-23 16:00',
      aiGeneratedInsight:
        '浏览器端LLM的成熟将催生全新的隐私优先AI应用范式。当推理完全在本地完成，数据永不离开设备，这对医疗、法律等高隐私领域具有颠覆性意义。',
      sourceLinks: [],
      tags: {
        technology: ['Browser AI', 'WebGPU', 'On-device AI'],
        people: [],
        company: ['HuggingFace'],
      },
    },
    {
      id: '7',
      site: 'Meta AI',
      title: 'Meta open-sources movie gen: Professional video generation for all',
      summary:
        'Meta开源其Movie Gen视频生成模型，支持生成30秒高清视频，并可根据文字指令精确编辑视频内容。模型权重与训练代码全部公开。',
      publishedDate: '2026-02-23 13:00',
      aiGeneratedInsight:
        'Meta的开源策略正在系统性地瓦解竞争对手的护城河。Movie Gen的开源将加速AI视频工具的商业化，同时也对Sora、Runway等闭源产品构成直接的定价压力。',
      sourceLinks: [],
      tags: {
        technology: ['Video Gen', 'Open Source', 'Multimodal'],
        people: ['Mark Zuckerberg'],
        company: ['Meta'],
      },
    },
  ],
};

// ─── 2026-02-22 ───────────────────────────────────────────────────────────────

const data_20260222: DailyData = {
  date: '2026-02-22',
  headline: 'AI监管框架全球收紧，企业合规成本急剧上升',
  summary: `
本日AI行业受政策面重大消息影响，各方情绪偏向审慎观望。

**技术趋势：**
可解释AI（XAI）与模型审计工具成为新的研究热点，监管压力正在倒逼技术架构的透明化。多家机构发布了用于检测AI幻觉（Hallucination）与偏见（Bias）的评估框架。

**公司动态：**
欧盟AI法案（EU AI Act）正式生效，高风险AI系统的合规窗口期进入倒计时。OpenAI、Google、Meta等公司纷纷发布合规白皮书，争夺监管话语权。

**资本动向：**
AI合规与治理赛道迎来首轮爆发。专注于AI审计、红队测试（Red Teaming）与合规管理的初创公司获得了超过3亿美元的集中融资。

**人物观点：**
Geoffrey Hinton在采访中呼吁建立国际AI安全机构，称当前的自我监管模式"远远不够"，并对超级智能（ASI）的潜在风险表达了严重担忧。
`,
  trendKeywords: [
    { keyword: 'AI Regulation', rank: 1 },
    { keyword: 'EU AI Act', rank: 2 },
    { keyword: 'AI Safety', rank: 3 },
    { keyword: 'Hallucination', rank: 4 },
    { keyword: 'XAI', rank: 5 },
    { keyword: 'Red Teaming', rank: 6 },
    { keyword: 'AI Governance', rank: 7 },
    { keyword: 'Bias Detection', rank: 8 },
    { keyword: 'ASI', rank: 9 },
    { keyword: 'Compliance', rank: 10 },
  ],
  trendScore: {
    score: 61,
    explanation:
      '本日技术层面相对平静，政策面成为主导因素。EU AI Act生效带来的合规压力短期内会增加企业成本，但长期看将推动行业走向更健康的发展轨道。行业整体情绪偏谨慎。',
  },
  newsItems: [
    {
      id: '1',
      site: 'OpenAI',
      title: 'OpenAI releases AI Compliance Framework for Enterprise',
      summary:
        'OpenAI发布企业级AI合规框架，提供了一套针对EU AI Act高风险场景的评估工具与操作指南，帮助企业客户在合规窗口期内完成系统审计。',
      publishedDate: '2026-02-22 09:00',
      aiGeneratedInsight:
        'OpenAI将合规工具化，是将监管压力转化为商业机会的聪明策略。这会加深大客户对OpenAI生态的依赖，同时也为其在监管博弈中积累政治资本。',
      sourceLinks: [],
      tags: {
        technology: ['AI Governance', 'Compliance', 'Safety'],
        people: ['Sam Altman'],
        company: ['OpenAI'],
      },
    },
    {
      id: '2',
      site: 'Google',
      title: 'EU AI Act goes into effect: What it means for AI companies',
      summary:
        'EU AI Act正式生效，要求所有在欧盟市场运营的高风险AI系统在2026年底前完成合规认证。违规企业最高面临全球营收3%的罚款。',
      publishedDate: '2026-02-22 10:30',
      aiGeneratedInsight:
        '欧盟再次通过立法定义全球科技规则。虽然短期合规成本高昂，但统一的监管框架实际上有利于大型平台企业，因为它们有更多资源应对合规挑战，将进一步拉大与中小竞争者的差距。',
      sourceLinks: [],
      tags: {
        technology: ['AI Regulation', 'EU AI Act', 'AI Governance'],
        people: [],
        company: ['Google'],
      },
    },
    {
      id: '3',
      site: 'Anthropic',
      title: 'Anthropic launches Evals Hub: Community-driven AI safety benchmarks',
      summary:
        'Anthropic开放了Evals Hub平台，允许研究者提交自定义的安全评估基准，并与Anthropic合作将优质Evals纳入官方测试套件。首批开放了500个安全场景。',
      publishedDate: '2026-02-22 14:00',
      aiGeneratedInsight:
        'Evals Hub将安全评估转变为社区协作，是一个极具战略价值的举措。它不仅能以较低成本获取多样化的安全测试用例，还能在AI安全研究界建立强大的品牌口碑。',
      sourceLinks: [],
      tags: {
        technology: ['AI Safety', 'Evaluation', 'Red Teaming'],
        people: ['Dario Amodei'],
        company: ['Anthropic'],
      },
    },
    {
      id: '4',
      site: 'X (Twitter)',
      title: 'Geoffrey Hinton calls for international AI safety body',
      summary:
        'AI之父Geoffrey Hinton在TED演讲中警告，当前大型AI公司的自我监管模式存在严重的利益冲突，呼吁成立类似IAEA（国际原子能机构）的AI安全国际机构。',
      publishedDate: '2026-02-22 20:00',
      aiGeneratedInsight:
        'Hinton的呼声代表了学术界对产业界的深层忧虑。虽然国际AI监管机构的建立面临巨大的地缘政治阻力，但这一呼声将加速各国在国内AI安全立法上的竞赛。',
      sourceLinks: [],
      tags: {
        technology: ['AI Safety', 'ASI', 'AI Governance'],
        people: ['Geoffrey Hinton'],
        company: [],
      },
    },
    {
      id: '5',
      site: 'Meta AI',
      title: 'Meta releases Purple Llama: Open-source AI safety toolkit',
      summary:
        'Meta开源Purple Llama安全工具包，包含Llama Guard 3（内容过滤）、CyberSec Eval 3（网络安全评估）与Code Shield（代码安全检测）三大模块。',
      publishedDate: '2026-02-22 11:00',
      aiGeneratedInsight:
        '开源安全工具是Meta开源战略的延伸。通过降低整个行业的安全合规门槛，Meta实际上是在为自己的开源模型生态构建护城河——更安全的开源模型意味着更广泛的商业采用。',
      sourceLinks: [],
      tags: {
        technology: ['AI Safety', 'Open Source', 'Compliance'],
        people: [],
        company: ['Meta'],
      },
    },
  ],
};

// ─── Registry & Exports ───────────────────────────────────────────────────────

/** All available daily data, keyed by date string (YYYY-MM-DD). */
export const allDailyData: Record<string, DailyData> = {
  '2026-02-24': data_20260224,
  '2026-02-23': data_20260223,
  '2026-02-22': data_20260222,
};

/** Sorted list of available dates, newest first. */
export const availableDates: string[] = Object.keys(allDailyData).sort(
  (a, b) => new Date(b).getTime() - new Date(a).getTime()
);
