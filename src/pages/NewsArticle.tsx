import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Mail,
  MapPin,
  Video,
} from 'lucide-react'
import { Header } from '../components/Header'
import { LogoMark, LogoOrbits, LogoStar } from '../components/LogoMark'
import { LogoAnatomy } from '../components/LogoAnatomy'
import { NewsPicture } from '../components/NewsPicture'
import { Footer } from '../components/Footer'
import { CtaBand } from '../components/CtaBand'
import { site } from '../content'
import {
  latestNews,
  newsArticles,
  registrationNews,
  type NewsArticle as NewsArticleData,
  type NewsBlock,
  type NewsImage,
} from '../news'
import { externalLink } from '../lib/format'

function Figure({
  image,
  wide = false,
  priority = false,
}: {
  image: NewsImage
  wide?: boolean
  priority?: boolean
}) {
  return (
    <figure className={`my-9 ${wide ? 'md:-mx-10' : ''}`}>
      <div className="overflow-hidden border-2 border-line bg-deep">
        <NewsPicture
          image={image}
          priority={priority}
          className="h-auto w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 border-l-2 border-gold pl-3 text-[12.5px] leading-relaxed text-mute sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <span>{image.caption}</span>
        {image.credit && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-mute/70">
            {image.credit}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="mt-5 text-[16.5px] leading-[1.95] text-bone/85">
          {block.text}
        </p>
      )
    case 'h2':
      return (
        <h2
          id={block.id}
          className="mt-12 flex scroll-mt-24 items-baseline gap-3 border-t-2 border-line pt-5"
        >
          <span className="display tabular text-[18px] font-black text-gold">
            {block.number}
          </span>
          <span className="display text-[clamp(24px,3vw,36px)] font-extrabold leading-tight">
            {block.text}
          </span>
        </h2>
      )
    case 'quote':
      return (
        <blockquote className="relative my-10 border-y-2 border-gold/60 py-7 pl-8 pr-4">
          <span
            aria-hidden="true"
            className="display absolute left-0 top-3 text-[56px] font-black leading-none text-gold/50"
          >
            “
          </span>
          <p className="display text-[clamp(22px,2.8vw,32px)] font-extrabold leading-snug text-bone [text-wrap:balance]">
            {block.text}
          </p>
          {block.cite && (
            <cite className="mt-3 block font-mono text-[10.5px] uppercase not-italic tracking-[0.16em] text-mute">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      )
    case 'figure':
      return <Figure image={block.image} wide={block.wide} />
    case 'anatomy':
      return <LogoAnatomy caption={block.caption} />
    case 'palette':
      return (
        <div className="my-8">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-gold">
            {block.title}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-px border-2 border-line bg-line sm:grid-cols-4">
            {block.items.map((item) => (
              <div key={item.hex} className="bg-night p-3">
                <div
                  className="h-16 w-full border border-white/10"
                  style={{ background: item.hex }}
                />
                <p className="display mt-3 text-[14px] font-extrabold">
                  {item.name}
                </p>
                <p className="font-mono text-[10px] tracking-[0.08em] text-gold">
                  {item.hex}
                </p>
                <p className="mt-0.5 text-[11px] text-mute">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'gallery':
      return (
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {block.items.map((item, index) => (
            <figure
              key={item.title}
              className={
                index === 0 && block.items.length > 2 ? 'md:col-span-2' : ''
              }
            >
              <div className="overflow-hidden border-2 border-line bg-deep">
                <NewsPicture
                  image={item.image}
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 border-l-2 border-gold pl-3">
                <p className="display text-[15px] font-extrabold">{item.title}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-mute">
                  {item.body}
                </p>
                {item.credit && (
                  <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-mute/70">
                    {item.credit}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )
    case 'facts':
      return (
        <div className="my-8 border-2 border-line bg-deep/60">
          <p className="border-b-2 border-line px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-gold">
            {block.title}
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            {block.items.map((item, index) => (
              <div
                key={item.label}
                className={[
                  'px-5 py-4',
                  index % 2 === 1 ? 'sm:border-l-2 sm:border-line' : '',
                  index >= 2 ? 'border-t-2 border-line' : 'border-t border-line/40 sm:border-t-2',
                ].join(' ')}
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                  {item.label}
                </dt>
                <dd className="mt-1 text-[14px] font-medium leading-snug text-bone">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'topics':
      return (
        <div className="my-8 grid grid-cols-1 gap-px border-2 border-line bg-line sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.name} className="bg-night p-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0"
                  style={{ background: item.color }}
                />
                <p className="display text-[17px] font-extrabold leading-none">
                  {item.name}
                </p>
              </div>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mute">
                {item.en}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-mute">
                {item.body}
              </p>
            </div>
          ))}
          <div className="hidden bg-night p-5 sm:block">
            <p className="eyebrow flex items-center gap-2 text-gold">
              <LogoStar size={9} />
              OPEN CALL
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-mute">
              议题不限方向。哪怕只是 10 分钟，聊聊最近在做什么、卡在哪里、被什么问题吸引，都欢迎。
            </p>
          </div>
        </div>
      )
    case 'timeline':
      return (
        <div className="my-9">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-gold">
            {block.title}
          </p>
          <ol className="mt-4 grid grid-cols-1 border-l-2 border-line sm:grid-cols-2 lg:grid-cols-4 lg:border-l-0 lg:border-t-2">
            {block.items.map((item) => (
              <li
                key={item.date}
                className="relative border-b-2 border-line py-4 pl-6 sm:px-4 lg:border-b-0 lg:border-r-2 lg:pt-5 lg:last:border-r-0"
              >
                <span
                  className={
                    item.done
                      ? 'absolute left-0 top-6 h-2.5 w-2.5 -translate-x-[5px] bg-gold lg:-top-[5px] lg:left-4 lg:translate-x-0'
                      : 'absolute left-0 top-6 h-2.5 w-2.5 -translate-x-[5px] border-2 border-line bg-night lg:-top-[5px] lg:left-4 lg:translate-x-0'
                  }
                />
                <p className="font-mono text-[10.5px] tracking-[0.06em] text-gold">
                  {item.date}
                </p>
                <p className="display mt-1 text-[17px] font-extrabold">
                  {item.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-mute">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )
    default:
      return null
  }
}

function RegistrationCard() {
  return (
    <div className="relative overflow-hidden border-2 border-gold bg-gold p-6 text-night">
      <LogoOrbits
        size={300}
        className="pointer-events-none absolute -right-24 -top-24 text-night opacity-[0.1]"
      />
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-night/70">
          Registration
        </p>
        <p className="display mt-2 flex items-baseline gap-2 font-black leading-none">
          <span className="text-[54px]">12.04</span>
          <span className="text-[18px]">20:00</span>
        </p>
        <p className="mt-2 text-[13px] font-medium leading-snug text-night/80">
          报名问卷截止。参会与报告申报使用同一份问卷，免费，约 2 分钟。
        </p>
        <a
          href={site.registrationUrl}
          {...externalLink(site.registrationUrl)}
          className="btn-ink mt-5 h-12 w-full text-[14px]"
        >
          填写报名问卷
          <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}

function DesignCard() {
  return (
    <div className="border-2 border-line bg-deep/50 p-5">
      <div className="relative mx-auto my-2 flex h-40 w-40 items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(240,206,123,.14),transparent_66%)]"
        />
        <LogoMark size={150} playOnView title="第三届官方徽章" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
        Official Badge / 03
      </p>
      <p className="display mt-2 text-[20px] font-extrabold leading-tight">
        三轨环宇，破壳星芒
      </p>
      <dl className="mt-4 space-y-2 border-t-2 border-line pt-3 text-[12.5px]">
        <div className="flex justify-between gap-3">
          <dt className="text-mute">发布</dt>
          <dd className="text-bone">2026.11.26</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-mute">形制</dt>
          <dd className="text-bone">圆形徽章</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-mute">结构</dt>
          <dd className="text-bone">蛋形 · 三轨 · 星芒</dd>
        </div>
      </dl>
      <a
        href={registrationNews.href}
        className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-gold hover:text-bone"
      >
        阅读报名公告
        <ArrowRight size={14} strokeWidth={1.75} />
      </a>
    </div>
  )
}

function ArticleBody({ article }: { article: NewsArticleData }) {
  const sections = article.blocks.filter(
    (block): block is Extract<NewsBlock, { type: 'h2' }> =>
      block.type === 'h2',
  )

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-8">
        <div className="border-l-2 border-gold pl-5">
          {article.lead.map((text, index) => (
            <p
              key={index}
              className={[
                index === 0
                  ? 'text-[18.5px] leading-[1.9] text-bone'
                  : 'mt-4 text-[16.5px] leading-[1.95] text-bone/85',
                'font-medium',
              ].join(' ')}
            >
              {text}
            </p>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-1 border-2 border-line bg-deep/50 sm:grid-cols-2">
          {article.keyFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={[
                'px-5 py-4',
                index % 2 === 1 ? 'sm:border-l-2 sm:border-line' : '',
                index >= 2 ? 'border-t-2 border-line' : 'border-t border-line/40',
              ].join(' ')}
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                {fact.label}
              </dt>
              <dd className="mt-1 text-[14px] font-medium leading-snug text-bone">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {article.kind !== 'design' && (
          <a
            href={site.registrationUrl}
            {...externalLink(site.registrationUrl)}
            className="btn-gold mt-4 w-full lg:hidden"
          >
            填写报名问卷
            <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
          </a>
        )}

        {article.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}

        <div className="mt-10 flex flex-wrap items-center gap-2 border-t-2 border-line pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            Tags
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line px-2.5 py-1 font-mono text-[10.5px] text-bone/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-2 border-line bg-deep/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] leading-relaxed text-mute">
            本文为第三届咯咯物理奇妙夜新闻稿。转载、引用请联系组委会。
          </p>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('新闻转载咨询')}`}
            className="inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-gold hover:text-bone"
          >
            <Mail size={14} strokeWidth={1.75} />
            {site.email}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <a
            href="./news.html"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} strokeWidth={1.75} />
            返回新闻列表
          </a>
          {latestNews.slug !== article.slug && (
            <a
              href={latestNews.href}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold underline underline-offset-4"
            >
              最新：{latestNews.title} →
            </a>
          )}
        </div>
      </div>

      <aside className="min-w-0 lg:col-span-4">
        <div className="space-y-6 lg:sticky lg:top-24">
          {article.kind === 'design' ? <DesignCard /> : <RegistrationCard />}

          <nav
            aria-label="本文导读"
            className="border-2 border-line p-5"
          >
            <p className="eyebrow flex items-center gap-2 text-gold">
              <LogoStar size={9} />
              本文导读
            </p>
            <ol className="mt-3 space-y-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-3 text-[13px] leading-snug text-bone/80 transition-colors hover:text-gold"
                  >
                    <span className="font-mono text-[10px] text-gold">
                      {section.number}
                    </span>
                    {section.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="border-2 border-line p-5">
            <p className="eyebrow flex items-center gap-2 text-gold">
              <LogoStar size={9} />
              活动信息
            </p>
            <ul className="mt-4 space-y-3 text-[13px] leading-snug text-bone/85">
              <li className="flex items-start gap-2.5">
                <CalendarDays
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  strokeWidth={1.75}
                />
                {site.dateLong}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  strokeWidth={1.75}
                />
                {site.venue}
              </li>
              <li className="flex items-start gap-2.5">
                <Video
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  strokeWidth={1.75}
                />
                {site.online}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  strokeWidth={1.75}
                />
                {site.email}
              </li>
            </ul>
            <a
              href="./schedule.html"
              className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-gold hover:text-bone"
            >
              查看三年议程
              <ArrowRight size={14} strokeWidth={1.75} />
            </a>
          </div>

          {newsArticles.length > 1 && (
            <div className="border-2 border-line p-5">
              <p className="eyebrow">相关新闻</p>
              <ul className="mt-3 space-y-3">
                {newsArticles
                  .filter((item) => item.slug !== article.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <li key={item.slug}>
                      <a
                        href={item.href}
                        className="text-[13px] leading-snug text-bone/85 hover:text-gold"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

export function NewsArticle({ article }: { article: NewsArticleData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.dateISO,
    description: article.deck,
    image: `${site.siteUrl}${article.hero.src.replace('./', '')}`,
    articleSection: article.category,
    author: { '@type': 'Organization', name: article.byline },
    publisher: { '@type': 'Organization', name: '致远物理咯咯' },
    mainEntityOfPage: `${site.siteUrl}${article.href.replace('./', '')}`,
  }

  return (
    <div className="min-h-screen bg-night text-bone">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        跳到主内容
      </a>
      <Header active="news" />

      <main id="main">
        <article>
          <header className="border-b-2 border-line bg-deep/25">
            <div className="poster-wrap pb-10 pt-8 md:pb-12 md:pt-10">
              <nav
                aria-label="面包屑"
                className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute"
              >
                <a href="./index.html" className="hover:text-gold">
                  首页
                </a>
                <span aria-hidden="true">/</span>
                <a href="./news.html" className="hover:text-gold">
                  新闻与动态
                </a>
                <span aria-hidden="true">/</span>
                <span className="text-gold">{article.category}</span>
              </nav>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="bg-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-night">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.06em] text-mute">
                  <CalendarDays size={13} strokeWidth={1.75} />
                  {article.dateDisplay}
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.06em] text-mute">
                  {article.readTime}
                </span>
              </div>

              <p className="eyebrow mt-6 flex items-center gap-2 text-gold">
                <LogoStar size={10} />
                {article.kicker}
              </p>
              <h1 className="display mt-3 max-w-5xl text-[clamp(38px,6vw,80px)] font-black leading-[1.05] tracking-[-0.01em]">
                {article.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-3xl text-[17px] leading-[1.8] text-bone/75 md:text-[19px]">
                {article.deck}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t-2 border-line pt-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">
                  供稿 / {article.byline}
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">
                  {article.dateLabel} · 上海
                </p>
              </div>
            </div>
          </header>

          <div className="poster-wrap">
            <Figure image={article.hero} wide priority />
          </div>

          <div className="poster-wrap pb-16 pt-4 md:pb-24">
            <ArticleBody article={article} />
          </div>
        </article>

        <CtaBand />
      </main>

      <Footer />
    </div>
  )
}
