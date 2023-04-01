import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  high: {
    // @ts-expect-error
    color: theme.palette.high,
  },
  medium: {
    // @ts-expect-error
    color: theme.palette.medium,
  },
  low: {
    // @ts-expect-error
    color: theme.palette.low,
  },
  default: {
    color: theme.palette.grey[500],
  },
}));

const LabelHML = ({
  level,
  children,
}: {
  level: string;
  children: React.ReactNode;
}) => {
  const classes = useStyles();
  const labelClass =
    level === 'L'
      ? classes.low
      : level === 'M'
      ? classes.medium
      : level === 'H'
      ? classes.high
      : classes.default;
  return <span className={labelClass}>{children}</span>;
};

export default LabelHML;
