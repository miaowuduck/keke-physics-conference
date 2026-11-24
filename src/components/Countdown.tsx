import { useEffect, useMemo, useState } from 'react'
import { CalendarPlus } from 'lucide-react'
import { site } from '../content'
import { pad2 } from '../lib/format'
import { downloadIcs } from '../lib/ics'

const EVENT_HOURS = 4

export function Countdown() {
  const target = useMemo(() => Date.parse(site.dateISO), [])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const diff = target - now
  const eventEnd = target + EVENT_HOURS * 60 * 60 * 1000
  const live = now >= target && now < eventEnd
  const ended = now >= eventEnd

  const totalSeconds = Math.max(0, Math.floor(diff / 1000))
  const cells = [
    { value: Math.floor(totalSeconds / 86400), label: '天' },
    { value: Math.floor((totalSeconds % 86400) / 3600), label: '时' },
    { value: Math.floor((totalSeconds % 3600) / 60), label: '分' },
    { value: totalSeconds % 60, label: '秒' },
  ]

  const startCalendar = () => {
    const end = new Date(target + EVENT_HOURS * 60 * 60 * 1000).toISOString()
    downloadIcs({
      title: `${site.nameZh} 2027 · ${site.editionZh}`,
      description: `${site.nameEn} 2027。${site.venue}。${site.online}。`,
      location: `${site.venue}，${site.address}`,
      startISO: site.dateISO,
      endISO: end,
      filename: 'keke-physics-night-2027.ics',
    })
  }

  return (
    <section
      aria-label="活动倒计时"
      className="border-y-2 border-line bg-deeper"
    >
      <div className="poster-wrap flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow text-gold">COUNTDOWN</p>
          <p className="display mt-2 text-[26px] font-extrabold leading-none">
            {live
              ? '第三届奇妙夜，正在进行'
              : ended
                ? '第三届奇妙夜，已落幕'
                : '距离第三届奇妙夜'}
          </p>
          <p className="mt-2 font-mono text-[12px] tracking-[0.08em] text-mute">
            {site.dateLong} · {site.venue}
          </p>
        </div>

        {!live && !ended && (
          <div
            className="grid grid-cols-4 gap-2 sm:gap-4"
            aria-live="off"
            role="timer"
          >
            {cells.map((cell) => (
              <div
                key={cell.label}
                className="min-w-[64px] border-2 border-line px-2 py-2 text-center sm:min-w-[86px] sm:px-4"
              >
                <div className="display tabular text-[32px] font-black leading-none text-gold sm:text-[48px]">
                  {pad2(cell.value)}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                  {cell.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={startCalendar}
          className="btn-outline h-11 shrink-0 px-4 text-[13px]"
        >
          <CalendarPlus size={16} strokeWidth={1.75} />
          添加到日历
        </button>
      </div>
    </section>
  )
}
