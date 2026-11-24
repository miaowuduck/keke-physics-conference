import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../lib/format'
import { useReducedMotion } from '../lib/useReducedMotion'

type Props = {
  word: string
  maxFontSize?: number
  className?: string
  heading?: boolean
}

export function PosterHeadline({
  word,
  maxFontSize = 300,
  className,
  heading = true,
}: Props) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLElement | null>(null)
  const setRowRef = (element: HTMLElement | null) => {
    rowRef.current = element
  }
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([])
  const currentRef = useRef(
    word.split('').map(() => ({ wght: 720, wdth: 105 })),
  )
  const pointerRef = useRef({ x: -9999, y: -9999 })
  const [ready, setReady] = useState(false)
  const letters = word.split('')

  useLayoutEffect(() => {
    currentRef.current = letters.map(() => ({ wght: 720, wdth: 105 }))
  }, [word])

  useLayoutEffect(() => {
    const applyFit = () => {
      const wrap = wrapRef.current
      const row = rowRef.current
      if (!wrap || !row) return

      const previousWidth = row.style.width
      row.style.width = 'max-content'
      row.style.fontSize = `${maxFontSize}px`
      letterRefs.current.forEach((element) => {
        if (element) {
          element.style.fontVariationSettings = "'wght' 900, 'wdth' 140"
        }
      })

      const contentWidth = row.scrollWidth
      const available = wrap.clientWidth
      const fitted =
        contentWidth > 0
          ? Math.min(maxFontSize, (maxFontSize * available) / contentWidth)
          : maxFontSize

      row.style.fontSize = `${Math.max(24, fitted)}px`
      row.style.width = previousWidth
      letterRefs.current.forEach((element) => {
        if (element) {
          element.style.fontVariationSettings = reduced
            ? "'wght' 820, 'wdth' 120"
            : "'wght' 720, 'wdth' 105"
        }
      })
      setReady(true)
    }

    applyFit()
    window.addEventListener('resize', applyFit)
    if (document.fonts?.ready) {
      document.fonts.ready.then(applyFit).catch(() => undefined)
    }

    return () => window.removeEventListener('resize', applyFit)
  }, [word, maxFontSize, reduced])

  useLayoutEffect(() => {
    if (!reduced) return
    letterRefs.current.forEach((element) => {
      if (element) {
        element.style.fontVariationSettings = "'wght' 820, 'wdth' 120"
      }
    })
  }, [reduced, ready])

  useEffect(() => {
    if (reduced || !ready) return

    let raf = 0
    const startedAt = performance.now()
    let lastPointerAt = performance.now()
    const coarse = window.matchMedia('(pointer: coarse)').matches

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      lastPointerAt = performance.now()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const tick = (now: number) => {
      const wrap = wrapRef.current
      if (!wrap) {
        raf = requestAnimationFrame(tick)
        return
      }

      const rect = wrap.getBoundingClientRect()
      const autoSweep = coarse || now - lastPointerAt > 4000
      let pointerX = pointerRef.current.x
      let pointerY = pointerRef.current.y

      if (autoSweep) {
        const cycle = ((now - startedAt) % 7000) / 7000
        pointerX =
          rect.left +
          rect.width / 2 +
          Math.sin(cycle * Math.PI * 2) * rect.width * 0.42
        pointerY = rect.top + rect.height / 2
      }

      letterRefs.current.forEach((element, index) => {
        if (!element) return
        const letterRect = element.getBoundingClientRect()
        const centerX = letterRect.left + letterRect.width / 2
        const centerY = letterRect.top + letterRect.height / 2
        const distance = Math.hypot(pointerX - centerX, pointerY - centerY)
        const raw = Math.min(1, Math.max(0, distance / 360))
        const smooth = raw * raw * (3 - 2 * raw)
        const attraction = 1 - smooth

        const state = currentRef.current[index] ?? { wght: 800, wdth: 100 }
        currentRef.current[index] = state
        state.wght += (720 + 180 * attraction - state.wght) * 0.14
        state.wdth += (105 + 35 * attraction - state.wdth) * 0.14

        const intro = Math.min(
          1,
          Math.max(0, (now - startedAt - index * 50) / 900),
        )
        const introEase = 1 - Math.pow(1 - intro, 3)
        const weight = 100 + (state.wght - 100) * introEase
        const width = 50 + (state.wdth - 50) * introEase

        element.style.fontVariationSettings = `'wght' ${weight.toFixed(
          1,
        )}, 'wdth' ${width.toFixed(1)}`
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced, ready])

  return (
    <div ref={wrapRef} className="w-full">
      {heading ? (
        <h1
          ref={setRowRef}
          aria-label={word}
          className={cn('poster-headline', className)}
          style={{ opacity: ready ? 1 : 0 }}
        >
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            ref={(element) => {
              letterRefs.current[index] = element
            }}
            aria-hidden="true"
          >
            {letter === ' ' ? ' ' : letter}
          </span>
        ))}
        </h1>
      ) : (
        <div
          ref={setRowRef}
          role="img"
          aria-label={word}
          className={cn('poster-headline', className)}
          style={{ opacity: ready ? 1 : 0 }}
        >
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              ref={(element) => {
                letterRefs.current[index] = element
              }}
              aria-hidden="true"
            >
              {letter === ' ' ? ' ' : letter}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
