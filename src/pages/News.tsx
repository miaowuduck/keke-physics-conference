import { Fragment } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Header } from '../components/Header'
import { LogoRing, LogoStar } from '../components/LogoMark'
import { NewsPicture } from '../components/NewsPicture'
import { PosterHeadline } from '../components/PosterHeadline'
import { Starfield } from '../components/Starfield'
import { SectionHead } from '../components/SectionHead'
import { CtaBand } from '../components/CtaBand'
import { Footer } from '../components/Footer'
import { latestNews, newsArticles, newsPage } from '../news'
import { site } from '../content'

export function News() {
  return (
    <div className="min-h-screen bg-night text-bone">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        跳到主内容
      </a>
      <Header active="news" />

      <main id="main">
        <section className="relative overflow-hidden border-b-2 border-line">
          <Starfield />
          <LogoRing
            size={720}
            className="pointer-events-none absolute -right-40 -top-52 hidden text-gold opacity-[0.08] lg:block"
          />
          <div className="poster-wrap relative pb-12 pt-8 md:pb-16 md:pt-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
              {newsPage.meta.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 && <span className="h-3 w-px bg-line" />}
                  <span className={index === 0 ? 'text-gold' : undefined}>
                    {item}
                  </span>
                </Fragment>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow flex items-center gap-2 text-gold">
                  <LogoStar size={10} />
                  {newsPage.kicker}
                </p>
                <div className="mt-3">
                  <PosterHeadline
                    word={newsPage.word}
                    maxFontSize={300}
                    className="text-bone"
                    heading={false}
                  />
                </div>
                <h1 className="display mt-4 text-[clamp(26px,3.5vw,46px)] font-extrabold tracking-[0.02em]">
                  {newsPage.titleZh}
                </h1>
                <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-mute">
                  {newsPage.intro}
                </p>
              </div>

              <div className="hidden lg:col-span-5 lg:block">
                <div className="relative mx-auto max-w-[360px]">
                  <div className="absolute -inset-3 border-2 border-line" />
                  <div className="relative overflow-hidden border-2 border-gold/60">
                    <picture>
                      <source
                        type="image/avif"
                        srcSet="./images/news/poster-360.avif 360w, ./images/news/poster-720.avif 720w"
                        sizes="360px"
                      />
                      <source
                        type="image/webp"
                        srcSet="./images/news/poster-360.webp 360w, ./images/news/poster-720.webp 720w"
                        sizes="360px"
                      />
                      <img
                        src="./images/news/poster.jpg"
                        alt="小鸡在星球上用望远镜望向金色星空的插画"
                        width={1024}
                        height={1536}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[2/3] w-full object-cover"
                      />
                    </picture>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deeper/90 to-transparent p-4 pt-14">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                        Third edition
                      </p>
                      <p className="display mt-1 text-[20px] font-extrabold leading-none">
                        2026.12.26
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad border-b-2 border-line">
          <div className="poster-wrap">
            <SectionHead number="01" title="最新" eyebrow="LATEST STORY" />

            <a
              href={latestNews.href}
              className="group mt-10 grid grid-cols-1 border-2 border-line bg-deep/25 transition-colors hover:border-gold/70 lg:grid-cols-12"
            >
              <div className="relative overflow-hidden border-b-2 border-line lg:col-span-7 lg:border-b-0 lg:border-r-2">
                <NewsPicture
                  image={latestNews.hero}
                  priority
                  sizes="(max-width: 1023px) 100vw, 800px"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                />
                <span className="absolute left-4 top-4 bg-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-night">
                  最新发布
                </span>
              </div>

              <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:col-span-5">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                    <span className="text-gold">{latestNews.category}</span>
                    <span className="h-3 w-px bg-line" />
                    <span>{latestNews.dateLabel}</span>
                    <span className="h-3 w-px bg-line" />
                    <span>{latestNews.readTime}</span>
                  </div>
                  <h3 className="display mt-4 text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.12]">
                    <span className="sm:hidden">
                      {latestNews.titleLines[0]}
                      <br />
                      {latestNews.titleLines[1]}
                    </span>
                    <span className="hidden sm:inline">{latestNews.title}</span>
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-mute">
                    {latestNews.deck}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 border-l-2 border-t-2 border-line">
                    {latestNews.keyFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="border-b-2 border-r-2 border-line px-3 py-2.5"
                      >
                        <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute">
                          {fact.label}
                        </dt>
                        <dd className="mt-0.5 text-[11.5px] font-medium leading-snug text-bone">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex items-center justify-between border-t-2 border-line pt-4">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone">
                    阅读全文
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center border-2 border-line text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-night">
                    <ArrowRight size={16} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {newsArticles.length > 1 && (
          <section className="section-pad border-b-2 border-line">
            <div className="poster-wrap">
              <SectionHead number="02" title="更多报道" eyebrow="MORE STORIES" />

              <div className="mt-8 divide-y-2 divide-line border-2 border-line">
                {newsArticles
                  .filter((article) => article.slug !== latestNews.slug)
                  .map((article) => (
                    <a
                      key={article.slug}
                      href={article.href}
                      className="group grid grid-cols-1 transition-colors hover:bg-deep/40 md:grid-cols-12"
                    >
                      <div className="relative overflow-hidden border-b-2 border-line md:col-span-4 md:border-b-0 md:border-r-2">
                        <NewsPicture
                          image={article.hero}
                          sizes="(max-width: 767px) 100vw, 380px"
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:absolute md:inset-0 md:aspect-auto md:h-full"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col justify-between gap-4 p-5 md:col-span-8 md:p-7">
                        <div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                            <span className="text-gold">{article.category}</span>
                            <span className="h-3 w-px bg-line" />
                            <span>{article.dateLabel}</span>
                            <span className="h-3 w-px bg-line" />
                            <span>{article.readTime}</span>
                          </div>
                          <h3 className="display mt-2.5 text-[clamp(21px,2.2vw,30px)] font-extrabold leading-[1.15] transition-colors group-hover:text-gold">
                            {article.title}
                          </h3>
                          <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-mute">
                            {article.deck}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone">
                          阅读全文
                          <ArrowRight size={14} strokeWidth={1.75} />
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-pad border-b-2 border-line bg-deep/20">
          <div className="poster-wrap">
            <SectionHead number="03" title="预告" eyebrow="COMING UP" />

            <div className="mt-10 grid grid-cols-1 gap-px border-2 border-line bg-line md:grid-cols-3">
              {newsPage.upcoming.map((item, index) => (
                <div key={item.title} className="relative bg-night p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">
                      {item.date}
                    </p>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-mute">
                      即将发布
                    </span>
                  </div>
                  <p className="display mt-4 text-[22px] font-extrabold leading-tight">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-mute">
                    {item.body}
                  </p>
                  <span className="display absolute right-5 top-16 text-[64px] font-black leading-none text-bone/[0.04]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-2 border-line p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <p className="eyebrow flex items-center gap-2 text-gold">
                  <LogoStar size={9} />
                  {newsPage.contact.title}
                </p>
                <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-mute">
                  {newsPage.contact.body}
                </p>
              </div>
              <a
                href={`mailto:${newsPage.contact.email}?subject=${encodeURIComponent('新闻联络')}`}
                className="inline-flex shrink-0 items-center gap-2 border-2 border-line px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-bone transition-colors hover:border-gold hover:text-gold"
              >
                <Mail size={14} strokeWidth={1.75} />
                {newsPage.contact.email}
              </a>
            </div>

            <p className="mt-6 font-mono text-[10.5px] leading-relaxed text-mute/80">
              活动时间、地点与议程以本栏目及公众号“致远物理咯咯”发布为准。官网：{site.siteUrl}
            </p>
          </div>
        </section>

        <CtaBand />
      </main>

      <Footer />
    </div>
  )
}
