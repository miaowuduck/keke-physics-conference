import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { editions, topicOrder, topics, type Edition } from '../content'
import { useReducedMotion } from '../lib/useReducedMotion'

const milestones = [
  { date: '2024.12.07', label: '第一届', note: '第一次点亮' },
  { date: '2025.12.06', label: '第二届', note: '第二次共振' },
  { date: '2026.12.26', label: '第三届', note: '第三次相聚', current: true },
]

function TopicBars({ edition }: { edition: Edition }) {
  const counts = topicOrder.map((topic) => ({
    topic,
    count: edition.sessions.filter(
      (session) => session.kind === 'talk' && session.topic === topic,
    ).length,
  }))
  const total = counts.reduce((sum, item) => sum + item.count, 0)

  if (!total) return null

  return (
    <div className="mt-5">
      <div className="flex h-2 w-full overflow-hidden bg-line/40">
        {counts.map(({ topic, count }) =>
          count > 0 ? (
            <span
              key={topic}
              style={{
                width: `${(count / total) * 100}%`,
                background: topics[topic].color,
              }}
            />
          ) : null,
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {counts
          .filter((item) => item.count > 0)
          .map(({ topic, count }) => (
            <span
              key={topic}
              className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-mute"
            >
              {topics[topic].zh} {count}
            </span>
          ))}
      </div>
    </div>
  )
}

export function PastNights() {
  const reduced = useReducedMotion()
  const past = editions.filter((edition) => edition.status === 'past')

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-4 border-t-2 border-line pt-4 sm:grid-cols-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.date}
            className="flex items-start gap-3 sm:block"
          >
            <div className="flex items-center gap-3">
              <span
                className={
                  milestone.current
                    ? 'inline-block h-3 w-3 bg-gold'
                    : 'inline-block h-3 w-3 border-2 border-line'
                }
              />
              <span className="font-mono text-[11px] tracking-[0.08em] text-mute">
                {milestone.date}
              </span>
            </div>
            <div className="sm:mt-2 sm:pl-6">
              <p
                className={
                  milestone.current
                    ? 'display text-[20px] font-extrabold text-gold'
                    : 'display text-[20px] font-extrabold text-bone'
                }
              >
                {milestone.label}
              </p>
              <p className="text-[12px] text-mute">{milestone.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {past.map((edition, index) => (
          <motion.a
            key={edition.id}
            href={`./schedule.html#year-${edition.id}`}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group block border-2 border-line p-6 transition-colors hover:bg-deep md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{edition.label}</p>
                <p className="display mt-2 text-[clamp(64px,9vw,132px)] font-black leading-none text-gold">
                  {edition.id}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {edition.id === '2026' && (
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="./images/logo_2026-128.avif 128w, ./images/logo_2026-192.avif 192w"
                      sizes="64px"
                    />
                    <source
                      type="image/webp"
                      srcSet="./images/logo_2026-128.webp 128w, ./images/logo_2026-192.webp 192w"
                      sizes="64px"
                    />
                    <img
                      src="./images/logo_2026-128.png"
                      alt="第二届咯咯物理奇妙夜徽记"
                      width={128}
                      height={128}
                      className="h-16 w-16 rounded-full border-2 border-gold object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                )}
                <ArrowUpRight
                  className="h-7 w-7 text-mute transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                  strokeWidth={1.75}
                />
              </div>
            </div>

            <p className="mt-4 font-mono text-[12px] tracking-[0.06em] text-bone">
              {edition.dateLong} · {edition.venue}
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-mute">
              {edition.intro}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t-2 border-line pt-4">
              <div>
                <div className="display tabular text-[32px] font-black leading-none">
                  {edition.stats.talks}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                  场报告
                </div>
              </div>
              <div>
                <div className="font-mono text-[15px] font-bold leading-tight text-bone">
                  {edition.stats.span}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                  时间
                </div>
              </div>
              <div>
                <div className="display text-[32px] font-black leading-none">
                  {edition.stats.topics}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                  议题
                </div>
              </div>
            </div>

            <TopicBars edition={edition} />

            <ul className="mt-5 space-y-1.5">
              {edition.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-[13px] text-mute"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-gold" />
                  {highlight}
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              查看完整议程 →
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
