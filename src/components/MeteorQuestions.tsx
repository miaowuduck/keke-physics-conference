import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { questions } from '../content'
import { useReducedMotion } from '../lib/useReducedMotion'

type ShatterChar = {
  ch: string
  dx: number
  dy: number
  rot: number
  scale: number
}

type Spark = {
  sx: number
  sy: number
  delay: number
}

type Meteor = {
  id: number
  n: number
  chars: ShatterChar[]
  prefix: Omit<ShatterChar, 'ch'>
  sparks: Spark[]
  startY: number
  endY: number
  angle: number
  duration: number
  shatterAt: number
  bornAt: number
}

const MAX_METEORS = 3
const SPAWN_MS = 2600

function randomShatter(): Omit<ShatterChar, 'ch'> {
  return {
    dx: (Math.random() - 0.5) * 130,
    dy: (Math.random() - 0.5) * 100,
    rot: (Math.random() - 0.5) * 240,
    scale: 0.5 + Math.random() * 0.6,
  }
}

function makeMeteor(id: number, now: number): Meteor {
  const index = Math.floor(Math.random() * questions.length)
  const text = questions[index]
  const duration = 9 + Math.random() * 4
  const startY = 4 + Math.random() * 46
  const endY = Math.min(98, startY + 20 + Math.random() * 28)
  const shatterAt = 2.8 + Math.random() * 1.8
  const chars = Array.from(text).map((ch) => ({
    ch,
    ...randomShatter(),
  }))
  const sparks = Array.from({ length: 7 }, () => {
    const angle = Math.random() * Math.PI * 2
    const distance = 20 + Math.random() * 62
    return {
      sx: Math.cos(angle) * distance,
      sy: Math.sin(angle) * distance,
      delay: shatterAt + Math.random() * 0.12,
    }
  })

  const viewportWidth =
    typeof window !== 'undefined' ? window.innerWidth : 1440
  const viewportHeight =
    typeof window !== 'undefined' ? window.innerHeight : 900
  const dx = ((108 + 58) / 100) * viewportWidth
  const dy = ((endY - startY) / 100) * viewportHeight
  const angle = -(Math.atan2(dy, dx) * 180) / Math.PI

  return {
    id,
    n: index + 1,
    chars,
    prefix: randomShatter(),
    sparks,
    startY,
    endY,
    angle,
    duration,
    shatterAt,
    bornAt: now,
  }
}

export function MeteorQuestions() {
  const reduced = useReducedMotion()
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    if (reduced) {
      setMeteors([])
      return
    }

    const spawn = () => {
      const now = Date.now()
      setMeteors((current) => {
        const alive = current.filter(
          (meteor) => now - meteor.bornAt < meteor.duration * 1000 + 800,
        )
        if (alive.length >= MAX_METEORS) return alive
        idRef.current += 1
        return [...alive, makeMeteor(idRef.current, now)]
      })
    }

    const first = window.setTimeout(spawn, 700)
    const timer = window.setInterval(spawn, SPAWN_MS)

    return () => {
      window.clearTimeout(first)
      window.clearInterval(timer)
    }
  }, [reduced])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={
            {
              '--start-x': '108vw',
              '--end-x': '-58vw',
              '--start-y': `${meteor.startY}vh`,
              '--end-y': `${meteor.endY}vh`,
              '--angle': `${meteor.angle}deg`,
              '--duration': `${meteor.duration}s`,
              '--shatter-at': `${meteor.shatterAt}s`,
            } as CSSProperties
          }
        >
          <span className="meteor-dot" />

          <span className="meteor-text">
            <span
              className="meteor-char meteor-q"
              style={
                {
                  '--dx': `${meteor.prefix.dx}px`,
                  '--dy': `${meteor.prefix.dy}px`,
                  '--rot': `${meteor.prefix.rot}deg`,
                  '--scale': meteor.prefix.scale,
                  '--shatter-delay': `${meteor.shatterAt}s`,
                } as CSSProperties
              }
            >
              Q{String(meteor.n).padStart(2, '0')}
            </span>

            {meteor.chars.map((char, index) => (
              <span
                key={index}
                className="meteor-char"
                style={
                  {
                    '--dx': `${char.dx}px`,
                    '--dy': `${char.dy}px`,
                    '--rot': `${char.rot}deg`,
                    '--scale': char.scale,
                    '--shatter-delay': `${
                      meteor.shatterAt + index * 0.012
                    }s`,
                  } as CSSProperties
                }
              >
                {char.ch === ' ' ? ' ' : char.ch}
              </span>
            ))}
          </span>

          <span className="meteor-trail" />

          {meteor.sparks.map((spark, index) => (
            <span
              key={index}
              className="meteor-spark"
              style={
                {
                  '--sx': `${spark.sx}px`,
                  '--sy': `${spark.sy}px`,
                  '--spark-delay': `${spark.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}
