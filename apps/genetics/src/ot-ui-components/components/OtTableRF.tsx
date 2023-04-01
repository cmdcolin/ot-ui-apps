import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import HelpIcon from '@material-ui/icons/Help';

import PlotContainer from './PlotContainer';
import PlotContainerSection from './PlotContainerSection';
import TablePaginationActions from './TablePaginationActions';
import { Column, Item } from './OtTable';
import { getComparator } from '../../../../platform/src/components/Table/sortingAndFiltering';

const PAGE_SIZE = 10;

const useStyles = makeStyles(theme => ({
  tableWrapper: {
    overflowX: 'auto',
  },
  tooltipIcon: {
    fontSize: '1.2rem',
    paddingLeft: `0.6rem`,
  },
  buttonMargin: {
    marginRight: '4px',
  },
  tableRow: {
    height: '31px',
  },
  tableRowFixed: {
    background: theme.palette.grey[300],
  },
  tableRowFilters: {
    verticalAlign: 'bottom',
  },
  tableCell: {
    padding: '0 12px 0 0',
    '&:first-child': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  },
  tableCellHeader: {
    paddingRight: '12px',
    paddingLeft: 0,
    '&:first-child': {
      paddingLeft: '24px',
    },
    '&:last-child': {
      paddingRight: '24px',
    },
  },
  tableCellSpanHeader: {
    borderLeft: '1px solid #E0E0E0',
    paddingLeft: '5px',
    '&:first-child': {
      borderLeft: 'none',
    },
  },
  tableCellHeaderVertical: {
    textAlign: 'center',
    verticalAlign: 'bottom',
  },
  tableCellVertical: {
    minWidth: '24px',
    width: '24px',
    paddingRight: 0,
  },
  tableCellFill: {
    width: '100%',
  },
  verticalHeader: {
    writingMode: 'vertical-rl',
    transform: 'rotate(180deg)',
    whiteSpace: 'nowrap',
  },
  downloadHeader: {
    marginTop: '7px',
  },
  badgeWithTooltip: {
    flexShrink: 1,
  },
}));

function OtTableRF({
  sortBy: sortByInitial,
  order: orderInitial,
  pageSize = PAGE_SIZE,
  loading,
  error,
  columns,
  data,
  columnsFixed,
  dataFixed,
  verticalHeaders,
  left,
  center,
  message,
  filters,
  totalRowsCount,
  headerGroups,
  serverSide,
  tableRowComponent,
  onPageSort,
}: {
  sortBy: string;
  order?: 'desc' | 'asc';
  pageSize?: number;
  loading?: boolean;
  error?: { graphQLErrors: { message: string }[] };
  columns: Column[];
  data: Item[];
  columnsFixed?: Column[];
  dataFixed?: Item[];
  verticalHeaders?: any;
  left?: React.ReactNode;
  center?: boolean;
  message?: React.ReactNode;
  filters?: unknown[];
  downloadFileStem?: string;
  excludeDownloadColumns?: string[];
  totalRowsCount?: number;
  headerGroups?: {
    colspan: number;
    label: React.ReactNode;
  }[];
  tableRowComponent?: React.FC<any>;
  serverSide?: boolean;
  reportTableSortEvent?: (sortBy: string, order: string) => void;
  reportTableDownloadEvent?: (format: string) => void;
  onPageSort?: (arg: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    order?: string;
  }) => void;
}) {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(sortByInitial);
  const [order, setOrder] = useState(orderInitial);
  const classes = useStyles();

  const handleChangePage = (page: number) => {
    setPage(page);
    onPageSort?.({ page, pageSize });
  };

  const selectSortColumn = (sortByParam: string) => {
    let order = 'desc' as 'asc' | 'desc';

    if (sortBy === sortByParam && order === 'desc') {
      order = 'asc';
    }

    onPageSort?.({ sortBy, order });

    setSortBy(sortBy);
    setOrder(order);
  };

  const filterRow = filters ? (
    <TableRow className={classes.tableRowFilters}>
      {columns.map(column => (
        <TableCell key={column.id} className={classes.tableCellHeader}>
          {column.renderFilter ? column.renderFilter() : null}
        </TableCell>
      ))}
    </TableRow>
  ) : null;
  return (
    <PlotContainer loading={loading} error={error} left={left} center={center}>
      {message ? (
        <PlotContainerSection>
          <div>
            <Typography variant="subtitle1">{message}</Typography>
          </div>
        </PlotContainerSection>
      ) : null}
      <PlotContainerSection>
        <div className={classes.tableWrapper}>
          <Table>
            <TableHead>
              {headerGroups ? (
                <TableRow>
                  {headerGroups.map((g, i) => (
                    <TableCell
                      colSpan={g.colspan}
                      key={i}
                      className={classNames(
                        classes.tableCellHeader,
                        classes.tableCellSpanHeader
                      )}
                    >
                      {g.label}
                    </TableCell>
                  ))}
                </TableRow>
              ) : null}
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    className={classNames(classes.tableCellHeader, {
                      [classes.tableCellHeaderVertical]: column.verticalHeader,
                      [classes.tableCellVertical]: column.verticalHeader,
                    })}
                    style={{
                      width: column.width,
                    }}
                  >
                    {column.orderable !== false ? (
                      <TableSortLabel
                        active={column.id === sortBy}
                        direction={order}
                        onClick={selectSortColumn.bind(null, column.id)}
                        className={
                          column.verticalHeader
                            ? classes.verticalHeader
                            : undefined
                        }
                      >
                        {column.tooltip ? (
                          <Badge
                            className={classes.badgeWithTooltip}
                            badgeContent={
                              <Tooltip
                                title={column.tooltip}
                                placement="top"
                                interactive
                              >
                                <HelpIcon className={classes.tooltipIcon} />
                              </Tooltip>
                            }
                          >
                            {column.label}
                          </Badge>
                        ) : (
                          column.label
                        )}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                {verticalHeaders ? (
                  <TableCell className={classes.tableCellFill} />
                ) : null}
              </TableRow>
              {filterRow}
            </TableHead>
            <TableBody>
              {columnsFixed && dataFixed
                ? dataFixed.map((row, index) => (
                    <TableRow
                      key={index}
                      className={classNames(
                        classes.tableRow,
                        classes.tableRowFixed
                      )}
                      // @ts-expect-error unclear why it doesn't like this
                      component={tableRowComponent}
                      data={row}
                    >
                      {columnsFixed.map(column => (
                        <TableCell
                          key={column.id}
                          className={classNames(classes.tableCell, {
                            [classes.tableCellVertical]: column.verticalHeader,
                          })}
                        >
                          {column.renderCell
                            ? column.renderCell(row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                      {verticalHeaders ? (
                        <TableCell className={classes.tableCellFill} />
                      ) : null}
                    </TableRow>
                  ))
                : null}
              {data
                .slice()
                .sort(getComparator(columns, sortBy, order))
                .slice(
                  (serverSide ? 0 : page) * pageSize,
                  (serverSide ? 0 : page) * pageSize + pageSize
                )
                .map((row, index) => (
                  <TableRow
                    key={index}
                    className={classes.tableRow}
                    // @ts-expect-error unclear why it doesn't like this
                    component={tableRowComponent}
                    data={row}
                  >
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        className={classNames(classes.tableCell, {
                          [classes.tableCellVertical]: column.verticalHeader,
                        })}
                        style={column.style}
                      >
                        {column.renderCell
                          ? column.renderCell(row)
                          : row[column.id]}
                      </TableCell>
                    ))}
                    {verticalHeaders ? (
                      <TableCell className={classes.tableCellFill} />
                    ) : null}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {!loading && data.length === 0 ? (
          <PlotContainerSection>
            <div>
              <Typography variant="subtitle1">(no data)</Typography>
            </div>
          </PlotContainerSection>
        ) : null}
        <TablePagination
          component="div"
          // can maybe typescript this a little better so totalRowsCount is
          // known to be defined if serverSide is true
          count={serverSide ? totalRowsCount || 0 : data.length}
          onPageChange={(_event, page) => handleChangePage(page)}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
          ActionsComponent={TablePaginationActions}
        />
      </PlotContainerSection>
    </PlotContainer>
  );
}

export default OtTableRF;
