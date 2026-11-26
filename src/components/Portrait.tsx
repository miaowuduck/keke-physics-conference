import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { topics, type TopicKey } from '../content'

const BONE = '#E7E4D2'
const GOLD = '#F0CE7B'
const VOLT = '#7CC4F0'
const EMBER = '#EB6100'
const DEEP = '#212A54'

function hashName(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  return function random() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function starPath(cx: number, cy: number, radius: number) {
  const bend = radius * 0.36
  const tip = radius * 0.117
  return `M ${cx} ${cy - radius} C ${cx + tip} ${cy - bend}, ${cx + bend} ${
    cy - tip
  }, ${cx + radius} ${cy} C ${cx + bend} ${cy + tip}, ${cx + tip} ${
    cy + bend
  }, ${cx} ${cy + radius} C ${cx - tip} ${cy + bend}, ${cx - bend} ${
    cy + tip
  }, ${cx - radius} ${cy} C ${cx - bend} ${cy - tip}, ${cx - tip} ${
    cy - bend
  }, ${cx} ${cy - radius} Z`
}

type MotifProps = { random: () => number }

function QuantumMotif({ random }: MotifProps) {
  const cx = 118 + (random() - 0.5) * 14
  const cy = 150 + (random() - 0.5) * 12
  const tilt = (random() - 0.5) * 26
  const orbits = [0, 1, 2].map((index) => ({
    rx: 80 + index * 9,
    ry: 27 + index * 4,
    rotation: -30 + tilt + index * 31,
  }))

  return (
    <g>
      <path
        d={`M 22 ${cy + 76} C 58 ${cy + 42}, 80 ${cy + 108}, 120 ${
          cy + 74
        } S 182 ${cy + 40}, 218 ${cy + 74}`}
        fill="none"
        stroke={VOLT}
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />

      {orbits.map((orbit, orbitIndex) => (
        <g
          key={orbitIndex}
          transform={`rotate(${orbit.rotation} ${cx} ${cy})`}
        >
          <ellipse
            cx={cx}
            cy={cy}
            rx={orbit.rx}
            ry={orbit.ry}
            fill="none"
            stroke={orbitIndex === 0 ? BONE : VOLT}
            strokeOpacity={0.85 - orbitIndex * 0.18}
            strokeWidth={orbitIndex === 0 ? 2 : 1.4}
          />
          {orbitIndex < 2 &&
            Array.from({ length: 3 }, (_, particleIndex) => {
              const angle = random() * Math.PI * 2
              return (
                <circle
                  key={particleIndex}
                  cx={cx + Math.cos(angle) * orbit.rx}
                  cy={cy + Math.sin(angle) * orbit.ry}
                  r={particleIndex === 0 ? 3.2 : 2.2}
                  fill={particleIndex === 0 ? GOLD : BONE}
                  style={{ mixBlendMode: 'screen' }}
                />
              )
            })}
        </g>
      ))}

      <circle cx={cx} cy={cy} r="25" fill="none" stroke={BONE} strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="16" fill={GOLD} />
      <circle cx={cx} cy={cy} r="4" fill={DEEP} />
    </g>
  )
}

function AstroMotif({ random }: MotifProps) {
  const cx = 118 + (random() - 0.5) * 12
  const cy = 158 + (random() - 0.5) * 10
  const radius = 54 + random() * 10
  const tilt = -22 + (random() - 0.5) * 20

  const stars = Array.from({ length: 8 }, () => ({
    x: 22 + random() * 196,
    y: 22 + random() * 250,
    r: 3 + random() * 3.4,
    gold: random() > 0.5,
    opacity: 0.45 + random() * 0.45,
  }))

  return (
    <g>
      {stars.map((star, index) => (
        <path
          key={index}
          d={starPath(star.x, star.y, star.r)}
          fill={star.gold ? GOLD : BONE}
          opacity={star.opacity}
        />
      ))}

      <path
        d="M 24 264 C 64 238, 88 286, 132 258"
        fill="none"
        stroke={BONE}
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />

      <circle cx={cx} cy={cy} r={radius} fill={GOLD} />
      <circle
        cx={cx - radius * 0.36}
        cy={cy - radius * 0.34}
        r={radius * 0.88}
        fill={DEEP}
        opacity="0.3"
      />

      <g transform={`rotate(${tilt} ${cx} ${cy})`} fill="none">
        <ellipse
          cx={cx}
          cy={cy}
          rx={radius + 42}
          ry={radius * 0.22}
          stroke={VOLT}
          strokeWidth="3"
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={radius + 52}
          ry={radius * 0.28}
          stroke={BONE}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </g>

      <circle cx={cx + radius + 22} cy={cy - radius - 14} r="7" fill={BONE} />
      <circle
        cx={cx + radius + 22}
        cy={cy - radius - 14}
        r="11"
        fill="none"
        stroke={BONE}
        strokeOpacity="0.35"
      />
    </g>
  )
}

function PhotonicsMotif({ random }: MotifProps) {
  const px = 120 + (random() - 0.5) * 14
  const py = 172 + (random() - 0.5) * 8
  const entryY = py + 30 + (random() - 0.5) * 10
  const exits = [
    { y: py - 44, color: GOLD },
    { y: py + 2, color: VOLT },
    { y: py + 48, color: EMBER },
  ]

  return (
    <g>
      {Array.from({ length: 7 }, (_, index) => (
        <rect
          key={index}
          x={170 + index * 8}
          y={34}
          width={index % 2 === 0 ? 4 : 2}
          height={232}
          fill={BONE}
          opacity="0.08"
        />
      ))}

      <path
        d={`M 18 ${entryY} L ${px - 30} ${py + 10}`}
        stroke={GOLD}
        strokeWidth="3"
      />

      <polygon
        points={`${px - 30},${py + 26} ${px + 30},${py + 26} ${px},${py - 34}`}
        fill="none"
        stroke={BONE}
        strokeWidth="2.5"
      />

      <g style={{ mixBlendMode: 'screen' }}>
        {exits.map((exit, index) => (
          <g key={index}>
            <path
              d={`M ${px + 9} ${py + 7} L 222 ${exit.y}`}
              stroke={exit.color}
              strokeWidth="2.5"
            />
            <circle
              cx={px + 9 + (222 - px - 9) * 0.55}
              cy={py + 7 + (exit.y - py - 7) * 0.55}
              r="2.4"
              fill={exit.color}
            />
          </g>
        ))}
      </g>

      <circle cx={px - 30} cy={py + 10} r="3.2" fill={GOLD} />
    </g>
  )
}

function CondensedMotif({ random }: MotifProps) {
  const columns = 4
  const rows = 5
  const gap = 38
  const ox = 63 + (random() - 0.5) * 8
  const oy = 74 + (random() - 0.5) * 8
  const defect = Math.floor(random() * columns * rows)
  const tilt = (random() - 0.5) * 6

  return (
    <g>
      <g transform={`rotate(${tilt} 120 150)`}>
        {Array.from({ length: columns * rows }, (_, index) => {
          const column = index % columns
          const row = Math.floor(index / columns)
          const x = ox + column * gap
          const y = oy + row * gap
          const isDefect = index === defect
          return (
            <rect
              key={index}
              x={x - 5}
              y={y - 5}
              width="10"
              height="10"
              fill={isDefect ? GOLD : BONE}
              opacity={isDefect ? 1 : 0.4}
              style={isDefect ? { mixBlendMode: 'screen' } : undefined}
            />
          )
        })}

        {Array.from({ length: columns }, (_, index) => (
          <line
            key={`column-${index}`}
            x1={ox + index * gap}
            y1={oy - 18}
            x2={ox + index * gap}
            y2={oy + (rows - 1) * gap + 18}
            stroke={VOLT}
            strokeOpacity="0.18"
          />
        ))}
        {Array.from({ length: rows }, (_, index) => (
          <line
            key={`row-${index}`}
            x1={ox - 18}
            y1={oy + index * gap}
            x2={ox + (columns - 1) * gap + 18}
            y2={oy + index * gap}
            stroke={VOLT}
            strokeOpacity="0.18"
          />
        ))}
      </g>

      <path
        d="M 18 252 C 58 222, 80 282, 120 252 S 180 222, 222 252"
        fill="none"
        stroke={GOLD}
        strokeWidth="2"
        opacity="0.8"
      />
    </g>
  )
}

function CrossMotif({ random }: MotifProps) {
  const cx = 110 + (random() - 0.5) * 16
  const cy = 150 + (random() - 0.5) * 12
  const radius = 48 + random() * 10
  const rotation = -20 + random() * 40

  return (
    <g>
      <circle
        cx={cx - radius * 0.35}
        cy={cy - radius * 0.15}
        r={radius}
        fill={VOLT}
        opacity="0.85"
        style={{ mixBlendMode: 'screen' }}
      />
      <rect
        x={cx - radius * 0.2}
        y={cy - radius * 0.7}
        width={radius * 1.4}
        height={radius * 1.4}
        fill={GOLD}
        opacity="0.85"
        transform={`rotate(${rotation} ${cx} ${cy})`}
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points={`${cx + 50},${cy + 18} ${cx + 102},${cy + 98} ${
          cx - 2
        },${cy + 98}`}
        fill={BONE}
        opacity="0.8"
        style={{ mixBlendMode: 'screen' }}
      />

      {Array.from({ length: 4 }, (_, index) => (
        <path
          key={index}
          d={starPath(
            40 + random() * 160,
            40 + random() * 200,
            5 + random() * 5,
          )}
          fill={index === 0 ? GOLD : BONE}
          opacity="0.75"
        />
      ))}
    </g>
  )
}

function renderMotif(topic: TopicKey, random: () => number): ReactNode {
  switch (topic) {
    case 'quantum':
      return <QuantumMotif random={random} />
    case 'astro':
      return <AstroMotif random={random} />
    case 'photonics':
      return <PhotonicsMotif random={random} />
    case 'condensed':
      return <CondensedMotif random={random} />
    default:
      return <CrossMotif random={random} />
  }
}

export function Portrait({
  name,
  topic,
}: {
  name: string
  topic: TopicKey
}) {
  const { motif, turn } = useMemo(() => {
    const random = mulberry32(hashName(`${name}:${topic}`))
    const turn = (random() > 0.5 ? 1 : -1) * (6 + random() * 8)
    return { motif: renderMotif(topic, random), turn }
  }, [name, topic])

  return (
    <svg
      viewBox="0 0 240 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-full w-full"
    >
      <rect width="240" height="300" fill={DEEP} />

      <g
        className="portrait-shape"
        style={{
          transformOrigin: '120px 150px',
          '--turn': `${turn}deg`,
        } as CSSProperties}
      >
        {motif}
      </g>

      <rect x="20" y="20" width="8" height="8" fill={topics[topic].color} />
      <rect
        x="12"
        y="12"
        width="216"
        height="276"
        fill="none"
        stroke={BONE}
        strokeOpacity="0.45"
        strokeWidth="2"
      />
    </svg>
  )
}
