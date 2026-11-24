import { topics, type TopicKey } from '../content'

type Props = {
  topic: TopicKey
  size?: number
  className?: string
  monochrome?: boolean
}

export function TopicMark({
  topic,
  size = 10,
  className,
  monochrome = false,
}: Props) {
  const { color, symbol } = topics[topic]
  const fill = monochrome ? 'currentColor' : color
  const half = size / 2

  if (symbol === 'circle') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className={className}
      >
        <circle cx={half} cy={half} r={half} fill={fill} />
      </svg>
    )
  }

  if (symbol === 'triangle') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className={className}
      >
        <polygon points={`${half},0 ${size},${size} 0,${size}`} fill={fill} />
      </svg>
    )
  }

  if (symbol === 'diamond') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className={className}
      >
        <rect
          x={size * 0.18}
          y={size * 0.18}
          width={size * 0.64}
          height={size * 0.64}
          fill={fill}
          transform={`rotate(45 ${half} ${half})`}
        />
      </svg>
    )
  }

  if (symbol === 'square') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className={className}
      >
        <rect width={size} height={size} fill={fill} />
      </svg>
    )
  }

  if (symbol === 'star') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className={className}
      >
        <path
          d={`M ${half} 0 L ${half + size * 0.16} ${half - size * 0.16} L ${size} ${half} L ${
            half + size * 0.16
          } ${half + size * 0.16} L ${half} ${size} L ${
            half - size * 0.16
          } ${half + size * 0.16} L 0 ${half} L ${
            half - size * 0.16
          } ${half - size * 0.16} Z`}
          fill={fill}
        />
      </svg>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: 2,
        background: fill,
      }}
    />
  )
}
