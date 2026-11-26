import { ArrowRight } from 'lucide-react'
import { site } from '../content'
import { pad2 } from '../lib/format'
import { useCountdown } from '../lib/useCountdown'
import { LogoStar } from './LogoMark'

export function RegistrationCountdown() {
  const { cells, closed } = useCountdown(site.registrationDeadlineISO)

  return (
    <div className="relative border-2 border-gold bg-deep p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="eyebrow flex items-center gap-2 text-gold">
            <LogoStar size={9} />
            REGISTRATION DEADLINE
          </p>
          <p className="display mt-2 text-[24px] font-extrabold leading-tight">
            {closed ? '问卷已截止' : '问卷收集倒计时'}
          </p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.04em] text-mute">
            {site.registrationDeadlineLong} 截止
          </p>
        </div>

        <a
          href={site.registrationUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-gold h-12 shrink-0 px-5 text-[14px]"
        >
          填写报名问卷
          <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
        </a>
      </div>

      {closed ? (
        <p className="mt-5 border-t-2 border-line pt-4 text-[14px] leading-relaxed text-mute">
          问卷已截止。仍可通过{' '}
          <a
            href={`mailto:${site.email}`}
            className="text-gold underline underline-offset-4"
          >
            {site.email}
          </a>{' '}
          联系我们。
        </p>
      ) : (
        <div
          className="mt-5 grid grid-cols-4 gap-2 sm:gap-3"
          role="timer"
          aria-live="off"
        >
          {cells.map((cell) => (
            <div
              key={cell.key}
              className="border border-line px-2 py-2 text-center"
            >
              <div className="display tabular text-[28px] font-black leading-none text-gold sm:text-[34px]">
                {pad2(cell.value)}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-mute">
                {cell.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
