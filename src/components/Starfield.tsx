import { useMemo, type CSSProperties } from 'react'

function mulberry32(seed: number) {
  return function random() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

type Star = {
  left: number
  top: number
  size: number
  duration: number
  delay: number
  opacity: number
  gold: boolean
}

export function Starfield({ count = 84 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    const random = mulberry32(20261226)
    return Array.from({ length: count }, (_, index) => ({
      left: random() * 100,
      top: random() * 100,
      size: 1 + random() * 1.6,
      duration: 3.2 + random() * 4.8,
      delay: -random() * 7,
      opacity: 0.18 + random() * 0.55,
      gold: index % 11 === 0,
    }))
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star, index) => {
        const style = {
          left: `${star.left}%`,
          top: `${star.top}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          background: star.gold ? '#F0CE7B' : '#E7E4D2',
          '--dur': `${star.duration}s`,
          '--delay': `${star.delay}s`,
        } as CSSProperties
        return <span key={index} className="star" style={style} />
      })}
    </div>
  )
}
