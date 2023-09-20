import Chart, { useChart } from '@components/chart'

export default function ChartNewLine({
  width = 360,
  height = 220,
  chartData,
}: {
  width?: string | number
  height?: string | number
  chartData: {
    name: string
    data: number[]
  }[]
}) {
  const chartOptions = useChart({
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      itemMargin: {
        horizontal: 6,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    tooltip: {
      x: {
        show: false,
      },
      marker: { show: false },
    },
  })

  return (
    <Chart type="area" series={chartData} options={chartOptions} width={width} height={height} />
  )
}
