import { marquee } from '../content'
import { LogoStar } from './LogoMark'

export function Marquee() {
  const half = (
    <div className="flex shrink-0 items-center">
      {marquee.map((item) => (
        <div key={item} className="flex items-center">
          <span className="px-6 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-bone sm:px-8 sm:text-[15px]">
            {item}
          </span>
          <LogoStar size={15} className="shrink-0 text-gold" />
        </div>
      ))}
    </div>
  )

  return (
    <div className="marquee border-y-2 border-line bg-deeper py-3.5">
      <div className="marquee-track">
        {half}
        <div aria-hidden="true">{half}</div>
      </div>
    </div>
  )
}
