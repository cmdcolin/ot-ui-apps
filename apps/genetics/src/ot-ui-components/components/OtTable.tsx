import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import HelpIcon from '@material-ui/icons/Help';

import PlotContainer from './PlotContainer';
import PlotContainerSection from './PlotContainerSection';
import downloadTable from '../helpers/downloadTable';

const PAGE_SIZE = 10;

const useActionsStyles = makeStyles({
  root: {
    flexShrink: 0,
  },
});

function TablePaginationActions({
  onPageChange,
  rowsPerPage,
  count,
  page,
}: {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (evt: any, page: number) => void;
}) {
  const classes = useActionsStyles();
  const lastPage = Math.ceil(count / rowsPerPage) - 1;
  return (
    <div className={classes.root}>
      <IconButton
        onClick={event => onPageChange(event, 0)}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={event => onPageChange(event, page - 1)}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={event => onPageChange(event, page + 1)}
        disabled={page >= lastPage}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={event => {
          const lastPage = Math.ceil(count / rowsPerPage) - 1;
          onPageChange(event, lastPage);
        }}
        disabled={page >= lastPage}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

interface Column {
  id: string;
  comparator: <T>(a: T, b: T) => number;
  verticalHeader?: boolean;
  tooltip: string;
  label: string;
  renderCell?: (item: Item) => React.ReactElement;
  renderFilter?: () => React.ReactElement;
}

type Item = Record<string, any>;

const getComparator = (
  columns: Column[],
  sortBy: string,
  order?: 'asc' | 'desc'
) => {
  const column = columns.find(col => col.id === sortBy);

  if (column && column.comparator) {
    return order === 'asc'
      ? (a: Item, b: Item) => column.comparator(a, b)
      : (a: Item, b: Item) => -column.comparator(a, b);
  }

  const comparatorValue = order === 'desc' ? 1 : -1;

  return (a: Item, b: Item) => {
    if (a[sortBy] === b[sortBy]) {
      return 0;
    }

    if (a[sortBy] === undefined || a[sortBy] === '' || a[sortBy] < b[sortBy]) {
      return comparatorValue;
    }

    if (b[sortBy] === undefined || b[sortBy] === '' || a[sortBy] > b[sortBy]) {
      return -comparatorValue;
    }

    return 0;
  };
};

const useTableStyles = makeStyles(theme => ({
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

function OtTable({
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
  downloadFileStem,
  excludeDownloadColumns,
  reportTableSortEvent,
  reportTableDownloadEvent,
}: {
  reportTableSortEvent?: (sortBy: string, order: string) => void;
  sortBy: string;
  order?: 'desc' | 'asc';
  pageSize?: number;
  loading: boolean;
  error: { graphQLErrors: { message: string }[] };
  columns: Column[];
  data: Item[];
  columnsFixed: Column[];
  dataFixed: Item[];
  verticalHeaders: any;
  left: boolean;
  center: boolean;
  message: string;
  filters: unknown[];
  downloadFileStem: string;
  excludeDownloadColumns: string[];
  reportTableDownloadEvent: (format: string) => void;
}) {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(sortByInitial);
  const [order, setOrder] = useState(orderInitial);
  const classes = useTableStyles();

  const selectSortColumn = (sortByParam: string) => {
    let order = 'desc' as 'asc' | 'desc';

    if (sortBy === sortByParam && order === 'desc') {
      order = 'asc';
    }

    if (reportTableSortEvent) {
      reportTableSortEvent(sortBy, order);
    }

    setSortBy(sortBy);
    setOrder(order);
  };

  const handleTableDownload = (format: string) => {
    if (reportTableDownloadEvent) {
      reportTableDownloadEvent(format);
    }

    const headerMap = excludeDownloadColumns
      ? columns.filter(column => !excludeDownloadColumns.includes(column.id))
      : columns;

    downloadTable({
      headerMap,
      rows: data,
      format,
      filenameStem: downloadFileStem,
    });
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
    <PlotContainer
      loading={loading}
      error={error}
      left={left}
      center={center}
      right={
        <Grid container justifyContent="flex-end" spacing={1}>
          <Grid item>
            <Typography variant="caption" className={classes.downloadHeader}>
              Download table as
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleTableDownload('json')}
            >
              JSON
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleTableDownload('csv')}
            >
              CSV
            </Button>
          </Grid>
          <Grid item className={classes.buttonMargin}>
            <Button
              variant="outlined"
              onClick={() => handleTableDownload('tsv')}
            >
              TSV
            </Button>
          </Grid>
        </Grid>
      }
    >
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
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    className={classNames(classes.tableCellHeader, {
                      [classes.tableCellHeaderVertical]: column.verticalHeader,
                      [classes.tableCellVertical]: column.verticalHeader,
                    })}
                  >
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
                .slice(page * pageSize, page * pageSize + pageSize)
                .map((row, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    {columns.map(column => (
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
          count={data.length}
          onPageChange={(event, page) => setPage(page)}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
          ActionsComponent={TablePaginationActions}
        />
      </PlotContainerSection>
    </PlotContainer>
  );
}

export default OtTable;
