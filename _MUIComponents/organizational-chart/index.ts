import dynamic from 'next/dynamic'

const ChartOrganizational = dynamic(() => import('./ChartOrganizational'), { ssr: false })

export * from './types'

export default ChartOrganizational
