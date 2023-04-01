import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

import downloadTable from '../helpers/downloadTable';
import { Column } from './OtTable';

const useStyles = makeStyles({
  container: {
    marginBottom: '2px',
  },
  downloadHeader: {
    marginTop: '7px',
  },
  'ml-1': {
    'margin-left': '1em',
  },
});

function handleDownload(
  headers: Column[],
  rows: unknown[],
  fileStem: string,
  format: string
) {
  downloadTable({
    headerMap: headers,
    rows,
    format,
    filenameStem: fileStem,
  });
}

function DataDownloader({
  tableHeaders,
  rows,
  fileStem,
  loading,
}: {
  tableHeaders: Column[];
  rows: any[];
  loading?: boolean;
  fileStem: string;
}) {
  const classes = useStyles();
  if (loading) {
    return (
      <Grid container justifyContent="flex-end" spacing={1}>
        <Skeleton width="15vw" />
        <Skeleton className={classes['ml-1']} width="6vw" height="6vh" />
        <Skeleton className={classes['ml-1']} width="6vw" height="6vh" />
        <Skeleton className={classes['ml-1']} width="6vw" height="6vh" />
      </Grid>
    );
  }
  return (
    <Grid
      container
      justifyContent="flex-end"
      spacing={1}
      className={classes.container}
    >
      <Grid item>
        <Typography variant="caption" className={classes.downloadHeader}>
          Download table as
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => handleDownload(tableHeaders, rows, fileStem, 'json')}
        >
          JSON
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => handleDownload(tableHeaders, rows, fileStem, 'csv')}
        >
          CSV
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => handleDownload(tableHeaders, rows, fileStem, 'tsv')}
        >
          TSV
        </Button>
      </Grid>
    </Grid>
  );
}

export default DataDownloader;
