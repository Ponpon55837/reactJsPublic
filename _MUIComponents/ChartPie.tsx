import Chart, { useChart } from '@components/chart'

export default function ChartPie({
  width = 360,
  height = 220,
  chartData,
}: {
  width?: string | number
  height?: string | number
  chartData: {
    name: string
    data: number
  }[]
}) {
  const chartOptions = useChart({
    labels: chartData.map((item) => item.name), // 取得所有標籤
    legend: {
      position: 'right',
      offsetX: -20,
      offsetY: 32,
      itemMargin: {
        vertical: 6,
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  })

  return (
    <Chart
      type="pie"
      series={chartData.map((item) => item.data)}
      options={chartOptions}
      width={width}
      height={height}
    />
  )
}
