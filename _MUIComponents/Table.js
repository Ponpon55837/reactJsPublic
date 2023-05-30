import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useFlexLayout, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import useMiddleWare from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { COMPONENTS_COMMON_PINK_WHITE, COMPONENTS_COMMON_PURE_WHITE } from '@theme/colorManager'
import { GetMoneyThousands } from '@utils/utilsFunction'

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
  borderRadius: '8px',
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

const CustomTable = ({
  sortName,
  tableStyle = false,
  columns,
  data,
  loading,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onSelectedChange,
  initSelectedRow = [],
  onClick,
  pageValue,
  dataCount,
  resultPageSize,
  pageOnChange,
  pageSizeOnChange,
  noPaging = false,
  tableDefaultMinusHeight = 260,
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
    page,
    setPageSize,
    gotoPage,
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
  const [initFlag, setInitFlag] = useState(true)
  const [sortFlag, setSortFlag] = useState(sortName ?? null)
  const [tableHeight, setTableHeight] = useState(window.innerHeight - tableDefaultMinusHeight)
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

  useUpdateEffect(() => {
    onSelectedChange(selectedFlatRows.map((map) => map.original))
  }, [selectedRowIds])

  useUpdateEffect(() => {
    gotoPage(0)
  }, [data])

  useEffectOnce(() => {
    setPageSize(parseInt(pageSize, 10))
  })

  useUpdateEffect(() => {
    setPageSize(parseInt(pageSize, 10))
  }, [pageSize])

  useUpdateEffect(() => {
    const handleResize = () => setTableHeight(window.innerHeight - tableDefaultMinusHeight)
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
      <Box sx={{ padding: '0.4rem 0', display: noPaging ? 'none' : 'inline-flex' }}>
        <Pagination
          count={resultPageSize}
          page={pageValue}
          onChange={pageOnChange}
          size={small ? 'small' : 'default'}
        />
        <Typography sx={{ mt: small ? '.1rem' : '.2rem', mr: '1rem' }}>
          {`${t('TABLE.total')}`}： {GetMoneyThousands(dataCount)} {`${t('TABLE.count')}`}
        </Typography>
        <FormControl variant="standard" sx={{ display: small ? 'none' : 'inline-flex' }}>
          <Select
            value={pageSize}
            label="數量"
            onChange={pageSizeOnChange}
            size={small ? 'small' : 'default'}
          >
            {pageSizeOptions.map((size, idx) => (
              <MenuItem key={idx} value={size}>
                {`${t('TABLE.rowsPage')}`}：{GetMoneyThousands(size)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default CustomTable

CustomTable.defaultProps = {
  loading: false,
  onSelectedChange: () => {},
}

CustomTable.propTypes = {
  sortName: PropTypes.any,
  tableStyle: PropTypes.bool,
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loading: PropTypes.bool,
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageSizeOptions: PropTypes.array,
  onSelectedChange: PropTypes.func,
  initSelectedRow: PropTypes.array,
  onClick: PropTypes.func,
  pageValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dataCount: PropTypes.number,
  resultPageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageOnChange: PropTypes.func,
  pageSizeOnChange: PropTypes.func,
  noPaging: PropTypes.bool,
  tableDefaultMinusHeight: PropTypes.number,
}
