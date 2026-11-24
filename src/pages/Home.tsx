import { Fragment } from 'react'
import { motion } from 'motion/react'
import {
  Accessibility,
  ArrowRight,
  CalendarDays,
  MapPin,
  Ticket,
  TrainFront,
  Video,
} from 'lucide-react'
import { Header } from '../components/Header'
import { PosterHeadline } from '../components/PosterHeadline'
import { Starfield } from '../components/Starfield'
import { Countdown } from '../components/Countdown'
import { Marquee } from '../components/Marquee'
import { SectionHead } from '../components/SectionHead'
import { SpeakerCard } from '../components/SpeakerCard'
import { PastNights } from '../components/PastNights'
import { AttendCards } from '../components/AttendCards'
import { FAQ } from '../components/FAQ'
import { CtaBand } from '../components/CtaBand'
import { Footer } from '../components/Footer'
import { MeteorQuestions } from '../components/MeteorQuestions'
import { RegistrationCountdown } from '../components/RegistrationCountdown'
import {
  about,
  attend,
  hero,
  mailto,
  site,
  speakers,
  thisYear,
  venue,
} from '../content'
import { externalLink } from '../lib/format'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useReducedMotion } from '../lib/useReducedMotion'

const factIcons: Record<string, typeof CalendarDays> = {
  calendar: CalendarDays,
  map: MapPin,
  online: Video,
  ticket: Ticket,
}

const venueIcons: Record<string, typeof MapPin> = {
  train: TrainFront,
  map: MapPin,
  accessibility: Accessibility,
}

function Hero() {
  const stacked = useMediaQuery('(max-width: 1023px)')

  return (
    <section className="relative overflow-hidden border-b-2 border-line">
      <Starfield />
      <div
        className="hero-orb"
        style={{
          top: '14%',
          right: '4%',
          width: 'min(68vw, 640px)',
          height: 'min(68vw, 640px)',
        }}
      />
      <div
        className="hero-ring"
        style={{ top: '9%', right: '0%', width: '54vw', height: '54vw' }}
      />
      <div
        className="hero-ring hero-ring--outer"
        style={{ top: '3%', right: '-6%', width: '66vw', height: '66vw' }}
      />

      <MeteorQuestions />

      <div className="poster-wrap relative flex min-h-[calc(100svh-64px)] flex-col py-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
          {hero.meta.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && <span className="h-3 w-px bg-line" />}
              <span className={index === 0 ? 'text-gold' : undefined}>
                {item}
              </span>
            </Fragment>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
          <p className="eyebrow mb-4 text-center text-gold">{hero.kicker}</p>
          {stacked ? (
            <div className="flex flex-col items-center">
              <PosterHeadline
                word="KEKE"
                maxFontSize={560}
                className="text-bone"
              />
              <PosterHeadline
                word="PHYSICS"
                maxFontSize={360}
                className="text-bone"
                heading={false}
              />
            </div>
          ) : (
            <PosterHeadline
              word={hero.word}
              maxFontSize={560}
              className="text-bone"
            />
          )}
          <div className="mt-5 text-center sm:mt-6">
            <p className="display text-[clamp(22px,3.4vw,44px)] font-extrabold tracking-[0.08em]">
              {hero.titleZh}
            </p>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-mute">
              {hero.titleEn}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 border-t-2 border-line pt-6 md:grid-cols-12 md:items-end">
          <p className="max-w-[40ch] text-[16px] leading-relaxed text-bone/90 md:col-span-7">
            {hero.intro}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-5 md:justify-end">
            <a
              href={hero.primary.href}
              {...externalLink(hero.primary.href)}
              className="btn-gold"
            >
              {hero.primary.label}
              <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
            </a>
            <a href={hero.secondary.href} className="btn-outline">
              {hero.secondary.label}
            </a>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 border-t-2 border-line sm:grid-cols-4">
          {hero.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                'px-4 py-4',
                index % 2 === 1 ? 'border-l-2 border-line' : '',
                index >= 2 ? 'border-t-2 border-line' : '',
                index > 0 ? 'sm:border-l-2 sm:border-line' : '',
                index >= 2 ? 'sm:border-t-0' : '',
              ].join(' ')}
            >
              <div className="display tabular text-[clamp(40px,5vw,64px)] font-black leading-none text-gold">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="section-pad border-b-2 border-line">
      <div className="poster-wrap">
        <SectionHead number="01" title="关于" eyebrow={about.eyebrow} />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="hidden lg:col-span-2 lg:block">
            <span className="eyebrow inline-block origin-center -rotate-90 whitespace-nowrap">
              {about.label}
            </span>
          </div>
          <motion.div
            className="lg:col-span-10"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <p className="display max-w-5xl text-[clamp(25px,3.2vw,44px)] font-semibold leading-[1.28]">
              {about.statement}
            </p>
            <p className="mt-5 max-w-3xl text-[15.5px] leading-relaxed text-mute">
              {about.statement2}
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {about.columns.map((column) => (
            <div key={column.title} className="border-t-2 border-line pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                {column.title}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">
                {column.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ThisYearSection() {
  return (
    <section
      id="this-year"
      className="section-pad border-b-2 border-line bg-deep/30"
    >
      <div className="poster-wrap">
        <SectionHead number="02" title="本届" eyebrow={thisYear.eyebrow} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="display text-[clamp(30px,4vw,54px)] font-extrabold leading-[1.08]">
              {thisYear.title}
            </h3>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-mute">
              {thisYear.intro}
            </p>

            <dl className="mt-8 grid grid-cols-1 border-t-2 border-line sm:grid-cols-2">
              {thisYear.facts.map((fact, index) => {
                const Icon = factIcons[fact.icon] ?? CalendarDays
                return (
                  <div
                    key={fact.label}
                    className={[
                      'flex items-start gap-3 border-b-2 border-line py-4',
                      index % 2 === 0
                        ? 'sm:border-r-2 sm:border-line sm:pr-6'
                        : 'sm:pl-6',
                    ].join(' ')}
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                      strokeWidth={1.75}
                    />
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[14px] font-medium leading-snug text-bone">
                        {fact.value}
                      </dd>
                    </div>
                  </div>
                )
              })}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={thisYear.cta.href}
                {...externalLink(thisYear.cta.href)}
                className="btn-gold"
              >
                {thisYear.cta.label}
                <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
              </a>
              <a href="./schedule.html" className="btn-outline">
                查看三年议程
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ol className="border-t-2 border-line">
              {thisYear.timeline.map((item) => (
                <li
                  key={item.title}
                  className="relative border-b-2 border-line py-5 pl-6"
                >
                  <span className="absolute left-0 top-6 h-2.5 w-2.5 bg-gold" />
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">
                    {item.date}
                  </p>
                  <p className="display mt-1 text-[20px] font-extrabold">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-mute">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpeakersSection() {
  return (
    <section id="speakers" className="section-pad border-b-2 border-line">
      <div className="poster-wrap">
        <SectionHead
          number="03"
          title="讲者"
          eyebrow="VOICES FROM 2024 & 2026"
        />

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-[15px] leading-relaxed text-mute">
            这里先放往届的八位讲者与他们的真实题目。2027
            的讲者正在征集中——如果你有想聊的题目，欢迎邮件申报。
          </p>
          <a
            href={mailto('报告申报 - 姓名')}
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-gold underline underline-offset-4"
          >
            2027 讲者征集中 →
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 border-l-2 border-t-2 border-line lg:grid-cols-4">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={`${speaker.name}-${speaker.edition}`}
              speaker={speaker}
            />
          ))}
        </div>

        <div className="mt-6 text-right">
          <a
            href="./schedule.html"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold underline underline-offset-4"
          >
            查看三年完整议程 →
          </a>
        </div>
      </div>
    </section>
  )
}

function ArchiveSection() {
  return (
    <section id="archive" className="section-pad border-b-2 border-line">
      <div className="poster-wrap">
        <SectionHead number="04" title="往届" eyebrow="2024 — 2026" />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-mute">
          两年，二十二场报告。完整的题目、讲者与时间都保留在议程页。
        </p>
        <div className="mt-10">
          <PastNights />
        </div>
      </div>
    </section>
  )
}

function VenueSection() {
  return (
    <section
      id="venue"
      className="section-pad border-b-2 border-line bg-deep/30"
    >
      <div className="poster-wrap">
        <SectionHead number="05" title="地点" eyebrow={venue.eyebrow} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="display text-[clamp(26px,3vw,40px)] font-extrabold leading-tight">
              {venue.name}
            </h3>
            <p className="mt-2 font-mono text-[11.5px] tracking-[0.04em] text-mute">
              {venue.address}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-mute">
              {venue.intro}
            </p>

            <ul className="mt-6 space-y-3">
              {venue.rows.map((row) => {
                const Icon = venueIcons[row.icon] ?? MapPin
                return (
                  <li
                    key={row.text}
                    className="flex items-start gap-3 text-[14px] leading-snug text-bone"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                      strokeWidth={1.75}
                    />
                    {row.text}
                  </li>
                )
              })}
            </ul>

            <div className="mt-7 border-t-2 border-line pt-4">
              <p className="eyebrow">{venue.onlineLabel}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-bone">
                {venue.onlineValue}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex h-full min-h-[320px] flex-col justify-between border-2 border-line bg-deep p-6 md:p-8">
              <div>
                <p className="eyebrow text-gold">ROOM</p>
                <p className="display mt-3 text-[clamp(80px,14vw,160px)] font-black leading-none text-gold">
                  {venue.room}
                </p>
                <p className="display mt-3 text-[20px] font-extrabold leading-tight">
                  {venue.roomLabel}
                </p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-mute">
                  {venue.address}
                </p>
              </div>

              <div className="mt-8 border-t-2 border-line pt-4">
                <p className="text-[13px] leading-relaxed text-mute">
                  地图链接会打开真实地图，搜索“上海交通大学致远学院”。校园较大，建议预留步行时间。
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {venue.mapLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center border-2 border-line px-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-bone transition-colors hover:border-gold hover:text-gold"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AttendSection() {
  return (
    <section id="attend" className="section-pad border-b-2 border-line">
      <div className="poster-wrap">
        <SectionHead number="06" title="报名" eyebrow={attend.eyebrow} />
        <h3 className="mt-8 max-w-3xl display text-[clamp(26px,3.4vw,44px)] font-extrabold leading-tight">
          {attend.title}
        </h3>
        <div className="mt-8">
          <RegistrationCountdown />
        </div>
        <div className="mt-8">
          <AttendCards />
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="faq" className="section-pad border-b-2 border-line">
      <div className="poster-wrap">
        <SectionHead number="07" title="问答" eyebrow="FAQ" />
        <div className="mt-10">
          <FAQ />
        </div>
      </div>
    </section>
  )
}

export function Home() {
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${site.nameZh} 2027`,
    startDate: site.dateISO,
    endDate: new Date(
      Date.parse(site.dateISO) + 4 * 60 * 60 * 1000,
    ).toISOString(),
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    description:
      '第三届咯咯物理奇妙夜：量子、天体、光子与凝聚态的年度夜谈。',
    location: {
      '@type': 'Place',
      name: site.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '东川路 800 号',
        addressLocality: '上海市闵行区',
        addressCountry: 'CN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: '致远物理咯咯',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
    },
    url: site.siteUrl,
  }

  return (
    <div className="min-h-screen bg-night text-bone">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        跳到主内容
      </a>
      <Header active="home" />
      <main id="main">
        <Hero />
        <Countdown />
        <Marquee />
        <AboutSection />
        <ThisYearSection />
        <SpeakersSection />
        <ArchiveSection />
        <VenueSection />
        <AttendSection />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}
