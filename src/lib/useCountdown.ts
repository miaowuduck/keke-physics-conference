import { useEffect, useMemo, useState } from 'react'

export type CountdownCell = {
  key: string
  value: number
  label: string
}

export function useCountdown(targetISO: string) {
  const target = useMemo(() => Date.parse(targetISO), [targetISO])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000))

  const cells: CountdownCell[] = [
    {
      key: 'days',
      value: Math.floor(totalSeconds / 86400),
      label: '天',
    },
    {
      key: 'hours',
      value: Math.floor((totalSeconds % 86400) / 3600),
      label: '时',
    },
    {
      key: 'minutes',
      value: Math.floor((totalSeconds % 3600) / 60),
      label: '分',
    },
    {
      key: 'seconds',
      value: totalSeconds % 60,
      label: '秒',
    },
  ]

  return {
    target,
    now,
    totalSeconds,
    cells,
    closed: now >= target,
  }
}
