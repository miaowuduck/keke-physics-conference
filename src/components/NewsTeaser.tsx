import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { NewsPicture } from './NewsPicture'
import { latestNews } from '../news'

export function NewsTeaser() {
  return (
    <section id="news" className="section-pad border-b-2 border-line">
      <div className="poster-wrap">
        <SectionHead number="08" title="新闻" eyebrow="KEKE NEWS" />

        <a
          href={latestNews.href}
          className="group mt-10 grid grid-cols-1 border-2 border-line bg-deep/25 transition-colors hover:border-gold/70 md:grid-cols-12"
        >
          <div className="relative overflow-hidden border-b-2 border-line md:col-span-5 md:border-b-0 md:border-r-2">
            <NewsPicture
              image={latestNews.hero}
              sizes="(max-width: 767px) 100vw, 560px"
              className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:absolute md:inset-0 md:aspect-auto md:h-full"
            />
            <span className="absolute left-3 top-3 bg-gold px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-night">
              {latestNews.category}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 p-5 sm:p-6 md:col-span-7 md:p-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                {latestNews.dateLabel} · {latestNews.kicker}
              </p>
              <h3 className="display mt-3 text-[clamp(24px,2.6vw,36px)] font-extrabold leading-[1.14]">
                <span className="sm:hidden">
                  {latestNews.titleLines[0]}
                  <br />
                  {latestNews.titleLines[1]}
                </span>
                <span className="hidden sm:inline">{latestNews.title}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-mute">
                {latestNews.deck}
              </p>
            </div>

            <div className="flex items-center justify-between border-t-2 border-line pt-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-bone">
                阅读全文
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center border-2 border-line text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-night">
                <ArrowRight size={15} strokeWidth={2} />
              </span>
            </div>
          </div>
        </a>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
            第 03 届 · 筹备日志持续更新
          </p>
          <a
            href="./news.html"
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-gold underline underline-offset-4 hover:text-bone"
          >
            全部新闻
            <ArrowRight size={14} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  )
}
