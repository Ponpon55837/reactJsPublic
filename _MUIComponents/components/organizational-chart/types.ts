import { TreeProps } from 'react-organizational-chart'
import { SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { PaletteColor } from '@mui/material/styles/createPalette'

type VariantValue = 'simple' | 'standard' | 'group'

export type ItemProps = {
  name: string
  group?: string
  role?: string | null
  avatar?: string | null
  children?: any
  color: PaletteColor
}

export type ListProps = {
  data: ItemProps
  depth: number
  variant?: VariantValue
  sx?: SxProps<Theme>
}

export type SubListProps = {
  data: ItemProps[]
  depth: number
  variant?: VariantValue
  sx?: SxProps<Theme>
}

export type OrganizationalChartProps = Partial<TreeProps> & {
  data: {
    name: string
    children: ItemProps[]
    color: PaletteColor
  }
  variant?: VariantValue
  sx?: SxProps<Theme>
}
