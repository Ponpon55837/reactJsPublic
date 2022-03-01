import { useState, useMemo } from 'react'
import { useUpdateEffect } from 'react-use'
import { useTable, usePagination, useFlexLayout, useRowSelect, useSortBy } from 'react-table'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
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
import { makeStyles, withStyles } from '@mui/styles'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

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

const CustomTable = ({
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

  const useStyles = makeStyles(() => ({
    root: {
      overflow: 'scroll',
      border: '5px solid #f3f3f4',
      borderRadius: '5px',
    },
    freeTable: {
      tableLayout: 'fixed',
      overflowX: 'clip',
    },
    fixTable: {
      tableLayout: 'fixed',
      overflowX: 'scroll',
      width: '1400px',
    },
    tbTh: {
      padding: '0.4rem',
      textAlign: 'center',
      borderRight: '1px solid #e1e5eb',
    },
    thTd: {
      padding: '0.1rem',
      textAlign: 'center',
    },
    loader: {
      textAlign: 'center',
      padding: 0,
      border: 'none',
      '> div': {
        width: '100%',
        marginTop: '-2px',
      },
    },
    icon: {
      cursor: 'pointer',
    },
    stickyLeft: {
      position: 'sticky !important',
      left: 0,
      top: 0,
      zIndex: 1,
      borderRight: '3px solid #e1e5eb',
    },
  }))

  const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        '& td': {
          backgroundColor: '#f3f3f4',
        },
      },
    },
  }))(TableRow)

  const classes = useStyles()

  const styles = css`
    .sticky-left {
      position: sticky !important;
      left: 0;
      top: 0;
      z-index: 1;
      border-right: 3px solid #e1e5eb;
    }

    th.sticky-left {
      background-color: #fbfbfb;
    }
    th.sticky-right {
      background-color: #fbfbfb;
    }

    td.sticky-left:nth-of-type(odd) {
      background-color: #f2f2f2;
    }

    .sticky-right {
      position: sticky !important;
      right: 0;
      top: 0;
      z-index: 1;
      background-color: #f2f2f2;
      border-left: 3px solid #e1e5eb;
    }
  `

  // Render the UI for your table
  return (
    <TableContainer css={styles} className={classes.root}>
      <Table
        className={tableStyle && data.length > 0 ? classes.fixTable : classes.freeTable}
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
                  className={classes.tbTh}
                  {...column.getHeaderProps(headerProps)}
                >
                  {/* Add a sort direction indicator */}
                  {column.sort ? (
                    <div style={{ display: 'flex' }}>
                      <span style={{ cursor: 'pointer' }} onClick={() => changeSort(column.id)}>
                        {column.Header}
                      </span>
                      {sortFlag === column.id ? (
                        initFlag ? (
                          <KeyboardArrowUpIcon
                            fontSize="small"
                            color="primary"
                            className={classes.icon}
                            onClick={() => changeSort(column.id)}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            fontSize="small"
                            color="primary"
                            className={classes.icon}
                            onClick={() => changeSort(column.id)}
                          />
                        )
                      ) : (
                        <SwapVertIcon
                          fontSize="small"
                          color="primary"
                          className={classes.icon}
                          onClick={() => changeSort(column.id)}
                        />
                      )}
                    </div>
                  ) : (
                    column.render('Header')
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow style={{ display: !loading && 'none' }}>
            <TableCell size="small" component="th" className={classes.tbTh}>
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
              <TableCell
                size="small"
                component="td"
                className={classes.tbTd}
                style={{ textAlign: 'center' }}
              >
                目前無資料
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ padding: '0.4rem 0', display: 'inline-flex' }}>
        <Pagination count={resultPageSize} page={pageValue} onChange={pageOnChange} />
        <FormControl variant="standard">
          <Select value={pageSize} label="數量" onChange={pageSizeOnChange}>
            {pageSizeOptions.map((size, idx) => (
              <MenuItem key={idx} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </TableContainer>
  )
}

export default CustomTable

CustomTable.defaultProps = {
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
  resultPageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pageOnChange: PropTypes.func,
  pageSizeOnChange: PropTypes.func,
}
