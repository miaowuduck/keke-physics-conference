import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { attend, mailto, site, tiers } from '../content'
import { cn } from '../lib/format'

const toneClasses: Record<string, string> = {
  gold: 'bg-gold text-night',
  volt: 'bg-voltlight text-night',
  ember: 'bg-gold text-night',
}

export function AttendCards() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openRegistration = () => {
    if (site.registrationUrl) {
      window.location.href = site.registrationUrl
      return
    }
    dialogRef.current?.showModal()
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier) => {
          const featured = Boolean(tier.featured)
          const buttonClass = cn(
            'w-full',
            featured ? 'btn-ink' : 'btn-gold',
          )

          return (
            <div
              key={tier.id}
              className={cn(
                'relative flex flex-col border-2 p-6 md:p-7',
                featured
                  ? 'border-gold bg-bone text-night'
                  : 'border-line bg-night text-bone',
              )}
            >
              <span
                className={cn(
                  'absolute -top-3 right-5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]',
                  toneClasses[tier.tone],
                )}
              >
                {tier.tag}
              </span>

              <p className="font-mono text-[12px] uppercase tracking-[0.16em]">
                {tier.name}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="display tabular whitespace-nowrap text-[clamp(40px,6vw,76px)] font-black leading-none">
                  {tier.price}
                </span>
                {tier.priceNote && (
                  <span className="shrink-0 text-[13px] opacity-70">
                    {tier.priceNote}
                  </span>
                )}
              </div>

              <div
                className={cn(
                  'mt-5 border-t-2',
                  featured ? 'border-night/25' : 'border-line',
                )}
              />

              <p className="mt-4 text-[16px] font-medium leading-snug">
                {tier.desc}
              </p>
              <p
                className={cn(
                  'mt-3 text-[13px] leading-relaxed',
                  featured ? 'text-night/70' : 'text-mute',
                )}
              >
                {tier.detail}
              </p>

              <div className="mt-auto pt-6">
                {tier.action === 'mail' ? (
                  <a
                    href={mailto(tier.subject ?? '咨询 - 2027 咯咯物理奇妙夜')}
                    className={buttonClass}
                  >
                    {tier.cta}
                    <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={openRegistration}
                    className={buttonClass}
                  >
                    {tier.cta}
                    <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-6 font-mono text-[12px] leading-relaxed text-mute">
        {attend.note}
      </p>

      <dialog
        ref={dialogRef}
        aria-labelledby="registration-dialog-title"
        className="m-auto w-[min(92vw,560px)] border-2 border-gold bg-night p-0 text-bone"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
      >
        <div className="p-7 sm:p-9">
          <p className="eyebrow text-gold">REGISTRATION</p>
          <h3
            id="registration-dialog-title"
            className="display mt-3 text-[30px] font-extrabold leading-tight"
          >
            {attend.dialogTitle}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-mute">
            {attend.dialogBody}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={mailto('报名 - 2027 咯咯物理奇妙夜')}
              className="btn-gold h-12 text-[14px]"
            >
              发邮件登记
            </a>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn-outline h-12 text-[14px]"
            >
              {attend.dialogClose}
            </button>
          </div>
          <p className="mt-4 font-mono text-[11px] text-mute">{site.email}</p>
        </div>
      </dialog>
    </div>
  )
}
