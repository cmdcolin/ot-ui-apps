import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useActionsStyles = makeStyles({
  root: {
    flexShrink: 0,
  },
});

export default function TablePaginationActions({
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
