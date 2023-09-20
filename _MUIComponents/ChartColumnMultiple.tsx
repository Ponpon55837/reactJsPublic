import Chart, { useChart } from '@components/chart'

export default function ChartColumnMultiple({
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
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
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
      y: {
        formatter: (value: number) => `$ ${value} thousands`,
      },
    },
    plotOptions: { bar: { columnWidth: '60%' } },
  })

  return (
    <Chart type="bar" series={chartData} options={chartOptions} width={width} height={height} />
  )
}
