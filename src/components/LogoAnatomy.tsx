import { useId } from 'react'
import {
  BEAM_THIN,
  BEAM_WIDE,
  CUT_EDGE,
  EGG,
  LogoMark,
  ORBITS,
  STAR,
} from './LogoMark'

const CUT_LEFT = 'M 80 80 L 252 110 L 205 192 L 195 202 L 146 288 L 80 330 Z'
const CUT_RIGHT = 'M 252 110 L 320 80 L 320 330 L 146 288 L 195 202 L 205 192 Z'

const MONO = {
  rim: '#F2EEE0',
  field: '#C9C4B3',
  line: '#8C8672',
  egg: '#E9E4D4',
  bright: '#FCF9EC',
}

const CALLOUTS = [
  {
    no: '01',
    title: '星芒',
    en: 'Star of Wonder',
    body: '四芒星停在蛋壳破口的上端。它既是破壳的瞬间，也是“奇妙夜”迸出的那一点灵感；背后留出负空间，让它从轨道之间浮出来。',
    left: '57.75%',
    top: '36%',
  },
  {
    no: '02',
    title: '蛋形核心',
    en: 'Egg Silhouette',
    body: '吉祥物被压缩成一条卵形轮廓，午夜蓝填充。对小鸡而言是出生，对物理而言是宇宙起源与能量奇点。',
    left: '50%',
    top: '55%',
  },
  {
    no: '03',
    title: '三轨',
    en: 'Three Orbits',
    body: '三条椭圆以 −24°、36°、96° 交叠，对应三届，也对应原子轨道、能级跃迁与天体运行的同一种语法。',
    left: '82%',
    top: '50%',
  },
  {
    no: '04',
    title: '刻度',
    en: 'Measuring Ring',
    body: '内圈 12 个刻度按 30° 分布，四个正方向换成星点，借用天体仪与日晷的测量感，让徽章在放大后仍然耐看。',
    left: '50%',
    top: '13.2%',
  },
]

const LAYERS = [
  { no: 'L1', name: '外圈与刻度', en: 'Rim & Ticks' },
  { no: 'L2', name: '蛋形核心', en: 'Egg Core' },
  { no: 'L3', name: '三条轨道', en: 'Orbits' },
  { no: 'L4', name: '折光与星芒', en: 'Beam & Star' },
  { no: 'L5', name: '复合徽章', en: 'Composite' },
]

function Ticks({ color }: { color: string }) {
  return (
    <g fill={color} stroke={color}>
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
              opacity=".55"
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
            opacity=".45"
            transform={`rotate(${angle} 200 200)`}
          />
        )
      })}
    </g>
  )
}

export function LogoSchematic({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="第三届徽章白模结构示意：外圈、蛋形核心、三条轨道与星芒"
    >
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
        <radialGradient id={`${uid}-light`} cx="34%" cy="26%" r="74%">
          <stop offset="0" stopColor="#FFFDF4" stopOpacity=".42" />
          <stop offset=".55" stopColor="#FFFDF4" stopOpacity=".08" />
          <stop offset="1" stopColor="#FFFDF4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="164" fill={MONO.rim} />
      <circle cx="200" cy="200" r="156" fill={MONO.field} />

      <g clipPath={`url(#${uid}-inner)`}>
        <circle
          cx="200"
          cy="200"
          r="147"
          fill="none"
          stroke={MONO.line}
          strokeOpacity=".45"
          strokeWidth="1.1"
        />
        <Ticks color={MONO.line} />

        {ORBITS.map((orbit) => (
          <g
            key={`back-${orbit.angle}`}
            transform={`translate(200 200) rotate(${orbit.angle})`}
          >
            <g clipPath={`url(#${uid}-back)`}>
              <ellipse
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke={MONO.line}
                strokeWidth={orbit.width + 1}
                opacity=".6"
              />
            </g>
          </g>
        ))}

        <path
          d={BEAM_WIDE}
          fill="none"
          stroke={MONO.line}
          strokeWidth="8"
          strokeOpacity=".18"
          strokeLinecap="round"
        />
        <path
          d={BEAM_THIN}
          fill="none"
          stroke={MONO.bright}
          strokeWidth="1.6"
          strokeOpacity=".8"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />

        <g transform="translate(-4.64 -2.7)">
          <g clipPath={`url(#${uid}-left)`}>
            <path
              d={EGG}
              fill={MONO.egg}
              stroke={MONO.line}
              strokeWidth="2.4"
            />
          </g>
          <path
            d={CUT_EDGE}
            fill="none"
            stroke={MONO.line}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </g>
        <g transform="translate(4.64 2.7)">
          <g clipPath={`url(#${uid}-right)`}>
            <path
              d={EGG}
              fill={MONO.egg}
              stroke={MONO.line}
              strokeWidth="2.4"
            />
          </g>
          <path
            d={CUT_EDGE}
            fill="none"
            stroke={MONO.line}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </g>

        {ORBITS.map((orbit) => (
          <g
            key={`front-${orbit.angle}`}
            transform={`translate(200 200) rotate(${orbit.angle})`}
          >
            <g clipPath={`url(#${uid}-front)`}>
              <ellipse
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke={MONO.field}
                strokeWidth={orbit.width + 4.6}
              />
              <ellipse
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke={MONO.line}
                strokeWidth={orbit.width + 1}
              />
            </g>
          </g>
        ))}

        <g transform="translate(231 144)">
          <circle r="24" fill={MONO.field} />
          <path d={STAR} fill={MONO.bright} />
          <circle r="3.4" fill="#FFFFFF" />
        </g>

        <circle cx="200" cy="200" r="156" fill={`url(#${uid}-light)`} />
      </g>
    </svg>
  )
}

function LayerArt({ index }: { index: number }) {
  const line = MONO.line
  const stroke = { fill: 'none', stroke: line, strokeLinecap: 'round' as const }

  if (index === 0) {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <circle cx="200" cy="200" r="164" fill="none" stroke={MONO.rim} strokeWidth="12" />
        <circle cx="200" cy="200" r="147" fill="none" stroke={line} strokeWidth="3" opacity=".55" />
        <Ticks color={line} />
      </svg>
    )
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <path d={EGG} fill={MONO.egg} stroke={line} strokeWidth="9" />
        <path d={CUT_EDGE} {...stroke} strokeWidth="7" strokeLinejoin="miter" />
      </svg>
    )
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        {ORBITS.map((orbit) => (
          <ellipse
            key={orbit.angle}
            rx={orbit.rx}
            ry={orbit.ry}
            fill="none"
            stroke={MONO.rim}
            strokeWidth="5"
            opacity=".8"
            transform={`translate(200 200) rotate(${orbit.angle})`}
          />
        ))}
      </svg>
    )
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
        <path d="M 128 296 L 268 108" fill="none" stroke={line} strokeWidth="8" strokeLinecap="round" />
        <g transform="translate(200 200) scale(4.4)">
          <path d={STAR} fill={MONO.bright} />
          <circle r="3.4" fill="#FFFFFF" />
        </g>
      </svg>
    )
  }
  return <LogoMark size={200} className="h-full w-full" />
}

export function LogoAnatomy({ caption }: { caption: string }) {
  return (
    <figure className="my-10">
      <div className="border-2 border-line bg-deep/40">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-line px-4 py-3 sm:px-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            White Model / 白模拆解
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-mute">
            400 × 400 · 5 LAYERS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-square overflow-hidden border-b-2 border-line bg-[#0B1126] lg:border-b-0 lg:border-r-2">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(154,163,196,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(154,163,196,.08) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_46%,rgba(240,206,123,.07),transparent_70%)]"
            />
            <LogoSchematic className="relative z-10 h-full w-full drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]" />
            {CALLOUTS.map((item) => (
              <span
                key={item.no}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: item.left, top: item.top }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-night/95 font-mono text-[10px] font-bold text-gold shadow-[0_0_0_4px_rgba(240,206,123,0.14)]">
                  {item.no}
                </span>
              </span>
            ))}
          </div>

          <ol className="divide-y divide-line bg-night">
            {CALLOUTS.map((item) => (
              <li key={item.no} className="flex gap-4 px-4 py-5 sm:px-6">
                <span className="display shrink-0 text-[15px] font-black tabular-nums text-gold">
                  {item.no}
                </span>
                <div className="min-w-0">
                  <p className="display text-[18px] font-extrabold leading-none">
                    {item.title}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-mute">
                    {item.en}
                  </p>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-mute">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t-2 border-line p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            Layer Stack / 五层结构
          </p>
          <div className="mt-4 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
            {LAYERS.map((layer, index) => (
              <div
                key={layer.no}
                className={[
                  'bg-night p-3',
                  index === LAYERS.length - 1 ? 'col-span-2 sm:col-span-1' : '',
                ].join(' ')}
              >
                <div className="aspect-square border border-line/70 bg-[#0E1530] p-2">
                  <LayerArt index={index} />
                </div>
                <p className="mt-2.5 font-mono text-[9px] tracking-[0.14em] text-gold">
                  {layer.no}
                </p>
                <p className="mt-0.5 text-[12px] font-semibold leading-tight text-bone">
                  {layer.name}
                </p>
                <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-mute">
                  {layer.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex flex-col gap-1 border-l-2 border-gold pl-3 text-[12.5px] leading-relaxed text-mute sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <span>{caption}</span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-mute/70">
          图示：致远物理咯咯设计组
        </span>
      </figcaption>
    </figure>
  )
}
