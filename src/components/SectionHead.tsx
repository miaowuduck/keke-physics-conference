import { motion } from 'motion/react'
import { useReducedMotion } from '../lib/useReducedMotion'

type Props = {
  number: string
  title: string
  eyebrow: string
}

export function SectionHead({ number, title, eyebrow }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <span className="display tabular pb-1 text-[20px] font-black text-gold">
          {number}
        </span>
        <h2 className="display text-[clamp(40px,6vw,88px)] font-extrabold leading-[0.95] tracking-[-0.01em]">
          {title}
        </h2>
        <span className="mb-2 ml-auto hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mute sm:block">
          {eyebrow}
        </span>
      </div>
      <div className="mt-8 border-t-2 border-line" />
    </motion.div>
  )
}
