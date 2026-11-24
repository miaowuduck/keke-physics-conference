export type TopicKey =
  | 'quantum'
  | 'astro'
  | 'photonics'
  | 'condensed'
  | 'cross'
  | 'break'

export type SessionKind = 'talk' | 'opening' | 'break' | 'discussion'

export type Session = {
  id: string
  start: string
  end: string
  kind: SessionKind
  topic: TopicKey
  titleZh: string
  titleEn?: string
  speaker?: string
}

export type EditionId = '2027' | '2026' | '2024'

export type Edition = {
  id: EditionId
  label: string
  short: string
  status: 'upcoming' | 'past'
  dateISO: string
  dateLabel: string
  dateLong: string
  venue: string
  online: string
  intro: string
  stats: { talks: number; span: string; topics: string }
  highlights: string[]
  sessions: Session[]
}

export type Speaker = {
  name: string
  pinyin: string
  edition: EditionId
  topic: TopicKey
  talkZh: string
  talkEn: string
}

export const topics: Record<
  TopicKey,
  { zh: string; en: string; color: string; symbol: string }
> = {
  quantum: {
    zh: '量子计算与模拟',
    en: 'Quantum',
    color: '#7CC4F0',
    symbol: 'circle',
  },
  astro: {
    zh: '天体物理',
    en: 'Astrophysics',
    color: '#F0CE7B',
    symbol: 'triangle',
  },
  photonics: {
    zh: '光子学',
    en: 'Photonics',
    color: '#EB6100',
    symbol: 'diamond',
  },
  condensed: {
    zh: '凝聚态与统计',
    en: 'Condensed matter',
    color: '#E7E4D2',
    symbol: 'square',
  },
  cross: {
    zh: '交叉与趣谈',
    en: 'Crossovers',
    color: '#9AA3C4',
    symbol: 'star',
  },
  break: {
    zh: '休息与讨论',
    en: 'Breaks',
    color: '#3A4470',
    symbol: 'line',
  },
}

export const topicOrder: TopicKey[] = [
  'quantum',
  'astro',
  'photonics',
  'condensed',
  'cross',
]

export const site = {
  brand: 'KEKE',
  nameZh: '咯咯物理奇妙夜',
  nameEn: 'Keke Physics Night',
  year: 2027,
  editionNo: '03',
  editionZh: '第三届',
  dateISO: '2026-12-26T19:00:00+08:00',
  dateLabel: '2026.12.26',
  dateLong: '2026 年 12 月 26 日（周六）19:00',
  venue: '上海交通大学致远学院 204-ClassIn 全球教室',
  address: '上海市闵行区东川路 800 号 上海交通大学',
  online: '腾讯会议 · 会议号会前公布',
  email: 'phyconf@163.com',
  registrationUrl: '',
  siteUrl: 'https://miaowuduck.github.io/keke-physics-conference/',
  copyright: '© 2019–2026 致远物理咯咯 · 上海交通大学物理学院致远学院',
  creditUrl: 'https://vibefather.ai/t/design-conference-website',
}

export const mailto = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`

export const nav = [
  { label: '关于', href: './index.html#about' },
  { label: '本届', href: './index.html#this-year' },
  { label: '讲者', href: './index.html#speakers' },
  { label: '往届', href: './index.html#archive' },
  { label: '地点', href: './index.html#venue' },
  { label: '问答', href: './index.html#faq' },
  { label: '议程', href: './schedule.html' },
]

export const hero = {
  meta: ['N°03 — 第三届 · 物理 · 夜谈', '2026.12.26 周六', '上海交通大学'],
  kicker: 'THIRD EDITION · 2027',
  word: 'KEKE PHYSICS',
  titleZh: '咯咯物理奇妙夜',
  titleEn: 'Keke Physics Night 2027',
  intro:
    '第三届奇妙夜。一个晚上，把量子、天体、光子与凝聚态带到同一间教室——专业，但不失风趣。',
  primary: { label: '报名参会', href: './index.html#attend' },
  secondary: { label: '查看三年议程', href: './schedule.html' },
  stats: [
    { value: '03', label: '第三届' },
    { value: '22', label: '往届报告' },
    { value: '02', label: '年回顾' },
    { value: '01', label: '夜' },
  ],
}

export const marquee = [
  '2026.12.26',
  '致远学院 204',
  '第三届',
  '量子计算',
  '天体物理',
  '光子学',
  '凝聚态',
  '线上同步',
  '免费参会',
  '专业而不失风趣',
]

export const about = {
  eyebrow: 'ABOUT THE NIGHT',
  statement:
    '“咯咯物理奇妙夜”是致远物理咯咯主办的年度学术盛会。2024 年，我们点亮第一次；2025 年，第二次共振；2026 年 12 月 26 日，第三届将在同一间教室发生。',
  statement2:
    '我们彼此以“咯咯”相称——这既是身份的标记，也是对学术初心的温柔致敬：在好奇心的引力场里，持续探索、持续发声。',
  label: 'WHY COME',
  columns: [
    {
      title: '三年传统',
      body: '从 2024 年的第一次点亮，到 2025 年的第二次共振，再到今年的第三次相聚。三届、二十二场报告，主题从量子计算一路铺到天体与光子。',
    },
    {
      title: '一个夜晚',
      body: '线下在致远学院 204，线上同步腾讯会议。报告之间有中场休息，也有足够长的自由讨论——问题不必等到散场。',
    },
    {
      title: '专业而风趣',
      body: '有人带来前沿结果，有人分享灵光一现，也有人只想把最近的惶惑与热爱坦诚摆到光下。严谨推演，也允许玩笑。',
    },
  ],
}

export const thisYear = {
  eyebrow: 'THE 2027 NIGHT',
  title: '第三届，第三次共振。',
  intro:
    '2026 年 12 月 26 日，周六，19:00。上海交通大学致远学院 204-ClassIn 全球教室；线上腾讯会议同步。免费参会，需提前报名。',
  facts: [
    { icon: 'calendar', label: '时间', value: '2026.12.26 周六 19:00' },
    { icon: 'map', label: '线下', value: '致远学院 204-ClassIn 全球教室' },
    { icon: 'online', label: '线上', value: '腾讯会议（会前公布）' },
    { icon: 'ticket', label: '参会', value: '免费 · 需提前报名' },
  ],
  timeline: [
    {
      date: '11 月',
      title: '征稿与报名',
      body: '开放报告申报与参会意向登记，确定大致的主题分布。',
    },
    {
      date: '12 月上旬',
      title: '议程公布',
      body: '确认报告顺序、时长与线上会议号，并在网站更新。',
    },
    {
      date: '12.26',
      title: '第三届奇妙夜',
      body: '19:00 开场。报告、中场休息与自由讨论，预计持续到深夜。',
    },
  ],
  cta: { label: '报名参会', href: './index.html#attend' },
  calendarLabel: '添加到日历',
}

export const speakers: Speaker[] = [
  {
    name: '王若丞',
    pinyin: 'Ruocheng Wang',
    edition: '2026',
    topic: 'quantum',
    talkZh: 'QuanONet：用于微分方程求解的量子神经算子',
    talkEn:
      'QuanONet: Quantum Neural Operator with Application to Differential Equation',
  },
  {
    name: '刘子丰',
    pinyin: 'Zifeng Liu',
    edition: '2026',
    topic: 'quantum',
    talkZh: '量子计算如何赋能拼车服务',
    talkEn: 'How Quantum Computing Empowers Ridesharing Services',
  },
  {
    name: '龚亦飞',
    pinyin: 'Yifei Gong',
    edition: '2026',
    topic: 'astro',
    talkZh: '射电星系偏振与法拉第效应',
    talkEn: 'Radio Galaxy Polarization and the Faraday Effect',
  },
  {
    name: '陈致真',
    pinyin: 'Zhizhen Chen',
    edition: '2026',
    topic: 'condensed',
    talkZh: '周期性驱动系统的相变与激发',
    talkEn: 'Phase Transitions and Excitations in Periodically Driven Systems',
  },
  {
    name: '魏振宇',
    pinyin: 'Zhenyu Wei',
    edition: '2026',
    topic: 'quantum',
    talkZh: '集成光子离子阱处理器上的拉曼量子比特操作',
    talkEn: 'Raman Qubit Operation on an Integrated Photonic Ion Trap Processor',
  },
  {
    name: '赵奕祺',
    pinyin: 'Yiqi Zhao',
    edition: '2026',
    topic: 'photonics',
    talkZh: '可编程线性与非线性光子学',
    talkEn: 'Programmable Linear and Nonlinear Photonics',
  },
  {
    name: '李昕易',
    pinyin: 'Xinyi Li',
    edition: '2026',
    topic: 'quantum',
    talkZh: 'SU(N) 费米-哈伯德模型的量子蒙特卡洛模拟',
    talkEn: 'Quantum Monte Carlo Simulations of SU(N) Fermi-Hubbard Model',
  },
  {
    name: '陈致博',
    pinyin: 'Zhibo Chen',
    edition: '2024',
    topic: 'astro',
    talkZh: '模拟银河系恒星形成过程',
    talkEn: 'Modeling the star formation process of galaxies',
  },
]

const sessions2026: Session[] = [
  {
    id: '2026-01',
    start: '19:00',
    end: '19:30',
    kind: 'talk',
    topic: 'quantum',
    titleZh: 'QuanONet：用于微分方程求解的量子神经算子',
    titleEn:
      'QuanONet: Quantum Neural Operator with Application to Differential Equation',
    speaker: '王若丞',
  },
  {
    id: '2026-02',
    start: '19:30',
    end: '20:10',
    kind: 'talk',
    topic: 'quantum',
    titleZh: '量子计算如何赋能拼车服务',
    titleEn: 'How Quantum Computing Empowers Ridesharing Services',
    speaker: '刘子丰',
  },
  {
    id: '2026-03',
    start: '20:10',
    end: '20:40',
    kind: 'talk',
    topic: 'astro',
    titleZh: '射电星系偏振与法拉第效应',
    titleEn: 'Radio Galaxy Polarization and the Faraday Effect',
    speaker: '龚亦飞',
  },
  {
    id: '2026-04',
    start: '20:40',
    end: '21:10',
    kind: 'talk',
    topic: 'condensed',
    titleZh: '周期性驱动系统的相变与激发',
    titleEn:
      'Phase Transitions and Excitations in Periodically Driven Systems',
    speaker: '陈致真',
  },
  {
    id: '2026-05',
    start: '21:10',
    end: '21:30',
    kind: 'break',
    topic: 'break',
    titleZh: '中场休息',
    titleEn: 'Intermission',
  },
  {
    id: '2026-06',
    start: '21:30',
    end: '22:00',
    kind: 'talk',
    topic: 'quantum',
    titleZh: '集成光子离子阱处理器上的拉曼量子比特操作',
    titleEn:
      'Raman Qubit Operation on an Integrated Photonic Ion Trap Processor',
    speaker: '魏振宇',
  },
  {
    id: '2026-07',
    start: '22:00',
    end: '22:40',
    kind: 'talk',
    topic: 'photonics',
    titleZh: '可编程线性与非线性光子学',
    titleEn: 'Programmable Linear and Nonlinear Photonics',
    speaker: '赵奕祺',
  },
  {
    id: '2026-08',
    start: '22:40',
    end: '23:10',
    kind: 'talk',
    topic: 'quantum',
    titleZh: 'SU(N) 费米-哈伯德模型的量子蒙特卡洛模拟',
    titleEn: 'Quantum Monte Carlo Simulations of SU(N) Fermi-Hubbard Model',
    speaker: '李昕易',
  },
]

const sessions2024: Session[] = [
  {
    id: '2024-01',
    start: '19:00',
    end: '19:10',
    kind: 'opening',
    topic: 'break',
    titleZh: '开场介绍',
    titleEn: 'Opening remarks',
  },
  {
    id: '2024-02',
    start: '19:10',
    end: '19:20',
    kind: 'talk',
    topic: 'astro',
    titleZh: '模拟银河系恒星形成过程',
    titleEn: 'Modeling the star formation process of galaxies',
    speaker: '陈致博',
  },
  {
    id: '2024-03',
    start: '19:20',
    end: '19:25',
    kind: 'talk',
    topic: 'condensed',
    titleZh: '随便聊点 AFM 和 STM',
    titleEn: 'A casual chat about AFM and STM',
    speaker: '缪婷文',
  },
  {
    id: '2024-04',
    start: '19:25',
    end: '19:40',
    kind: 'talk',
    topic: 'astro',
    titleZh: '千特斯拉超强磁场产生与实验室天体物理',
    titleEn: 'Generating kilotesla magnetic fields and laboratory astrophysics',
    speaker: '石秉占',
  },
  {
    id: '2024-05',
    start: '19:40',
    end: '19:45',
    kind: 'talk',
    topic: 'quantum',
    titleZh: '对称变分量子电路设计',
    titleEn: 'Symmetric variational quantum circuit design',
    speaker: '王若丞',
  },
  {
    id: '2024-06',
    start: '19:45',
    end: '19:50',
    kind: 'talk',
    topic: 'cross',
    titleZh: '吉战士与科研怪的决斗日常（第一话）',
    titleEn: 'Battle of Ji-warrior and research freaks (Episode 1)',
    speaker: '刘见喆',
  },
  {
    id: '2024-07',
    start: '19:50',
    end: '20:05',
    kind: 'talk',
    topic: 'condensed',
    titleZh: 'Floquet 调制下的双磁子',
    titleEn: 'Floquet modulating two-magnon',
    speaker: '郭禹恒',
  },
  {
    id: '2024-08',
    start: '20:05',
    end: '20:25',
    kind: 'talk',
    topic: 'cross',
    titleZh: '关于科研的人工智能',
    titleEn: 'Something about AI for Science',
    speaker: '吴尔杰',
  },
  {
    id: '2024-09',
    start: '20:25',
    end: '20:40',
    kind: 'talk',
    topic: 'astro',
    titleZh: '射电干涉',
    titleEn: 'Radio interferometry',
    speaker: '龚亦飞',
  },
  {
    id: '2024-10',
    start: '20:40',
    end: '21:00',
    kind: 'break',
    topic: 'break',
    titleZh: '中场休息',
    titleEn: 'Intermission',
  },
  {
    id: '2024-11',
    start: '21:00',
    end: '21:10',
    kind: 'talk',
    topic: 'condensed',
    titleZh: '相变与分形',
    titleEn: 'Phase transition and fractal',
    speaker: '陈致真',
  },
  {
    id: '2024-12',
    start: '21:10',
    end: '21:25',
    kind: 'talk',
    topic: 'quantum',
    titleZh: '用于 88Sr+ 囚禁离子量子计算机的激光系统设计',
    titleEn:
      'Laser System Design for 88Sr+ Trapped-ion Quantum Computer',
    speaker: '魏振宇',
  },
  {
    id: '2024-13',
    start: '21:25',
    end: '21:40',
    kind: 'talk',
    topic: 'photonics',
    titleZh: '用于经典与量子信息处理的二维可编程光子芯片',
    titleEn:
      'A two-dimensional programmable photonic chip for classical and quantum information processing',
    speaker: '赵奕祺',
  },
  {
    id: '2024-14',
    start: '21:40',
    end: '21:55',
    kind: 'talk',
    topic: 'condensed',
    titleZh: '在菱形四层石墨烯中可视化等自旋磁性结构',
    titleEn:
      'Visualizing isospin magnetic texture in rhombohedral tetralayer graphene',
    speaker: '周垚璋',
  },
  {
    id: '2024-15',
    start: '21:55',
    end: '22:05',
    kind: 'talk',
    topic: 'quantum',
    titleZh: '量子组合优化前沿问题',
    titleEn: 'Frontiers in quantum combinatorial optimization',
    speaker: '刘子丰',
  },
  {
    id: '2024-16',
    start: '22:05',
    end: '22:20',
    kind: 'talk',
    topic: 'cross',
    titleZh: '2022 年诺贝尔经济学奖解读',
    titleEn: 'Interpreting the 2022 Nobel Prize in Economic Sciences',
    speaker: '李润邦',
  },
  {
    id: '2024-17',
    start: '22:20',
    end: '22:25',
    kind: 'talk',
    topic: 'cross',
    titleZh: '灵巧手相关，随便聊聊',
    titleEn: 'A short chat about dexterous hands',
    speaker: '曾锐',
  },
  {
    id: '2024-18',
    start: '22:25',
    end: '',
    kind: 'discussion',
    topic: 'break',
    titleZh: '自由讨论',
    titleEn: 'Open discussion',
  },
]

export const editions: Edition[] = [
  {
    id: '2027',
    label: '第三届 · 2027',
    short: '第三届',
    status: 'upcoming',
    dateISO: '2026-12-26T19:00:00+08:00',
    dateLabel: '2026.12.26',
    dateLong: '2026 年 12 月 26 日（周六）19:00',
    venue: '致远学院 204-ClassIn 全球教室',
    online: '腾讯会议 · 会议号会前公布',
    intro: '议程正在征集中。报告申报与参会报名同步开放。',
    stats: { talks: 0, span: '19:00 开始', topics: '征集中' },
    highlights: [
      '第三届，第一次在 12 月下旬相聚',
      '线下 + 线上同步',
      '报告申报与议程编排进行中',
    ],
    sessions: [],
  },
  {
    id: '2026',
    label: '第二届 · 2026',
    short: '第二届',
    status: 'past',
    dateISO: '2025-12-06T19:00:00+08:00',
    dateLabel: '2025.12.06',
    dateLong: '2025 年 12 月 6 日（周六）19:00',
    venue: '致远学院 204-ClassIn 全球教室',
    online: '腾讯会议 542-374-878',
    intro:
      '7 场报告 + 20 分钟中场，从 19:00 一直聊到 23:10。量子计算与模拟是当晚的主线。',
    stats: { talks: 7, span: '19:00–23:10', topics: '4 类' },
    highlights: [
      '7 场报告 + 20 分钟中场',
      '量子计算/模拟 4 场',
      '首次使用 204-ClassIn 全球教室',
      '线上腾讯会议 542-374-878',
    ],
    sessions: sessions2026,
  },
  {
    id: '2024',
    label: '第一届 · 2024',
    short: '第一届',
    status: 'past',
    dateISO: '2024-12-07T19:00:00+08:00',
    dateLabel: '2024.12.07',
    dateLong: '2024 年 12 月 7 日（周六）19:00',
    venue: '致远学院 204 室',
    online: '腾讯会议 718-688-912',
    intro:
      '15 场报告 + 中场 + 长时间自由讨论。单场 5–20 分钟，主题横跨天体、凝聚态、量子、光子与 AI。',
    stats: { talks: 15, span: '19:00–22:25+', topics: '5 类' },
    highlights: [
      '15 场报告 + 自由讨论',
      '单场 5–20 分钟，节奏轻快',
      '主题横跨天体、凝聚态、量子、光子与 AI',
      '第一届，2019 级致远物理方向',
    ],
    sessions: sessions2024,
  },
]

export const schedulePage = {
  meta: ['咯咯物理奇妙夜', '2026.12.26', '所有时间为北京时间'],
  kicker: 'THREE YEARS',
  word: 'AGENDA',
  titleZh: '议程',
  intro:
    '2027 议程正在征集中。下方保留 2026 与 2024 两届完整议程，可按年份与议题筛选。',
  emptyTitle: '2027 议程正在征集中',
  emptyBody:
    '报告申报与议程编排同步进行。欢迎把题目和摘要发到 phyconf@163.com，主题注明“报告申报 - 姓名”。',
  emptyCta: '邮件申报报告',
  allTopics: '全部议题',
  shown: (n: number, total: number) => `显示 ${n} / ${total} 场报告`,
  breakLabel: '休息与讨论',
}

export const venue = {
  eyebrow: 'VENUE & ONLINE',
  name: '致远学院 204-ClassIn 全球教室',
  room: '204',
  roomLabel: '致远学院 · ClassIn 全球教室',
  address: '上海市闵行区东川路 800 号 · 上海交通大学',
  intro:
    '线下在闵行校区致远学院 204，一间可以坐满人的全球教室；线上通过腾讯会议同步。第一次来也没关系，校门口到教室一路都有指示。',
  rows: [
    {
      icon: 'train',
      text: '地铁 5 号线东川路站，步行或骑行入校',
    },
    {
      icon: 'map',
      text: '闵行校区南门（东川路）进入，沿指示牌前往致远学院',
    },
    {
      icon: 'accessibility',
      text: '如需无障碍、特殊饮食或其他支持，请提前邮件联系',
    },
  ],
  onlineLabel: '线上参会',
  onlineValue: '腾讯会议 · 会议号与密码会前在网站和公众号公布',
  mapLinks: [
    {
      label: '高德地图',
      href: 'https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E8%87%B4%E8%BF%9C%E5%AD%A6%E9%99%A2&city=310000&view=map&callnative=0',
    },
    {
      label: 'OpenStreetMap',
      href: 'https://www.openstreetmap.org/search?query=%E4%B8%8A%E6%B5%B7%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E8%87%B4%E8%BF%9C%E5%AD%A6%E9%99%A2',
    },
  ],
}

export type TierAction = 'register' | 'mail'

export const tiers: {
  id: string
  name: string
  price: string
  priceNote?: string
  tag: string
  tone: 'gold' | 'volt' | 'ember'
  desc: string
  detail: string
  cta: string
  action: TierAction
  featured?: boolean
  subject?: string
}[] = [
  {
    id: 'offline',
    name: '线下参会',
    price: 'FREE',
    tag: '推荐',
    tone: 'gold',
    desc: '现场座位 · 中场茶歇 · 自由讨论',
    detail: '致远学院 204-ClassIn 全球教室，19:00 开始。',
    cta: '报名参会',
    action: 'register',
    featured: true,
    subject: '报名 - 2027 咯咯物理奇妙夜',
  },
  {
    id: 'online',
    name: '线上参会',
    price: 'FREE',
    tag: '待公布',
    tone: 'volt',
    desc: '腾讯会议同步 · 会前公布会议号',
    detail: '会议号与密码将在会前通过网站和公众号公布。',
    cta: '邮件咨询',
    action: 'mail',
    subject: '线上参会咨询 - 2027 咯咯物理奇妙夜',
  },
  {
    id: 'talk',
    name: '申报报告',
    price: '15–30',
    priceNote: '分钟',
    tag: '征集中',
    tone: 'gold',
    desc: '中英文题目 + 摘要 · 量子 / 天体 / 光子 / 凝聚态 / 交叉',
    detail: '建议 15–30 分钟；也欢迎 5 分钟闪电报告。',
    cta: '邮件申报',
    action: 'mail',
    subject: '报告申报 - 姓名',
  },
]

export const attend = {
  eyebrow: 'ATTEND',
  title: '免费，但请让我们知道你要来。',
  note: '报名通道即将开放。现在可以先发邮件登记；会议号、议程与问卷链接会持续更新。',
  dialogTitle: '报名通道即将开放',
  dialogBody:
    '2027 的报名问卷还在准备中。你可以先发邮件到 phyconf@163.com，注明“报名 - 姓名”，我们会把开放通知发给你。',
  dialogClose: '关闭',
}

export const faq = [
  {
    q: '需要报名吗？',
    a: '需要。活动免费，但请提前登记以便统计人数与准备茶歇。报名通道即将开放；在此之前可以先发邮件到 phyconf@163.com。',
  },
  {
    q: '线上怎么参加？',
    a: '使用腾讯会议同步参会。会议号与密码会在会前公布在网站和公众号；无需安装额外软件。',
  },
  {
    q: '报告多长？',
    a: '往届单场从 5 分钟到 40 分钟不等。2027 建议 15–30 分钟，也欢迎 5 分钟闪电报告；最终时长以议程为准。',
  },
  {
    q: '使用什么语言？',
    a: '中文为主，报告题目保留中英对照；幻灯片可以使用中文或英文。',
  },
  {
    q: '会有录像或照片直播吗？',
    a: '视讲者授权而定。2026 年海报提供了照片直播入口，2027 年的直播与回放安排将在会前公布。',
  },
  {
    q: '地点和无障碍支持？',
    a: '致远学院 204-ClassIn 全球教室。如需无障碍、特殊饮食或其他支持，请提前邮件联系，我们会尽量安排。',
  },
]

export const cta = {
  line: '同一个夜晚，第三届。',
  sub: '把问题带到光下。',
  primary: { label: '报名参会', href: './index.html#attend' },
  secondary: { label: '查看三年议程', href: './schedule.html' },
}

export const footer = {
  tagline: '2026.12.26 · 致远学院 204 · 上海交通大学',
  organizer: '主办：上海交通大学物理学院 / 致远学院 · 致远物理咯咯',
  columns: [
    {
      title: '活动',
      links: [
        { label: '关于', href: './index.html#about' },
        { label: '本届', href: './index.html#this-year' },
        { label: '讲者', href: './index.html#speakers' },
        { label: '往届', href: './index.html#archive' },
        { label: '议程', href: './schedule.html' },
      ],
    },
    {
      title: '联系',
      links: [
        { label: 'phyconf@163.com', href: `mailto:${site.email}` },
        { label: '上海交通大学', href: 'https://www.sjtu.edu.cn' },
        { label: '致远学院', href: 'https://zhiyuan.sjtu.edu.cn/' },
      ],
    },
  ],
  credit: {
    label: 'Template by VibeFather',
    href: 'https://vibefather.ai/t/design-conference-website',
  },
}
