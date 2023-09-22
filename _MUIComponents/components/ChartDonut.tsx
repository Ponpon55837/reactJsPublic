import { useEffect, useState } from 'react'
import Chart, { useChart } from '@components/chart'

export default function ChartDonut({
  width = 360,
  height = 220,
  labels,
  data,
}: {
  width?: string | number
  height?: string | number
  labels: any
  data: number[]
}) {
  const [series, setSeries] = useState<number[]>([]) // 建立一個狀態變數 series

  useEffect(() => {
    setSeries(data) // 當 data 傳入時，更新 series 的狀態
  }, [data])

  const chartOptions = useChart({
    labels,
    stroke: {
      show: true,
    },
    legend: {
      position: 'right',
      offsetX: 5,
      offsetY: 8,
      itemMargin: {
        vertical: 4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
  })

  return <Chart type="donut" series={series} options={chartOptions} width={width} height={height} />
}
