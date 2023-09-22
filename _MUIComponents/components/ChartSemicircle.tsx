import { useEffect, useState } from 'react'
import Chart, { useChart } from '@components/chart'

export default function ChartSemicircle({
  width = 360,
  height = 220,
  chartData,
}: {
  width?: string | number
  height?: string | number
  chartData: { name: string; data: number }[]
}) {
  const [series, setSeries] = useState<number[]>([])

  useEffect(() => {
    // 當 chartData 傳入時，更新 series 的狀態
    setSeries(chartData.map((item) => item.data))
  }, [chartData])

  // 取得所有標籤
  const labels = chartData.map((item) => item.name)

  const chartOptions = useChart({
    chart: {
      offsetX: 0,
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '56%',
        },
        dataLabels: {
          name: {
            offsetY: 8,
          },
          value: {
            offsetY: -40,
          },
          total: {
            label: labels[0],
            color: '#919191',
            fontSize: '0.8rem',
            fontWeight: 500,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: '#ed6c02' },
          { offset: 100, color: '#C02F46' },
        ],
      },
    },
  })

  return (
    <Chart
      type="radialBar"
      series={series}
      options={chartOptions}
      width={width}
      height={height}
      labels={labels}
    />
  )
}
