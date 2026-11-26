import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { cta } from '../content'
import { externalLink } from '../lib/format'
import { useReducedMotion } from '../lib/useReducedMotion'
import { LogoMark } from './LogoMark'

export function CtaBand() {
  const reduced = useReducedMotion()
  const letters = Array.from(cta.line)

  return (
    <section
      id="cta"
      className="relative overflow-hidden border-y-2 border-line bg-gold text-night"
    >
      <LogoMark size={420} playOnView className="cta-emblem" />
      <div className="poster-wrap relative py-[88px] md:py-[120px]">
        <h2 className="display max-w-5xl text-[clamp(44px,7vw,112px)] font-black uppercase leading-[0.92] tracking-[-0.01em]">
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : index * 0.04,
              }}
              className="inline-block"
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </h2>

        <p className="mt-5 display text-[22px] font-extrabold md:text-[28px]">
          {cta.sub}
        </p>

        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <a
            href={cta.primary.href}
            {...externalLink(cta.primary.href)}
            className="btn-ink"
          >
            {cta.primary.label}
            <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2} />
          </a>
          <a
            href={cta.secondary.href}
            className="font-mono text-[12px] uppercase tracking-[0.16em] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            {cta.secondary.label}
          </a>
        </div>
      </div>
    </section>
  )
}
