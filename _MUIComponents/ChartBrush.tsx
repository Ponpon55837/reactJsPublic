import dynamic from 'next/dynamic'
import React from 'react'
import { Props } from 'react-apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const seriesData = [
  { x: new Date('15 Jun 2023').getTime(), y: 60 },
  { x: new Date('16 Jun 2023').getTime(), y: 50 },
  { x: new Date('17 Jun 2023').getTime(), y: 70 },
  { x: new Date('18 Jun 2023').getTime(), y: 40 },
  { x: new Date('19 Jun 2023').getTime(), y: 20 },
  { x: new Date('20 Jun 2023').getTime(), y: 80 },
  { x: new Date('21 Jun 2023').getTime(), y: 30 },
  { x: new Date('22 Jun 2023').getTime(), y: 50 },
  { x: new Date('23 Jun 2023').getTime(), y: 40 },
  { x: new Date('24 Jun 2023').getTime(), y: 70 },
  { x: new Date('25 Jun 2023').getTime(), y: 80 },
  { x: new Date('26 Jun 2023').getTime(), y: 30 },
  // [new Date('2023-06-16').getTime(), 74],
  // [new Date('2023-06-17').getTime(), 56],
]

const ChartBrush = () => {
  const state: Props = {
    series: [
      {
        data: seriesData,
      },
    ],
    options: {
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false,
        },
      },
      colors: ['#546E7A'],
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
    },
    seriesLine: [
      {
        data: seriesData,
      },
    ],
    seriesLineOptions: {
      chart: {
        id: 'chart1',
        height: 130,
        type: 'area',
        brush: {
          target: 'chart2',
          enabled: true,
        },
        selection: {
          enabled: true,
          type: 'x',
          xaxis: {
            min: new Date('19 Jun 2023').getTime(),
            max: new Date('22 Jun 2023').getTime(),
          },
        },
      },
      colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 2,
      },
    },
  }

  // console.log('options:', state.options)
  // console.log('series:', state.series)
  // console.log('seriesLineOptions:', state.seriesLineOptions)
  // console.log('seriesLine:', state.seriesLine)

  return (
    <div id="wrapper">
      <div id="chart-line2" style={{ paddingTop: '0.5rem', marginBottom: '-2rem' }}>
        <Chart options={state.options} series={state.series} type="line" height={230} width={480} />
      </div>
      <div id="chart-line">
        <Chart
          options={state.seriesLineOptions}
          series={state.seriesLine}
          type="area"
          height={120}
          width={480}
        />
      </div>
    </div>
  )
}

export default ChartBrush
