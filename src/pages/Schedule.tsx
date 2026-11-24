import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Header } from '../components/Header'
import { PosterHeadline } from '../components/PosterHeadline'
import { TopicMark } from '../components/TopicMark'
import { CtaBand } from '../components/CtaBand'
import { Footer } from '../components/Footer'
import {
  editions,
  mailto,
  schedulePage,
  topicOrder,
  topics,
  type EditionId,
  type Session,
  type TopicKey,
} from '../content'
import { durationLabel } from '../lib/format'
import { useReducedMotion } from '../lib/useReducedMotion'

function isEditionId(value: string): value is EditionId {
  return editions.some((edition) => edition.id === value)
}

function SessionRow({
  session,
  reduced,
}: {
  session: Session
  reduced: boolean
}) {
  const isBreak =
    session.kind === 'break' ||
    session.kind === 'opening' ||
    session.kind === 'discussion'

  if (isBreak) {
    return (
      <motion.div
        layout={!reduced}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: reduced ? 0 : 0.18 }}
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 border-line bg-deep/60 px-4 py-3"
      >
        <span className="font-mono text-[12.5px] tabular text-mute">
          {session.start}
          {session.end ? `–${session.end}` : '–'}
        </span>
        <span className="display text-[18px] font-extrabold text-bone">
          {session.titleZh}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mute">
          {durationLabel(session.start, session.end)}
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: reduced ? 0 : 0.18 }}
      className="session-row grid grid-cols-1 gap-x-4 gap-y-2 border-t-2 border-line py-5 pl-4 md:grid-cols-12"
    >
      <div className="md:col-span-2">
        <div className="display tabular text-[28px] font-extrabold leading-none md:text-[38px]">
          {session.start}
        </div>
        <div className="mt-1 font-mono text-[10.5px] text-mute">
          {session.end ? `– ${session.end}` : '–'}
        </div>
      </div>

      <div className="flex items-center gap-2 md:col-span-2">
        <TopicMark topic={session.topic} size={9} />
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-mute">
          {topics[session.topic].zh}
        </span>
      </div>

      <div className="md:col-span-7">
        <p className="display text-[20px] font-extrabold leading-snug md:text-[26px]">
          {session.titleZh}
        </p>
        {session.titleEn && (
          <p className="mt-1 text-[12px] leading-snug text-mute">
            {session.titleEn}
          </p>
        )}
        {session.speaker && (
          <p className="mt-2 text-[13px] font-medium text-bone">
            {session.speaker}
          </p>
        )}
      </div>

      <div className="font-mono text-[10.5px] text-mute md:col-span-1 md:text-right">
        {durationLabel(session.start, session.end)}
      </div>
    </motion.div>
  )
}

export function Schedule() {
  const [year, setYear] = useState<EditionId>('2027')
  const [selected, setSelected] = useState<TopicKey[]>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    const hash = window.location.hash.replace('#year-', '')
    if (isEditionId(hash)) setYear(hash)
  }, [])

  const edition = useMemo(
    () => editions.find((item) => item.id === year) ?? editions[0],
    [year],
  )

  const selectYear = (id: EditionId) => {
    setYear(id)
    setSelected([])
    window.history.replaceState(null, '', `#year-${id}`)
  }

  const toggleTopic = (topic: TopicKey) => {
    setSelected((current) =>
      current.includes(topic)
        ? current.filter((item) => item !== topic)
        : [...current, topic],
    )
  }

  const totalTalks = edition.sessions.filter(
    (session) => session.kind === 'talk',
  ).length

  const visibleSessions = edition.sessions.filter(
    (session) =>
      session.kind !== 'talk' ||
      selected.length === 0 ||
      selected.includes(session.topic),
  )

  const shownTalks = visibleSessions.filter(
    (session) => session.kind === 'talk',
  ).length

  const filteredEmpty = totalTalks > 0 && shownTalks === 0

  return (
    <div className="min-h-screen bg-night text-bone">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        跳到主内容
      </a>
      <Header active="schedule" />

      <main id="main">
        <section className="border-b-2 border-line">
          <div className="poster-wrap py-10 md:py-14">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
              {schedulePage.meta.map((item, index) => (
                <span key={item} className="flex items-center gap-4">
                  {index > 0 && <span className="h-3 w-px bg-line" />}
                  <span className={index === 0 ? 'text-gold' : undefined}>
                    {item}
                  </span>
                </span>
              ))}
            </div>

            <div className="relative mt-8">
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 hidden h-16 w-16 bg-gold sm:block"
              />
              <p className="eyebrow mb-4 text-gold">{schedulePage.kicker}</p>
              <PosterHeadline
                word={schedulePage.word}
                maxFontSize={320}
                className="text-bone"
              />
              <div className="mt-6 flex flex-col gap-4 border-t-2 border-line pt-6 md:flex-row md:items-end md:justify-between">
                <h2 className="display text-[clamp(28px,4vw,48px)] font-extrabold leading-none">
                  {schedulePage.titleZh}
                </h2>
                <p className="max-w-2xl text-[14px] leading-relaxed text-mute">
                  {schedulePage.intro}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="议程筛选与列表">
          <div className="sticky top-16 z-40 border-b-2 border-line bg-night/95 backdrop-blur-md">
            <div className="poster-wrap py-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex gap-2 overflow-x-auto no-scrollbar"
                    role="tablist"
                    aria-label="选择年份"
                  >
                    {editions.map((item) => {
                      const active = item.id === year
                      return (
                        <button
                          key={item.id}
                          id={`year-tab-${item.id}`}
                          data-year={item.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-controls="session-list"
                          tabIndex={active ? 0 : -1}
                          onClick={() => selectYear(item.id)}
                          onKeyDown={(event) => {
                            if (
                              event.key !== 'ArrowLeft' &&
                              event.key !== 'ArrowRight'
                            ) {
                              return
                            }
                            event.preventDefault()
                            const index = editions.findIndex(
                              (entry) => entry.id === item.id,
                            )
                            const offset =
                              event.key === 'ArrowRight' ? 1 : -1
                            const next =
                              editions[
                                (index + offset + editions.length) %
                                  editions.length
                              ]
                            selectYear(next.id)
                            document
                              .getElementById(`year-tab-${next.id}`)
                              ?.focus()
                          }}
                          className={`tab ${active ? 'tab-active' : ''}`}
                        >
                          {item.label}
                          {item.status === 'upcoming' && (
                            <span className="ml-2 inline-block h-1.5 w-1.5 bg-ember" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                  <span className="ml-auto hidden shrink-0 font-mono text-[10.5px] text-mute sm:block">
                    {schedulePage.shown(shownTalks, totalTalks)}
                  </span>
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    aria-pressed={selected.length === 0}
                    className={`chip ${
                      selected.length === 0 ? 'chip-active' : ''
                    }`}
                  >
                    {schedulePage.allTopics}
                  </button>
                  {topicOrder.map((topic) => {
                    const active = selected.includes(topic)
                    return (
                      <button
                        key={topic}
                        data-topic={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        aria-pressed={active}
                        className={`chip ${active ? 'chip-active' : ''}`}
                      >
                        <TopicMark
                          topic={topic}
                          size={8}
                          monochrome={active}
                        />
                        {topics[topic].zh}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="poster-wrap py-10 md:py-14">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] leading-relaxed text-mute">
                {edition.intro}
              </p>
              <p className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mute">
                {edition.dateLabel} · {edition.online}
              </p>
            </div>

            {edition.sessions.length === 0 ? (
              <div
                id="session-list"
                role="tabpanel"
                aria-labelledby={`year-tab-${edition.id}`}
                className="border-t-2 border-line py-16 text-center"
              >
                <p className="eyebrow text-gold">2027 · UPCOMING</p>
                <h3 className="display mx-auto mt-4 max-w-3xl text-[clamp(28px,4vw,48px)] font-extrabold leading-tight">
                  {schedulePage.emptyTitle}
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-mute">
                  {schedulePage.emptyBody}
                </p>
                <a
                  href={mailto('报告申报 - 姓名')}
                  className="btn-gold mt-8"
                >
                  {schedulePage.emptyCta}
                  <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
                </a>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => selectYear('2026')}
                    className="btn-outline h-11 px-4 text-[13px]"
                  >
                    查看 2026 议程
                  </button>
                  <button
                    type="button"
                    onClick={() => selectYear('2024')}
                    className="btn-outline h-11 px-4 text-[13px]"
                  >
                    查看 2024 议程
                  </button>
                </div>
              </div>
            ) : (
              <div
                id="session-list"
                role="tabpanel"
                aria-labelledby={`year-tab-${edition.id}`}
              >
                {filteredEmpty && (
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-line bg-deep/60 px-4 py-4">
                    <p className="text-[14px] text-mute">
                      没有符合当前议题的报告。
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected([])}
                      className="btn-outline h-10 px-4 text-[12px]"
                    >
                      清除筛选
                    </button>
                  </div>
                )}

                <AnimatePresence initial={false} mode="popLayout">
                  {visibleSessions.map((session) => (
                    <SessionRow
                      key={session.id}
                      session={session}
                      reduced={reduced}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        <CtaBand />
      </main>

      <Footer />
    </div>
  )
}
