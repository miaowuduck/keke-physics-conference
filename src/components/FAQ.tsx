import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { faq, mailto } from '../content'
import { useReducedMotion } from '../lib/useReducedMotion'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const reduced = useReducedMotion()

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-mono text-[12px] leading-relaxed text-mute">
          还有别的问题？
          <br />
          <a
            href={mailto('咨询 - 2027 咯咯物理奇妙夜')}
            className="text-gold underline underline-offset-4 transition-colors hover:text-bone"
          >
            phyconf@163.com
          </a>
        </p>
      </div>

      <div className="lg:col-span-8">
        {faq.map((item, index) => {
          const isOpen = index === openIndex
          return (
            <div
              key={item.q}
              className="border-t-2 border-line last:border-b-2"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={
                    isOpen
                      ? 'display text-[20px] font-extrabold leading-snug text-gold sm:text-[24px]'
                      : 'display text-[20px] font-extrabold leading-snug text-bone sm:text-[24px]'
                  }
                >
                  {item.q}
                </span>
                <Plus
                  className={
                    isOpen
                      ? 'h-6 w-6 shrink-0 rotate-45 text-gold transition-transform duration-200'
                      : 'h-6 w-6 shrink-0 text-bone transition-transform duration-200'
                  }
                  strokeWidth={1.75}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    key="content"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.24 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-mute">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
