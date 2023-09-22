import React from 'react'
import { useGauge } from 'use-gauge'

interface PowerProps {
  value: number
  label: number
}

export function ChartGauge(props: PowerProps) {
  const { value, label } = props
  const gauge = useGauge({
    domain: [0, 100],
    startAngle: 90,
    endAngle: 270,
    numTicks: 21,
    diameter: 240,
  })

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 9,
    tipRadius: 2,
  })

  return (
    <div style={{ padding: '1rem' }}>
      <svg
        style={{ width: '100%', overflow: 'visible', padding: '0.7rem' }}
        {...gauge.getSVGProps()}
      >
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle)
            const showText = asValue % 20 === 0

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  style={{
                    stroke:
                      asValue <= 20
                        ? '#10B981'
                        : asValue >= 20 && asValue <= 80
                        ? '#FBBF24'
                        : '#EF4444',
                    strokeWidth: 23,
                  }}
                  {...gauge.getTickProps({
                    angle,
                    length: 25, // donut寬度
                  })}
                />

                {showText && (
                  <text
                    style={{
                      fill: '#919191',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                    {...gauge.getLabelProps({ angle, offset: -38 })} // 內圈文字離半圓距離
                  >
                    {asValue / 20}
                  </text>
                )}
              </React.Fragment>
            )
          })}
        </g>
        <g id="needle">
          <circle style={{ fill: '#D1D5DB' }} {...needle.base} r={18} />
          <circle style={{ fill: '#4B5563' }} {...needle.base} />
          <circle style={{ fill: '#4B5563' }} {...needle.tip} />
          <polyline style={{ fill: '#4B5563' }} points={needle.points} />
          <circle style={{ fill: '#FFFFFF' }} {...needle.base} r={4} />
        </g>
        <text
          x="0%"
          y="-35%"
          textAnchor="middle"
          fontSize="2rem"
          fontWeight="bold"
          fill="#FFFFFF"
          style={{ textShadow: '0px 0px 6px #000000' }}
        >
          {label} 天{/* 将文本内容替换为标签属性的值 */}
        </text>
      </svg>
    </div>
  )
}
