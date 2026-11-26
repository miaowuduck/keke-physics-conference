import { footer, site } from '../content'
import { LogoMark, LogoStar } from './LogoMark'

export function Footer() {
  return (
    <footer className="border-t-2 border-line bg-deeper pt-16 md:pt-20">
      <div className="poster-wrap">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <LogoMark size={46} playOnView />
              <span className="display text-[24px] font-black tracking-[0.02em]">
                KEKE
              </span>
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
                Physics
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-mute">
              {footer.tagline}
            </p>
            <p className="mt-3 max-w-[38ch] text-[12px] leading-relaxed text-mute/80">
              {footer.organizer}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block font-mono text-[13px] text-gold underline underline-offset-4 transition-colors hover:text-bone"
            >
              {site.email}
            </a>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title} className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-bone transition-colors hover:text-gold"
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line/70 py-5 font-mono text-[11px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <LogoStar size={9} className="text-gold" />
            {site.copyright}
          </p>
          <a
            href={footer.credit.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold"
          >
            {footer.credit.label}
          </a>
        </div>
      </div>

      <div className="mt-6 overflow-hidden" aria-hidden="true">
        <div className="display translate-y-[12%] select-none whitespace-nowrap text-center text-[clamp(110px,40vw,620px)] font-black leading-[0.65] text-bone/10">
          KEKE
        </div>
      </div>
    </footer>
  )
}
