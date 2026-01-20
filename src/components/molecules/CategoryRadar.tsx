import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { Category } from '@/types'
import { CATEGORY_CONFIG } from '@/types'

interface CategoryRadarProps {
  data: Record<Category, number> // 0-100 percentage for each category
  size?: number
  className?: string
}

const CATEGORIES: Category[] = [
  'science',
  'art',
  'history',
  'geography',
  'sport',
  'music',
  'cinema',
  'literature',
]

export function CategoryRadar({ data, size = 250, className }: CategoryRadarProps) {
  const center = size / 2
  const maxRadius = size / 2 - 30 // Leave space for labels
  const angleStep = (2 * Math.PI) / CATEGORIES.length

  // Calculate points for each category
  const points = useMemo(() => {
    return CATEGORIES.map((category, i) => {
      const angle = angleStep * i - Math.PI / 2 // Start from top
      const value = data[category] || 0
      const radius = (value / 100) * maxRadius

      return {
        category,
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        labelX: center + (maxRadius + 20) * Math.cos(angle),
        labelY: center + (maxRadius + 20) * Math.sin(angle),
        value,
        color: CATEGORY_CONFIG[category].color,
        icon: CATEGORY_CONFIG[category].icon,
      }
    })
  }, [data, center, maxRadius, angleStep])

  // Create path for the data polygon
  const pathData = useMemo(() => {
    if (points.every((p) => p.value === 0)) return ''
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  }, [points])

  // Grid circles
  const gridCircles = [25, 50, 75, 100]

  return (
    <div className={className}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background grid circles */}
        {gridCircles.map((percent) => (
          <circle
            key={percent}
            cx={center}
            cy={center}
            r={(percent / 100) * maxRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            className="text-surface-overlay"
          />
        ))}

        {/* Axis lines */}
        {points.map((point, i) => {
          const angle = angleStep * i - Math.PI / 2
          const endX = center + maxRadius * Math.cos(angle)
          const endY = center + maxRadius * Math.sin(angle)

          return (
            <line
              key={point.category}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="currentColor"
              strokeWidth={0.5}
              className="text-surface-overlay"
            />
          )
        })}

        {/* Data polygon */}
        {pathData && (
          <motion.path
            d={pathData}
            fill="url(#radarGradient)"
            stroke="url(#radarStroke)"
            strokeWidth={2}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={point.category}
            cx={point.x}
            cy={point.y}
            r={4}
            fill={point.color}
            className="drop-shadow-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-success)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Category labels */}
      <div
        className="relative"
        style={{
          marginTop: -size,
          width: size,
          height: size,
          pointerEvents: 'none',
        }}
      >
        {points.map((point) => (
          <div
            key={point.category}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
            style={{
              left: point.labelX,
              top: point.labelY,
            }}
          >
            <span className="text-lg">{CATEGORY_CONFIG[point.category].icon}</span>
            <span className="text-[10px] text-text-muted font-medium">
              {point.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
