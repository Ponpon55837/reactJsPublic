import { Tree, TreeNode } from 'react-organizational-chart'
import { useTheme } from '@mui/material/styles'
import { COMPONENTS_COMMON_LOW_GREY } from '@theme/colorManager'
import flattenArray from '@utils/flattenArray'
import GroupNode from './node/GroupNode'
import { ListProps, OrganizationalChartProps, SubListProps } from './types'

export default function ChartOrganizational({
  data,
  variant = 'group',
  sx,
  ...other
}: OrganizationalChartProps) {
  const theme = useTheme()
  return (
    <Tree
      lineWidth="1.5px"
      nodePadding="4px"
      lineBorderRadius="24px"
      lineColor={COMPONENTS_COMMON_LOW_GREY}
      label={variant === 'group' && <GroupNode sx={sx} node={data} />}
      {...other}
    >
      {data?.children?.map((list) => (
        <List key={list.name} depth={1} data={list} variant={variant} sx={sx} />
      ))}
    </Tree>
  )
}

export function List({ data, depth, variant, sx }: ListProps) {
  const hasChild = data.children && !!data.children

  return (
    <TreeNode
      label={
        variant === 'group' && (
          <GroupNode
            sx={sx}
            node={data}
            depth={depth}
            length={flattenArray(data.children, 'children')?.length}
          />
        )
      }
    >
      {hasChild && <SubList data={data.children} depth={depth} variant={variant} sx={sx} />}
    </TreeNode>
  )
}

function SubList({ data, depth, variant, sx }: SubListProps) {
  return (
    <>
      {data.map((list) => (
        <List key={list.name} data={list} depth={depth + 1} variant={variant} sx={sx} />
      ))}
    </>
  )
}
