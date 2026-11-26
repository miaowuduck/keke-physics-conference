import { site } from './content'

export type NewsImage = {
  src: string
  avifSrcSet: string
  webpSrcSet: string
  sizes: string
  width: number
  height: number
  alt: string
  caption: string
  credit?: string
}

const wideImage = (
  name: string,
  sizes = '(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 900px',
) => ({
  src: `./images/news/${name}.jpg`,
  avifSrcSet: `./images/news/${name}-640.avif 640w, ./images/news/${name}-960.avif 960w, ./images/news/${name}-1280.avif 1280w`,
  webpSrcSet: `./images/news/${name}-640.webp 640w, ./images/news/${name}-960.webp 960w, ./images/news/${name}-1280.webp 1280w`,
  sizes,
  width: 1536,
  height: 1024,
})

export type NewsBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; number: string; text: string; id: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'figure'; image: NewsImage; wide?: boolean }
  | { type: 'facts'; title: string; items: { label: string; value: string }[] }
  | { type: 'anatomy'; caption: string }
  | {
      type: 'palette'
      title: string
      items: { name: string; hex: string; note: string }[]
    }
  | {
      type: 'gallery'
      items: {
        image: NewsImage
        title: string
        body: string
        credit?: string
      }[]
    }
  | {
      type: 'topics'
      items: { name: string; en: string; color: string; body: string }[]
    }
  | {
      type: 'timeline'
      title: string
      items: { date: string; title: string; body: string; done?: boolean }[]
    }
  | {
      type: 'archive'
      title: string
      note?: string
      items: {
        code: string
        status: string
        title: string
        meta: string
        body: string
        reasons: { title: string; body: string }[]
        embed: { src: string; title: string }
      }[]
    }

export type NewsArticle = {
  slug: string
  href: string
  kind: 'announcement' | 'design'
  dateISO: string
  dateLabel: string
  dateDisplay: string
  category: string
  kicker: string
  title: string
  titleLines: string[]
  deck: string
  byline: string
  readTime: string
  hero: NewsImage
  lead: string[]
  keyFacts: { label: string; value: string }[]
  blocks: NewsBlock[]
  tags: string[]
}

export const registrationNews: NewsArticle = {
  slug: '2026-11-25-registration',
  href: './news-2026-11-25.html',
  kind: 'announcement',
  dateISO: '2026-11-25T20:00:00+08:00',
  dateLabel: '2026.11.25',
  dateDisplay: '2026 年 11 月 25 日 20:00',
  category: '公告',
  kicker: 'THIRD EDITION · 报名启动',
  title: '咯咯物理奇妙夜报名启动预热',
  titleLines: ['咯咯物理奇妙夜', '报名启动预热'],
  deck:
    '第三届定档 12 月 26 日。一个夜晚，把量子、天体、光子与凝聚态带到同一间教室——参会报名与报告申报同步开放。',
  byline: '致远物理咯咯 编辑部',
  readTime: '约 6 分钟',
  hero: {
    ...wideImage(
      'hero',
      '(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 1360px',
    ),
    alt: '夜晚的阶梯教室里，屏幕亮着金色徽记，台下坐满学生',
    caption:
      '夜幕下的报告厅被改造成“物理之夜”。第三届将继续采用线下与线上同步的方式，预计持续至深夜。',
    credit: '插画：致远物理咯咯',
  },
  lead: [
    '11 月 25 日，第三届咯咯物理奇妙夜（Keke Physics Night 2027）组委会宣布，本届活动定于 2026 年 12 月 26 日（周六）19:00 在上海交通大学致远学院 204-ClassIn 全球教室举行，并通过腾讯会议线上同步。参会报名与报告申报通道即日起开放，报名问卷将于 12 月 4 日 20:00 截止。',
    '这是致远物理咯咯主办的年度学术夜谈第三次举办。活动免费，主要面向物理方向学生与青年研究者，也欢迎其他方向感兴趣的听众；议题覆盖量子计算与模拟、天体物理、光子学、凝聚态与统计，以及交叉与趣谈。',
  ],
  keyFacts: [
    { label: '活动时间', value: '2026.12.26 周六 19:00' },
    { label: '线下地点', value: '致远学院 204-ClassIn 全球教室' },
    { label: '线上参会', value: '腾讯会议 · 会前公布会议号' },
    { label: '报名截止', value: '2026.12.04 周五 20:00' },
  ],
  blocks: [
    {
      type: 'h2',
      number: '01',
      id: 'third-winter',
      text: '第三个冬天，第三次共振',
    },
    {
      type: 'p',
      text:
        '从 2024 年 12 月 7 日的第一次点亮，到 2025 年 12 月 6 日的第二次共振，奇妙夜已经积累下 22 场报告。第一届以 15 场短报告和长时间自由讨论开场，单场 5 至 20 分钟；第二届将节奏放慢，7 场报告加 20 分钟中场，从 19:00 一直进行到 23:10。',
    },
    {
      type: 'p',
      text:
        '与常规学术会议不同，奇妙夜没有冗长的开幕式，也不设平行分会场。报告人与听众共处一间教室，题目从量子神经算子、量子蒙特卡洛，到射电星系偏振、周期性驱动系统与可编程光子学，跨度很大，却共享同一种提问方式。',
    },
    {
      type: 'quote',
      text: '严谨推演，也允许玩笑；专业，但不失风趣。',
      cite: '咯咯物理奇妙夜 · 活动宗旨',
    },
    {
      type: 'p',
      text:
        '“咯咯”是成员彼此之间的称呼。组委会表示，这一称呼既是对身份的标记，也寄托着对学术初心的期待——在好奇心的引力场里，持续探索、持续发声。',
    },
    {
      type: 'figure',
      image: {
        ...wideImage('four-directions'),
        alt: '量子轨道、星系、光子芯片与晶格组成的四格插画',
        caption:
          '量子、天体、光子与凝聚态，是过去两届议程中反复出现的四条线索。本届议题仍将围绕它们展开。',
        credit: '插画：致远物理咯咯',
      },
    },
    {
      type: 'h2',
      number: '02',
      id: 'four-directions',
      text: '一个夜晚，四个方向',
    },
    {
      type: 'p',
      text:
        '据组委会介绍，本届议题不设方向限制，但会围绕四个传统板块组织。量子计算与模拟延续往届最强的主线；天体物理、光子学与凝聚态则鼓励从具体问题出发，而非综述式的介绍。此外，活动保留“交叉与趣谈”单元，AI for Science、科学史与科研方法等题目均在欢迎之列。',
    },
    {
      type: 'topics',
      items: [
        {
          name: '量子计算与模拟',
          en: 'Quantum',
          color: '#7CC4F0',
          body: '量子算法、量子模拟、离子阱与超导体系，以及量子计算与真实问题的交叉。',
        },
        {
          name: '天体物理',
          en: 'Astrophysics',
          color: '#F0CE7B',
          body: '星系形成、射电观测、引力波与多信使天文学，尺度从行星到宇宙。',
        },
        {
          name: '光子学',
          en: 'Photonics',
          color: '#EB6100',
          body: '集成光子芯片、非线性光学与量子光学，让光成为计算与传感的载体。',
        },
        {
          name: '凝聚态与统计',
          en: 'Condensed matter',
          color: '#E7E4D2',
          body: '强关联、拓扑物态、相变与非平衡系统，关心大量粒子如何一起行动。',
        },
        {
          name: '交叉与趣谈',
          en: 'Crossovers',
          color: '#9AA3C4',
          body: 'AI for Science、科学史、科研方法与开放讨论，不设学科边界。',
        },
      ],
    },
    {
      type: 'p',
      text:
        '报告时长建议 15 至 30 分钟，也接受 5 分钟闪电报告；希望以海报形式参与的同学，可提交 80×120 厘米电子海报。报告之间安排中场休息，最后留出足够长的自由讨论时间。',
    },
    {
      type: 'h2',
      number: '03',
      id: 'curiosity',
      text: '不要求成果，只要求好奇',
    },
    {
      type: 'p',
      text:
        '“报告不需要‘成果’。”组委会在报名说明中写道，哪怕只有 10 分钟，聊聊最近在做什么、卡在哪里、被什么问题吸引，都欢迎。这一表述延续了前两届的基调：奇妙夜更看重问题本身，而不是完成度。',
    },
    {
      type: 'p',
      text:
        '对低年级同学而言，这也是一个压力相对较小的表达场合。往届报告人中，既有已经发表工作的研究生，也有第一次公开讲述课题的本科生；报告语言以中文为主，幻灯片可以使用中文或英文。',
    },
    {
      type: 'quote',
      text: '问题不必等到散场。',
      cite: '活动介绍',
    },
    {
      type: 'figure',
      image: {
        ...wideImage('stage-talk'),
        alt: '小鸡讲者在讲台前作报告，台下学生举手',
        caption:
          '报告之后的提问与讨论，往往比报告本身更长。中场与自由讨论是奇妙夜的固定环节。',
        credit: '插画：致远物理咯咯',
      },
    },
    {
      type: 'h2',
      number: '04',
      id: 'registration',
      text: '报名与议程安排',
    },
    {
      type: 'p',
      text:
        '本届活动免费，但需提前登记，以便统计人数与准备茶歇。参会者可通过问卷星填写“参会与报告意向问卷”，截止时间为 12 月 4 日（周五）20:00。希望作报告的同学，可在问卷中填写题目与摘要，或将题目、摘要和个人简介发送至 phyconf@163.com，邮件主题注明“报告申报 - 姓名”。',
    },
    {
      type: 'figure',
      image: {
        ...wideImage('registration'),
        alt: '签到桌前，小鸡递出一张金色边框的报名卡',
        caption:
          '报名通道开放至 12 月 4 日 20:00。参会与报告申报使用同一份问卷，填写大约需要 2 分钟。',
        credit: '插画：致远物理咯咯',
      },
    },
    {
      type: 'timeline',
      title: '从现在到 12 月 26 日',
      items: [
        {
          date: '11.25',
          title: '报名启动',
          body: '参会意向与报告申报同步开放。',
          done: true,
        },
        {
          date: '12.04',
          title: '问卷截止',
          body: '20:00 关闭问卷，统计人数与报告意向。',
        },
        {
          date: '12 月上旬',
          title: '议程公布',
          body: '确认报告顺序、时长与线上会议号。',
        },
        {
          date: '12.26',
          title: '第三届奇妙夜',
          body: '19:00 开场，报告、中场与自由讨论。',
        },
      ],
    },
    {
      type: 'p',
      text:
        '组委会计划于 12 月上旬确认议程，并通过会议官网与公众号公布报告顺序、线上会议号及参会提醒。最终时间、地点与议程以官方发布为准。',
    },
    {
      type: 'h2',
      number: '05',
      id: 'about',
      text: '关于咯咯物理奇妙夜',
    },
    {
      type: 'p',
      text:
        '咯咯物理奇妙夜由上海交通大学物理学院、致远学院与致远物理咯咯共同主办，是面向物理方向学生与青年研究者的年度学术交流活动。活动以中文为主，报告题目保留中英文对照，免费参会；线下座位与线上会议均需提前登记。',
    },
    {
      type: 'figure',
      image: {
        src: './images/news/2025-group.jpg',
        avifSrcSet:
          './images/news/2025-group-480.avif 480w, ./images/news/2025-group-960.avif 960w',
        webpSrcSet:
          './images/news/2025-group-480.webp 480w, ./images/news/2025-group-960.webp 960w',
        sizes: '(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 1080px',
        width: 1024,
        height: 1024,
        alt: '2025 年第二届咯咯物理奇妙夜线下与线上参与者合影',
        caption:
          '资料照片：2025 年 12 月 6 日，第二届咯咯物理奇妙夜现场，线下参与者与线上报告人合影。',
        credit: '照片：主办方提供',
      },
    },
    {
      type: 'p',
      text:
        '第三届的筹备工作已经启动。组委会表示，后续将陆续公布议程、讲者与线上参会方式，所有信息以会议官网和公众号“致远物理咯咯”发布为准。',
    },
    {
      type: 'figure',
      image: {
        ...wideImage('venue-night'),
        alt: '夜晚的致远学院教学楼，窗内透出暖光',
        caption:
          '本届仍在致远学院 204-ClassIn 全球教室举行，线上通过腾讯会议同步。',
        credit: '插画：致远物理咯咯',
      },
    },
    {
      type: 'p',
      text: '同一个夜晚，第三届。把问题带到光下。',
    },
  ],
  tags: ['公告', '第三届', '报名', '议程'],
}

export const logoNews: NewsArticle = {
  slug: '2026-11-26-badge',
  href: './news-2026-11-26.html',
  kind: 'design',
  dateISO: '2026-11-26T10:00:00+08:00',
  dateLabel: '2026.11.26',
  dateDisplay: '2026 年 11 月 26 日',
  category: '设计',
  kicker: 'THIRD EDITION · 徽章发布',
  title: '第三届徽章发布：三轨环宇，破壳星芒',
  titleLines: ['第三届徽章发布', '三轨环宇，破壳星芒'],
  deck:
    '第三届咯咯物理奇妙夜官方徽章完成设计。以蛋形为核、三轨为环、折光为破壳，把“致远咯咯”的吉祥物基因收进一枚可佩戴的圆形徽章。两个被放弃的早期方案一并归档。',
  byline: '致远物理咯咯 设计组',
  readTime: '约 9 分钟',
  hero: {
    ...wideImage(
      'logo-hero',
      '(max-width: 640px) 100vw, (max-width: 1200px) 92vw, 1360px',
    ),
    alt: '深蓝夜空中的金色圆形徽章，三条椭圆轨道环绕裂开的蛋形核心',
    caption:
      '第三届官方徽章。三条椭圆轨道以 −24°、36°、96° 交叠，中央是破壳的蛋形核心，折光在右上与四芒星相接。',
    credit: '视觉：致远物理咯咯设计组',
  },
  lead: [
    '11 月 26 日，第三届咯咯物理奇妙夜组委会公布本届官方徽章。徽章以圆形为制，午夜蓝为底、琥珀金为线；三条椭圆轨道环绕中央的蛋形核心，一道折光穿过蛋壳，在右上与四芒星相接。',
    '这是奇妙夜第一次为单届活动建立完整的徽章视觉。设计从“致远咯咯”的破壳小鸡出发，但不画具体的小鸡——只保留蛋形、破口与光。徽章图形目前已在会议官网使用，作为本届活动的视觉标识。',
    '与徽章同时公开的，还有两个没有被采用的早期方案：一只被原子轨道围住的卡通小鸡，和一枚用锯齿裂纹破壳的抽象蛋。两稿的原始动效直接嵌在本文中，可以边读边看。',
  ],
  keyFacts: [
    { label: '发布日期', value: '2026.11.26' },
    { label: '徽章形制', value: '圆形 · 400 × 400 画布' },
    { label: '核心结构', value: '蛋形 / 三轨 / 星芒' },
    { label: '标准色', value: '午夜蓝 + 琥珀金' },
  ],
  blocks: [
    {
      type: 'h2',
      number: '01',
      id: 'origin',
      text: '从一只小鸡开始做减法',
    },
    {
      type: 'p',
      text:
        '过去两届，奇妙夜的视觉主要由海报和屏幕承担。吉祥物“致远咯咯”以一只破壳小鸡的形象直接出现，亲切、直接；但在胸卡、证书与正式物料上，具象的卡通形象并不总是合适。',
    },
    {
      type: 'p',
      text:
        '第三届筹备启动后，设计组决定做一次减法：不再画一只具体的小鸡，而是提取它最核心的视觉基因——破壳的蛋形——再把它翻译成几何语言。蛋形保留情感连接，轨道、星芒与刻度把它带进物理的语境。',
    },
    {
      type: 'quote',
      text: '隐喻提炼，大方致远。',
      cite: '设计原则',
    },
    {
      type: 'p',
      text:
        '这不是把吉祥物藏起来，而是让它以另一种方式在场。徽章中央没有眼睛，也没有喙；但只要看到那枚微微倾斜的卵形和上端的缺口，熟悉奇妙夜的人仍会认出它。',
    },
    {
      type: 'h2',
      number: '02',
      id: 'egg',
      text: '蛋形：宇宙的奇点，也是咯咯的出生地',
    },
    {
      type: 'p',
      text:
        '徽章中心是一枚竖直的卵形，用午夜蓝填充，边缘以 2.4 单位的金线勾出。它既是被啄开的蛋壳，也是物理学里关于起源的经典意象：一个安静、致密、蕴含全部可能性的奇点。',
    },
    {
      type: 'p',
      text:
        '设计组在释义中写道，深邃的海军蓝卵形“静谧如夜空，代表物理世界中蕴藏无限未知的能量奇点”。蛋形因此承担了两层叙事：对“咯咯”而言是出生，对物理而言是宇宙的开端。',
    },
    {
      type: 'p',
      text:
        '为了让蛋形不至于呆板，核心沿一条斜向棱镜切口分成两半，右半再向右下错开约 5 单位。这个几乎察觉不到的位移，让蛋壳有了被顶开的趋势，也为折光留出了入口。',
    },
    {
      type: 'h2',
      number: '03',
      id: 'orbits',
      text: '三轨：三条轨道，三届夜晚',
    },
    {
      type: 'p',
      text:
        '三条细金椭圆以 −24°、36°、96° 三个倾角交叠，环绕蛋形。它们不是三个同心圆，而是有前后遮挡关系的轨道：每条轨道在后半程压暗，在前半程提亮，并用一圈与底色相同的粗线隔开，形成穿过徽章空间的错觉。',
    },
    {
      type: 'p',
      text:
        '三条轨道对应第三届。交织而非并列，意味着三届之间的积淀、交汇与传承；在物理语境里，它们同时是原子轨道、能级跃迁与天体运行的同一种语法。',
    },
    {
      type: 'facts',
      title: '徽章结构参数',
      items: [
        { label: '画布', value: '400 × 400' },
        { label: '轨道倾角', value: '−24° / 36° / 96°' },
        { label: '轨道线宽', value: '1.5 – 1.7' },
        { label: '外圈刻度', value: '12 格' },
      ],
    },
    {
      type: 'p',
      text:
        '轨道线宽只有 1.5 至 1.7 单位，在 400 × 400 的画布上接近发丝。设计组为此做了多轮取舍：线太粗会显得笨重，太细则在徽章工艺里容易断线。最终定稿保留了细线，并把金色提高到接近骨白的明度，让它在深蓝底上仍然清楚。',
    },
    {
      type: 'h2',
      number: '04',
      id: 'hatch',
      text: '折光破壳：一道斜线，点亮星芒',
    },
    {
      type: 'p',
      text:
        '一条折线从左下斜向右上，穿过蛋形，把闭合的轮廓打开。这是整枚徽章唯一不对称的动势：它代表蛋壳破裂的瞬间，也代表光线折射、能级跃迁与脉冲碰撞的轨迹。',
    },
    {
      type: 'p',
      text:
        '折线在右上抵达一颗四芒星。星芒不是终点，而是破壳之后的结果——碎裂没有发生，能量被转译成一束光。星芒背后留出一圈深色负空间，使它从蛋壳与轨道之间浮出来。',
    },
    {
      type: 'figure',
      image: {
        ...wideImage('logo-detail'),
        alt: '徽章局部的金色四芒星、蛋壳缺口与轨道细线',
        caption:
          '400 × 400 画布上的折光与星芒。四芒星停在蛋壳破口的上端，背后留出负空间。',
        credit: '视觉：致远物理咯咯设计组',
      },
    },
    {
      type: 'quote',
      text: '三轨环宇，破壳星芒。以物理之理，点亮致远奇妙之夜。',
      cite: '宣发短语',
    },
    {
      type: 'h2',
      number: '05',
      id: 'drafts',
      text: '两枚没有走通的草稿',
    },
    {
      type: 'p',
      text:
        '本届徽章不是一次画成的。在定稿之前，设计组完整地做出过两个方向：一只被原子轨道围住的卡通小鸡，和一枚用锯齿裂纹破壳、顶着一颗四角星的负形蛋。两个方向都做成了可交互的 SVG 动效，最终都没有被采用。',
    },
    {
      type: 'p',
      text:
        '两个旧稿的动效现在直接嵌在下面，不再是截图或链接：轨道、闪烁与出入场参数都保留了原样，进入视野后自动播放一次，然后停在自己的静止状态。它们没有成为官方徽章，但定稿里的许多决定，是在看过它们之后才做出的。',
    },
    {
      type: 'archive',
      title: 'Archive / 未采用方案',
      items: [
        {
          code: '方案 A',
          status: '未采用',
          title: '原子蛋壳小鸡',
          meta: '旧稿 · 插画方向',
          body:
            '把吉祥物直接放进原子模型：四层描边的天蓝轨道、两颗金色电子、七颗星与一弯月牙，围住一只戴蛋壳帽、张开翅膀的卡通小鸡。',
          embed: {
            src: './designs/old-atomic-chick.html?embed=1&v=3',
            title: '方案 A 动效演示：戴蛋壳帽的卡通小鸡被四条蓝色原子轨道环绕',
          },
          reasons: [

            {
              title: '元素太多，缩不小',
              body: '眼睛、翅膀、脚、蛋壳帽，加上四条轨道、两颗电子、七颗星和月牙，各自都有意义；可当徽章缩到 25 毫米、头像缩到 24 像素，表情最先消失，最后只剩一团蓝色线。',
            },
            {
              title: '卡通语言与场合不合',
              body: '这枚图形要出现在胸卡、证书和屏幕开场里。张嘴笑的小鸡很亲切，却把一场学术夜谈说成了游园会。',
            },
            {
              title: '多出第三种主色',
              body: '天蓝 #1FA2E1 与金黄 #FFCB42 已经是一套完整的插画配色；再放进站点的午夜蓝与琥珀金，徽章就无法用两色珐琅或烤漆完成。',
            },
            {
              title: '原子不等于奇妙夜',
              body: '四条轨道加两颗电子是“物理”的通用符号，任何物理社团都能用；它说不出“第三届”，也说不出“咯咯”。',
            },
          ],
        },
        {
          code: '方案 B',
          status: '未采用',
          title: '星光破壳',
          meta: '旧稿 · 抽象方向',
          body:
            '把形象彻底抽空，只留三条圆头轨道、一个用白色负形遮住轨道的蛋，以及蛋顶一道锯齿裂纹与一颗金色四角星。',
          embed: {
            src: './designs/old-starlight-hatch.html?embed=1&v=3',
            title: '方案 B 动效演示：白色蛋形上的锯齿裂纹与三条深蓝、金色轨道',
          },
          reasons: [
            {
              title: '白蛋只在白底成立',
              body: '蛋体与轨道镂空都依赖纯白填充。换到深色胸卡、夜场屏幕或金属徽章上，白色负形会变成一块空洞，遮挡关系随之失效。',
            },
            {
              title: '裂纹画得太具体',
              body: '上五下六的锯齿在 800 像素时是细节，在 24 像素时就是脏点。定稿改用一条笔直的棱镜折线：破壳变成一个动作，而不是一排锯齿。',
            },
            {
              title: '有交叉，没有前后',
              body: '三条轨道粗细相同，只有一条换成金色，交叠处靠白色镂空硬切，放大后像断成几截。定稿把倾角定为 −24°、36°、96°，并让后半程压暗、前半程提亮。',
            },
            {
              title: '没有外圈，就还不是徽章',
              body: '它可以当网站图标，却盖不了章、做不了封印。最终方案补上 12 格刻度的外环，这枚图形才获得“徽章”的形制。',
            },
          ],
        },
      ],
      note: '两版均为当时的原始文件，动效由 JavaScript 驱动；为适配深色版面，嵌入版的底色与线条明度做了调整。进入视野后自动播放一次，卡片右上角的按钮可以重播。',
    },
    {
      type: 'p',
      text:
        '回看两稿，问题其实相同：它们都把“破壳”画成了结论。方案 A 用表情和动作讲完故事，方案 B 用裂纹把故事钉死在蛋顶；而一枚要佩戴一整晚、还要印在纸上的徽章，需要的是可以被反复解读的结构，而不是一个瞬间。',
    },
    {
      type: 'p',
      text:
        '定稿从方案 B 借走蛋、三轨与星，从方案 A 借走“吉祥物必须被抽象”这条教训，再补上两稿都没有的三件东西：外圈与刻度、三段有前后关系的轨道，以及一条从蛋壳里穿出、直抵星芒的折光线。',
    },
    {
      type: 'h2',
      number: '06',
      id: 'white-model',
      text: '白模：先把结构拆成五层',
    },
    {
      type: 'p',
      text:
        '定稿之前，设计组先做白模：去掉颜色与材质，只留下形体，检查各层之间是否站得住。白模里的徽章被拆成五层——外圈与刻度、蛋形核心、三条轨道、折光与星芒，以及最终的复合。',
    },
    {
      type: 'p',
      text:
        '外圈不是简单的圆环。内圈有一道极细的辅助圆，12 个刻度按 30° 分布，其中四个正方向换成星点；它们借用了天体仪与日晷的测量感，也让徽章在放大后经得起看。',
    },
    {
      type: 'anatomy',
      caption:
        '白模：去掉材质与配色后，先检查五个层次的关系。左侧编号对应右侧结构说明，下方为逐层拆解。',
    },
    {
      type: 'p',
      text:
        '白模还暴露了一个问题：三条轨道与蛋形的交点太密。最终方案把轨道整体压细，并在前半弧加上一圈底色描边，让穿插关系一眼可读；这层描边在成图中几乎看不见，却决定了徽章是否“透气”。',
    },
    {
      type: 'h2',
      number: '07',
      id: 'craft',
      text: '工艺：让金色在夜里发光',
    },
    {
      type: 'p',
      text:
        '徽章只有两种颜色。午夜蓝 #0B1A3A 代表夜空、宇宙背景与求知的冷静；琥珀金 #D4AF37 代表星光、知识的火炬与金属质感。两色对比明确，在白底纸张和深色屏幕上都能保持辨识度。',
    },
    {
      type: 'p',
      text:
        '实体计划采用仿珐琅或烤漆工艺：深蓝区域填半透明珐琅，金色轨道与外圈做凸起拉丝镀金，星芒高光抛光。这样在侧光下，轨道会先亮起来，星芒最后闪一下。',
    },
    {
      type: 'palette',
      title: '两套色值，两个介质',
      items: [
        { name: '午夜蓝', hex: '#0B1A3A', note: '徽章标准色' },
        { name: '琥珀金', hex: '#D4AF37', note: '徽章标准色' },
        { name: '夜蓝', hex: '#10162F', note: '屏幕适配' },
        { name: '徽记金', hex: '#F0CE7B', note: '屏幕适配' },
      ],
    },
    {
      type: 'p',
      text:
        '网页与屏幕版本沿用同一色系，但为适配深色背景，把夜蓝调整为 #10162F、金色调整为 #F0CE7B。两套色值并非互相替代，而是分别服务于金属与屏幕的显示条件。',
    },
    {
      type: 'figure',
      image: {
        ...wideImage('logo-badge'),
        alt: '深蓝绒布上的一枚圆形仿珐琅徽章，金色轨道微微凸起',
        caption:
          '仿珐琅徽章示意：深蓝珐琅、凸起镀金轨道与抛光星芒。实体工艺以最终打样为准。',
        credit: '视觉：致远物理咯咯设计组（工艺示意）',
      },
    },
    {
      type: 'h2',
      number: '08',
      id: 'scenes',
      text: '从物料到屏幕',
    },
    {
      type: 'p',
      text:
        '徽章不是一枚孤立的图形。设计之初，它就被当作一套可延展的视觉系统：在白底海报上，它是权威的活动封印；在深色胸卡上，它是发光的夜场符号；缩到很小，外圈、蛋形与星芒仍然可以辨认。',
    },
    {
      type: 'gallery',
      items: [
        {
          image: {
            ...wideImage(
              'logo-ticket',
              '(max-width: 767px) 100vw, (max-width: 1200px) 46vw, 430px',
            ),
            alt: '深色桌面上的入场券、胸卡与圆形贴纸，均印有金色徽章',
            caption: '入场券、胸卡与贴纸的物料示意。',
          },
          title: '入场券与胸卡',
          body:
            '白底烫金适合票据与纪念卡，深底胸卡保留夜场感。三件物料共用同一枚徽章，不额外设计第二套图形。',
          credit: '物料示意',
        },
        {
          image: {
            ...wideImage(
              'logo-poster',
              '(max-width: 767px) 100vw, (max-width: 1200px) 46vw, 430px',
            ),
            alt: '深色墙面上的两张海报，白底与深底各一，中央是金色徽章',
            caption: '白底与深底两张海报的并置。',
          },
          title: '海报封印',
          body:
            '在白底海报中，徽章作为“活动封印”置于视觉中心；深底版本则让金色轨道直接承担发光效果。',
          credit: '场景示意',
        },
      ],
    },
    {
      type: 'p',
      text:
        '设计组建议，在小于 24 像素的场景里省略刻度与发丝轨道，只保留外圈、蛋形和星芒；在正式印刷中则保留全部细节，并使用烫金或专色金。',
    },
    {
      type: 'p',
      text:
        '目前，徽章的扁平版本已用于会议官网，作为本届活动的视觉标识。',
    },
    {
      type: 'p',
      text:
        '报名仍在进行，截止 12 月 4 日 20:00。三轨环宇，破壳星芒。',
    },
  ],
  tags: ['设计', '徽章', '视觉识别', '旧稿', '第三届'],
}

export const newsArticles: NewsArticle[] = [logoNews, registrationNews]

export const latestNews = newsArticles[0]

export const newsPage = {
  kicker: 'KEKE NEWS',
  word: 'NEWS',
  titleZh: '新闻与动态',
  intro:
    '记录第三届咯咯物理奇妙夜的筹备进展、公告与现场故事。所有正式通知以本栏目和公众号“致远物理咯咯”发布为准。',
  meta: ['第 03 届', '筹备日志', '上海交通大学'],
  upcoming: [
    {
      date: '12 月上旬',
      title: '议程与讲者公布',
      body: '报告顺序、时长、线上会议号，以及本届讲者名单。',
    },
    {
      date: '12 月中旬',
      title: '参会提醒',
      body: '入校路线、签到方式、茶歇与现场注意事项。',
    },
    {
      date: '12 月 26 日之后',
      title: '现场回顾',
      body: '第三届的报告摘要、现场照片与自由讨论摘录。',
    },
  ],
  contact: {
    title: '媒体与联络',
    body: '采访、转载或内容合作，请联系组委会。活动信息以官方渠道为准。',
    email: site.email,
  },
}
