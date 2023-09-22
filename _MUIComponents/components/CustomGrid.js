import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useFlexLayout, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import useMiddleWare from '@hooks/use-middleware'
import useResponsive from '@hooks/useResponsive'
import useLocales from '@locales/useLocales'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { COMPONENTS_COMMON_PINK_WHITE, COMPONENTS_COMMON_PURE_WHITE } from '@theme/colorManager'

const mergeProps = (props, { align = 'left', stickyLeft = false, stickyRight = false }) => {
  // align = align.replace("left", "start")
  // align = align.replace("right", "end")
  const className = classNames(
    'd-flex',
    'align-items-center',
    `justify-content-${align}`,
    `${stickyLeft && 'sticky-left'}`,
    `${stickyRight && 'sticky-right'}`,
  )

  return [props, { className }]
}

const headerProps = (props, { column }) => mergeProps(props, column)
const cellProps = (props, { cell }) => mergeProps(props, cell.column)

const StyledTableContainer = styled(TableContainer)(({}) => ({
  overflow: 'scroll',
  overflowX: 'initial',
  border: `1px solid ${COMPONENTS_COMMON_PINK_WHITE}`,
  borderRadius: '5px',
  '& .MuiTableHead-root': {
    position: 'sticky',
    top: '0px',
    backgroundColor: COMPONENTS_COMMON_PURE_WHITE,
    zIndex: 1,
  },
}))

const StyledTableRow = styled(TableRow)(({}) => ({
  '&:nth-of-type(even)': {
    '& td': {
      backgroundColor: COMPONENTS_COMMON_PINK_WHITE,
    },
  },
}))

const CustomGrid = ({
  tableStyle = false,
  columns,
  data,
  loading,
  pageSize = 999,
  onSelectedChange,
  initSelectedRow = [],
  onClick,
}) => {
  const defaultColumn = useMemo(
    () => ({
      // minWidth: 2, // minWidth is only used as a limit for resizing
      // width: 70, // width is used for both the flex-basis and flex-grow
      // maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    [],
  )
  // const state = useMemo(() => ({ selectedRowIds: { ['1']: true } }), [])
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setPageSize,
    page,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        selectedRowIds: initSelectedRow.reduce((acc, value) => ({ ...acc, [value]: true }), {}),
      },
      autoResetPage: false,
    },
    useSortBy,
    usePagination,
    useFlexLayout,
    useRowSelect,
  )

  const { t } = useLocales()
  const isDesktop = useResponsive('up', 'md')
  const [initFlag, setInitFlag] = useState(true)
  const [sortFlag, setSortFlag] = useState(null)
  const [tableHeight, setTableHeight] = useState(
    isDesktop ? window.innerHeight - 242 : window.innerHeight - 310,
  )
  const small = useMediaQuery('(max-width:600px)')
  const { menuListOpen, setTabMaxWidthValue } = useMiddleWare()

  const changeSort = (id) => {
    onClick(id)
    setSortFlag(id)
    setInitFlag(!initFlag)
  }

  const flagCheckAndChange = (columnId, sortFlag) => {
    if (sortFlag === columnId && initFlag) {
      return <KeyboardArrowDownIcon fontSize="small" color="primary" sx={{ cursor: 'pointer' }} />
    } else if (sortFlag === columnId) {
      return <KeyboardArrowUpIcon fontSize="small" color="primary" sx={{ cursor: 'pointer' }} />
    }
    return <SwapVertIcon fontSize="small" color="primary" sx={{ cursor: 'pointer' }} />
  }

  useEffectOnce(() => {
    setPageSize(parseInt(pageSize, 10))
  })

  useUpdateEffect(() => {
    onSelectedChange(selectedFlatRows.map((map) => map.original))
  }, [selectedRowIds])

  useUpdateEffect(() => {
    const handleResize = () =>
      setTableHeight(isDesktop ? window.innerHeight - 242 : window.innerHeight - 300)
    window.addEventListener('resize', handleResize)
  }, [window.innerHeight])

  useUpdateEffect(() => {
    const handleResize = () => setTabMaxWidthValue(window.innerWidth)
    window.addEventListener('resize', handleResize)
  }, [window.innerWidth, menuListOpen])

  // Render the UI for your table
  return (
    <>
      <StyledTableContainer id="tableOffset" sx={{ maxHeight: tableHeight }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            tableLayout: 'fixed',
            overflowX: tableStyle && data.length > 0 ? 'clip' : 'scroll',
            width: tableStyle && data.length > 0 ? '1400px' : 'default',
          }}
          {...getTableProps()}
        >
          <TableHead className="bg-light">
            {headerGroups.map((headerGroup, idx) => (
              <TableRow key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(({ className, width, minWidth, ...column }, idx) => (
                  <TableCell
                    key={idx}
                    size="small"
                    component="th"
                    sx={{ p: '8px 10px' }}
                    {...column.getHeaderProps(headerProps)}
                  >
                    {/* Add a sort direction indicator */}
                    {column.sort ? (
                      <div
                        style={{ display: 'flex', fontWeight: 'bold' }}
                        onClick={() => changeSort(column.id)}
                      >
                        <span style={{ cursor: 'pointer' }}>{column.Header}</span>
                        {/* 排序標籤 */}
                        {flagCheckAndChange(column.id, sortFlag)}
                      </div>
                    ) : (
                      <div style={{ fontWeight: 'bold' }}>{column.render('Header')}</div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow style={{ display: !loading && 'none' }}>
              <TableCell size="small" component="th">
                <LinearProgress />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row)
              return (
                <StyledTableRow key={idx} {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => {
                    return (
                      <TableCell
                        key={idx}
                        size="small"
                        component="td"
                        align="justify"
                        sx={{ p: '8px 10px' }}
                        {...cell.getCellProps(cellProps)}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </StyledTableRow>
              )
            })}
            {page.length === 0 && !loading && (
              <TableRow>
                <TableCell size="small" component="td" style={{ textAlign: 'center' }}>
                  {`${t('TABLE.noData')}`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}

export default CustomGrid

CustomGrid.defaultProps = {
  loading: false,
  onSelectedChange: () => {},
}

CustomGrid.propTypes = {
  tableStyle: PropTypes.bool,
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool,
  onSelectedChange: PropTypes.func,
  initSelectedRow: PropTypes.array,
  onClick: PropTypes.func,
  pageOnChange: PropTypes.func,
}
