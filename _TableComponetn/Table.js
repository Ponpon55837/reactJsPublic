import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  usePagination,
  useFlexLayout,
  useRowSelect,
  useSortBy,
} from "react-table";
import { PulseLoader } from "react-spinners";
import { css } from "@emotion/core";
import classNames from "classnames";

const mergeProps = (
  props, {
    align = "left",
    stickyLeft = false,
    stickyRight = false,
  }) => {
  align = align.replace("left", "start");
  align = align.replace("right", "end");
  const className = classNames(
    "d-flex",
    "align-items-center",
    `justify-content-${align}`,
    `${stickyLeft && 'sticky-left'}`,
    `${stickyRight && 'sticky-right'}`
  );

  return [props, { className }];
};

const headerProps = (props, { column }) => mergeProps(props, column);
const cellProps = (props, { cell }) => mergeProps(props, cell.column);

const Table = ({
  tableStyle = false,
  columns,
  data,
  loading,
  pageSize = 10,
  onSelectedChange,
  initSelectedRow = [],
  onClick,
}) => {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 2, // minWidth is only used as a limit for resizing
      width: 70, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );
  // const state = useMemo(() => ({ selectedRowIds: { ['1']: true } }), []);
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
        selectedRowIds: initSelectedRow.reduce(
          (acc, value) => ({ ...acc, [value]: true }),
          {}
        ),
      },
      autoResetPage: false,
    },
    useSortBy,
    usePagination,
    useFlexLayout,
    useRowSelect
  );

  const [initFlag, setInitFlag] = useState(true)
  const [sortFlag, setSortFlag] = useState(null)
  const changeSort = (id) => {
    onClick(id)
    setSortFlag(id)
    setInitFlag(!initFlag)
  }

  useEffect(() => {
    onSelectedChange(_.map(selectedFlatRows, "original"));
  }, [selectedRowIds]);

  useEffect(() => {
    gotoPage(0);
  }, [data]);

  useEffect(() => {
    setPageSize(parseInt(pageSize, 10));
  }, [pageSize]);

  const styles = css`
    .free-table {
      table-layout: fixed;
      overflow-x: clip;
    }
    .fixed-table {
      table-layout: fixed;
      overflow-x: scroll;
      width: 1400px
    }

    th {
      padding: 0.4rem;
      border-right: 1px solid #e1e5eb;
    }

    td {
      padding: 0.4rem;
      border-right: 1px solid #e1e5eb;
      word-break:break-all;
    }

    .loader {
      text-align: center;
      padding: 0;
      border: none;
      > div {
        width: 100%;
        margin-top: -2px;
      }
    }
    .sticky-left {
      position: sticky !important;
      left: 0;
      top: 0;
      z-index: 1;
      border-right: 3px solid #e1e5eb;
    }

    th.sticky-left {
      background-color: #FBFBFB
    }
    th.sticky-right {
      background-color: #FBFBFB
    }

    td.sticky-left:nth-of-type(odd) {
      background-color: #F2F2F2;
    }

    .sticky-right {
      position: sticky !important;
      right: 0;
      top: 0;
      z-index: 1;
      background-color: #F2F2F2;
      border-left: 3px solid #e1e5eb;
    }
  `;

  const flagStyle1 = css`
    display: inline;
    color: #8B8B8B;
    font-size: 1.2rem;
    margin-bottom: 0;
    font-weight: bold;
    cursor: pointer;
  `;
  const flagStyle2 = css`
    display: inline;
    color: #4F6EA7;
    font-size: 1rem;
    margin-bottom: 0;
    font-weight: bold;
    cursor: pointer;
  `;

  // Render the UI for your table
  return (
    <div css={styles} className="overflow-scroll">
      <table
        className={`table table-striped mb-0
          ${tableStyle && data.length > 0 ? 'fixed-table' : 'free-table'}`}
        {...getTableProps()}
      >
        <thead className="bg-light ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(
                ({ className, width, minWidth, ...column }) => (
                  <th {...column.getHeaderProps( headerProps )}>
                    {/* Add a sort direction indicator */}
                    {column.sort ? (
                      <>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => changeSort(column.id)}>
                          {column.Header}
                        </span>
                        {sortFlag === column.id ?
                          initFlag
                            ? <pre
                                css={flagStyle1}
                                className="material-icons"
                                onClick={() => changeSort(column.id)}
                              >
                                keyboard_arrow_up
                              </pre>
                            : <pre
                                css={flagStyle1}
                                className="material-icons"
                                onClick={() => changeSort(column.id)}
                              >
                                keyboard_arrow_down
                              </pre>
                          : <pre
                              css={flagStyle2}
                              className="material-icons"
                              onClick={() => changeSort(column.id)}
                            >
                              import_export
                            </pre>
                        }
                      </>
                    ) : (
                      column.render("Header")
                    )}
                  </th>
                )
              )}
            </tr>
          ))}
          <tr>
            <th className="loader">
              <PulseLoader
                color='#6588D5'
                size={7}
                margin={2}
                loading={loading}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps(cellProps)}>
                      <div>{cell.render("Cell")}</div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {page.length === 0 && !loading &&
            <tr><td className="text-center">目前無資料</td></tr>}
        </tbody>
        {tableStyle && data.length > 0 &&
          <tfoot>
            <tr>
              <td> </td>
            </tr>
          </tfoot>
        }
      </table>
    </div>
  );
};

export default Table;

Table.defaultProps = {
  loading: false,
  onSelectedChange: () => {},
};
