import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
});

const ValueContainer = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();
  return <div className={classes.valueContainer}>{children}</div>;
};

export default ValueContainer;
