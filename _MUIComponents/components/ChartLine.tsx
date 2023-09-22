import Chart, { useChart } from '@components/chart'

// 動態生成日期時間字串
const localOffset = new Date().getTimezoneOffset() * 60 * 1000 // 取得當地時區與 UTC 時區的偏移量
const categories = Array.from({ length: 19 }, (_, i) => {
  const date = new Date()
  date.setHours(9 + Math.floor(i / 2), (i % 2) * 30, 0, 0)
  const localTime = date.getTime() - localOffset // 調整為當地時區時間
  return new Date(localTime).toISOString()
})

export default function ChartLine({
  width = 360,
  height = 220,
  data = [],
}: {
  width?: string | number
  height?: string | number
  data: number[]
}) {
  const chartOptions = useChart({
    xaxis: {
      type: 'datetime',
      categories,
    },
    tooltip: {
      x: {
        format: 'HH:mm',
      },
    },

    dataLabels: { enabled: true },
  })
  const series = [{ name: 'Visitors', data: data }]

  return <Chart type="area" series={series} options={chartOptions} width={width} height={height} />
}
