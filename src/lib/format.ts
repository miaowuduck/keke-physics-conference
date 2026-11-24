export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function externalLink(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noreferrer' }
    : {}
}

export function pad2(value: number) {
  return String(value).padStart(2, '0')
}

export function minutesBetween(start: string, end: string): number | null {
  if (!end) return null
  const [startHour, startMinute] = start.split(':').map(Number)
  const [endHour, endMinute] = end.split(':').map(Number)
  if (Number.isNaN(startHour) || Number.isNaN(endHour)) return null
  let minutes = endHour * 60 + endMinute - (startHour * 60 + startMinute)
  if (minutes < 0) minutes += 24 * 60
  return minutes
}

export function durationLabel(start: string, end: string): string {
  const minutes = minutesBetween(start, end)
  if (minutes === null) return '—'
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const rest = minutes % 60
    return rest ? `${hours} 小时 ${rest} 分钟` : `${hours} 小时`
  }
  return `${minutes} 分钟`
}
