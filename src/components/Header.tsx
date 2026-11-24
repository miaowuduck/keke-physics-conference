import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav, site } from '../content'
import { cn } from '../lib/format'
import { useReducedMotion } from '../lib/useReducedMotion'

type Props = {
  active?: 'home' | 'schedule'
}

export function Header({ active = 'home' }: Props) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>('a, button')
    focusables?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const close = () => {
    setOpen(false)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b-2 border-line bg-night/90 backdrop-blur-md">
        <div className="poster-wrap flex h-full items-center justify-between gap-6">
          <a
            href="./index.html"
            className="flex items-center gap-2.5"
            aria-label={`${site.nameZh} 首页`}
          >
            <span className="h-3.5 w-3.5 bg-gold" aria-hidden="true" />
            <span className="display text-[22px] font-black tracking-[0.02em]">
              KEKE
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              Physics
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="主导航">
            {nav.map((item) => {
              const isSchedule = item.href.includes('schedule')
              const isActive = isSchedule && active === 'schedule'
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'relative py-2 text-[14px] font-medium text-bone transition-colors hover:text-gold',
                    isActive && 'text-gold',
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-gold" />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="./index.html#attend"
              className="hidden h-10 items-center bg-gold px-4 text-[13px] font-semibold text-night transition-colors hover:bg-golddeep sm:inline-flex"
            >
              报名参会
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border-2 border-line text-bone lg:hidden"
              aria-label="打开菜单"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="站点导航"
            initial={reduced ? false : { y: '-100%' }}
            animate={{ y: 0 }}
            exit={reduced ? undefined : { y: '-100%' }}
            transition={{
              duration: reduced ? 0 : 0.3,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="fixed inset-0 z-[60] flex flex-col bg-deeper"
          >
            <div className="poster-wrap flex h-16 shrink-0 items-center justify-between border-b-2 border-line">
              <span className="display text-[22px] font-black">KEKE</span>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center border-2 border-line text-bone"
                aria-label="关闭菜单"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            <nav className="poster-wrap flex flex-1 flex-col justify-center gap-1 py-10">
              {nav.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.08 + index * 0.04,
                    duration: reduced ? 0 : 0.25,
                  }}
                  className="display border-b border-line py-3 text-[38px] font-extrabold leading-none text-bone transition-colors hover:text-gold"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="poster-wrap pb-8">
              <a
                href="./index.html#attend"
                onClick={close}
                className="btn-gold w-full"
              >
                报名参会
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
