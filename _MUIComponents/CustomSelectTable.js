import { useState, useMemo } from 'react'
import { useUpdateEffect } from 'react-use'
import { useTable, usePagination, useFlexLayout, useRowSelect, useSortBy } from 'react-table'
import useMediaQuery from '@mui/material/useMediaQuery'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Typography } from '@mui/material'

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
  border: '5px solid #f3f3f4',
  borderRadius: '5px',
  '& .MuiTableHead-root': {
    position: 'sticky',
    top: '0px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
}))

const StyledTableRow = styled(TableRow)(({}) => ({
  '&:nth-of-type(odd)': {
    '& td': {
      backgroundColor: '#f3f3f4',
    },
  },
}))

const CustomSelectTable = ({
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
  const [initFlag, setInitFlag] = useState(true)
  const [sortFlag, setSortFlag] = useState(null)
  const [tableHeight, setTableHeight] = useState(window.innerHeight - 252)
  const small = useMediaQuery('(max-width:600px)')

  const changeSort = id => {
    onClick(id)
    setSortFlag(id)
    setInitFlag(!initFlag)
  }

  useUpdateEffect(() => {
    onSelectedChange(selectedFlatRows.map(map => map.original))
  }, [selectedRowIds])

  useUpdateEffect(() => {
    gotoPage(0)
  }, [data])

  useUpdateEffect(() => {
    setPageSize(parseInt(pageSize, 10))
  }, [pageSize])

  useUpdateEffect(() => {
    const handleResize = () => setTableHeight(window.innerHeight - 252)
    window.addEventListener('resize', handleResize)
  }, [window.innerHeight])

  // Render the UI for your table
  return (
    <>
      <StyledTableContainer sx={{ maxHeight: tableHeight }}>
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
                    {...column.getHeaderProps(headerProps)}
                  >
                    {/* Add a sort direction indicator */}
                    {column.sort ? (
                      <div style={{ display: 'flex', fontWeight: 'bold' }}>
                        <span style={{ cursor: 'pointer' }} onClick={() => changeSort(column.id)}>
                          {column.Header}
                        </span>
                        {sortFlag === column.id ? (
                          initFlag ? (
                            <KeyboardArrowUpIcon
                              fontSize="small"
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              onClick={() => changeSort(column.id)}
                            />
                          ) : (
                            <KeyboardArrowDownIcon
                              fontSize="small"
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              onClick={() => changeSort(column.id)}
                            />
                          )
                        ) : (
                          <SwapVertIcon
                            fontSize="small"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => changeSort(column.id)}
                          />
                        )}
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
                  目前無資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Box sx={{ padding: '0.4rem 0', display: 'inline-flex' }}>
        <Pagination
          count={resultPageSize}
          page={pageValue}
          onChange={pageOnChange}
          size={small ? 'small' : 'default'}
        />
        <Typography sx={{ mt: small ? '.1rem' : '.2rem', mr: '.4rem' }}>
          資料總數： {dataCount} 筆
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
                每頁筆數：{size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default CustomSelectTable

CustomSelectTable.defaultProps = {
  loading: false,
  onSelectedChange: () => {},
}

CustomTable.propTypes = {
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
}
