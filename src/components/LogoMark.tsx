import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { cn } from '../lib/format'
import { useReducedMotion } from '../lib/useReducedMotion'

export const EGG =
  'M 200 116 C 235 116, 255 166, 255 220 C 255 267, 231 294, 200 294 C 169 294, 145 267, 145 220 C 145 166, 165 116, 200 116 Z'
export const CUT_EDGE = 'M 233 143 L 205 192 L 195 202 L 159 266'
const CUT_LEFT = 'M 80 80 L 252 110 L 205 192 L 195 202 L 146 288 L 80 330 Z'
const CUT_RIGHT = 'M 252 110 L 320 80 L 320 330 L 146 288 L 195 202 L 205 192 Z'
export const BEAM_WIDE = 'M 234 141 L 205 192 L 195 202 L 160 264'
export const BEAM_THIN = 'M 232 144 L 205 192 L 195 202 L 162 260'
export const SLASH = 'M 262 96 L 205 192 L 195 202 L 136 304'
export const STAR =
  'M 0 -29 C 3.4 -10.5, 10.5 -3.4, 29 0 C 10.5 3.4, 3.4 10.5, 0 29 C -3.4 10.5, -10.5 3.4, -29 0 C -10.5 -3.4, -3.4 -10.5, 0 -29 Z'

export const ORBITS = [
  { rx: 132, ry: 43, angle: -24, color: '#D9B45E', width: 1.5 },
  { rx: 134, ry: 45, angle: 36, color: '#F0CE7B', width: 1.7 },
  { rx: 130, ry: 43, angle: 96, color: '#F0CE7B', width: 1.7 },
]

type Play = 'none' | 'intro' | 'outro'

type Props = {
  size?: number
  className?: string
  title?: string
  play?: Play
  playOnView?: boolean
}

export function LogoMark({
  size = 44,
  className,
  title,
  play,
  playOnView = false,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const [state, setState] = useState<Play>(
    playOnView ? (reduced ? 'none' : 'outro') : (play ?? 'none'),
  )

  useEffect(() => {
    if (playOnView) return
    if (play) setState(play)
  }, [play, playOnView])

  useEffect(() => {
    if (!playOnView) return
    if (reduced) {
      setState('none')
      return
    }
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        setState(entry.isIntersecting ? 'intro' : 'outro')
      },
      { threshold: 0.3 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [playOnView, reduced])

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={cn(
        'logo-mark',
        state === 'intro' && 'is-intro',
        state === 'outro' && 'is-outro',
        className,
      )}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id={`${uid}-inner`}>
          <circle cx="200" cy="200" r="155.5" />
        </clipPath>
        <clipPath id={`${uid}-back`}>
          <rect x="-160" y="-160" width="320" height="162" />
        </clipPath>
        <clipPath id={`${uid}-front`}>
          <rect x="-160" y="-2" width="320" height="162" />
        </clipPath>
        <clipPath id={`${uid}-left`}>
          <path d={CUT_LEFT} />
        </clipPath>
        <clipPath id={`${uid}-right`}>
          <path d={CUT_RIGHT} />
        </clipPath>
      </defs>

      <g className="lm-pop">
        <circle className="lm-rim" cx="200" cy="200" r="164" fill="#F0CE7B" />
        <circle
          className="lm-field"
          cx="200"
          cy="200"
          r="156"
          fill="#10162F"
        />

        <g clipPath={`url(#${uid}-inner)`}>
          <circle
            className="lm-hairline"
            cx="200"
            cy="200"
            r="147"
            fill="none"
            stroke="#F0CE7B"
            strokeOpacity=".34"
            strokeWidth="1.1"
          />
          <g className="lm-ticks" fill="#F0CE7B" stroke="#F0CE7B">
            {Array.from({ length: 12 }, (_, index) => {
              const angle = index * 30
              if (index % 3 === 0) {
                const rad = (angle * Math.PI) / 180
                return (
                  <circle
                    key={angle}
                    cx={(200 + 147 * Math.cos(rad)).toFixed(2)}
                    cy={(200 + 147 * Math.sin(rad)).toFixed(2)}
                    r="2"
                    stroke="none"
                    opacity=".5"
                  />
                )
              }
              return (
                <line
                  key={angle}
                  x1="200"
                  y1="50.8"
                  x2="200"
                  y2="55.8"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity=".42"
                  transform={`rotate(${angle} 200 200)`}
                />
              )
            })}
          </g>

          {ORBITS.map((orbit, index) => (
            <g
              key={`back-${orbit.angle}`}
              transform={`translate(200 200) rotate(${orbit.angle})`}
            >
              <g clipPath={`url(#${uid}-back)`}>
                <ellipse
                  className="lm-orbit-line"
                  rx={orbit.rx}
                  ry={orbit.ry}
                  pathLength={1}
                  fill="none"
                  stroke={orbit.color}
                  strokeWidth={orbit.width}
                  opacity=".5"
                  style={
                    { '--lm-delay': `${index * 90}ms` } as CSSProperties
                  }
                />
              </g>
            </g>
          ))}

          <g className="lm-core">
            <path
              d={BEAM_WIDE}
              fill="none"
              stroke="#F0CE7B"
              strokeWidth="8"
              strokeOpacity=".16"
              strokeLinecap="round"
            />
            <path
              d={BEAM_THIN}
              fill="none"
              stroke="#E7E4D2"
              strokeWidth="1.2"
              strokeOpacity=".55"
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
            <g className="lm-core-a">
              <g clipPath={`url(#${uid}-left)`}>
                <path
                  className="lm-core-fill"
                  d={EGG}
                  fill="#212A54"
                  stroke="#F0CE7B"
                  strokeWidth="2.4"
                />
              </g>
              <path
                d={CUT_EDGE}
                fill="none"
                stroke="#F0CE7B"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="miter"
              />
            </g>
            <g className="lm-core-b">
              <g clipPath={`url(#${uid}-right)`}>
                <path
                  className="lm-core-fill"
                  d={EGG}
                  fill="#212A54"
                  stroke="#F0CE7B"
                  strokeWidth="2.4"
                />
              </g>
              <path
                d={CUT_EDGE}
                fill="none"
                stroke="#F0CE7B"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="miter"
              />
            </g>
          </g>

          {ORBITS.map((orbit, index) => (
            <g
              key={`front-${orbit.angle}`}
              className="lm-of"
              transform={`translate(200 200) rotate(${orbit.angle})`}
              style={{ '--lm-delay': `${index * 90}ms` } as CSSProperties}
            >
              <g clipPath={`url(#${uid}-front)`}>
                <ellipse
                  rx={orbit.rx}
                  ry={orbit.ry}
                  fill="none"
                  stroke="#10162F"
                  strokeWidth={orbit.width + 4}
                />
                <ellipse
                  className="lm-orbit-line"
                  rx={orbit.rx}
                  ry={orbit.ry}
                  pathLength={1}
                  fill="none"
                  stroke={orbit.color}
                  strokeWidth={orbit.width}
                />
              </g>
            </g>
          ))}

          <g transform="translate(231 144)">
            <circle className="lm-cavity" r="24" fill="#10162F" />
            <g className="lm-star-body">
              <path className="lm-star" d={STAR} fill="#F0CE7B" />
              <circle className="lm-star-core" r="3.4" fill="#E7E4D2" />
            </g>
          </g>

          <path
            className="lm-slash"
            d={SLASH}
            pathLength={1}
            fill="none"
            stroke="#FFF7D6"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </g>
      </g>
    </svg>
  )
}

export function LogoStar({
  size = 12,
  className,
  title,
}: {
  size?: number
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="-32 -32 64 64"
      width={size}
      height={size}
      className={cn('logo-star', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d={STAR} fill="currentColor" />
    </svg>
  )
}

type DecorativeProps = {
  size?: number
  className?: string
}

export function LogoOrbits({ size = 400, className }: DecorativeProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={cn('logo-orbits', className)}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor">
        <g transform="translate(200 200) rotate(-24)">
          <ellipse rx="132" ry="43" strokeWidth="2" opacity=".55" />
        </g>
        <g transform="translate(200 200) rotate(36)">
          <ellipse rx="134" ry="45" strokeWidth="2" opacity=".38" />
        </g>
        <g transform="translate(200 200) rotate(96)">
          <ellipse rx="130" ry="43" strokeWidth="2" opacity=".38" />
        </g>
      </g>
    </svg>
  )
}

export function LogoRing({ size = 400, className }: DecorativeProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={cn('logo-ring', className)}
      aria-hidden="true"
    >
      <circle
        cx="200"
        cy="200"
        r="158"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        opacity=".55"
      />
      <g fill="currentColor" stroke="currentColor">
        {Array.from({ length: 12 }, (_, index) => {
          const angle = index * 30
          if (index % 3 === 0) {
            const rad = (angle * Math.PI) / 180
            return (
              <circle
                key={angle}
                cx={(200 + 147 * Math.cos(rad)).toFixed(2)}
                cy={(200 + 147 * Math.sin(rad)).toFixed(2)}
                r="2.4"
                stroke="none"
                opacity=".6"
              />
            )
          }
          return (
            <line
              key={angle}
              x1="200"
              y1="50.8"
              x2="200"
              y2="55.8"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity=".45"
              transform={`rotate(${angle} 200 200)`}
            />
          )
        })}
      </g>
    </svg>
  )
}

