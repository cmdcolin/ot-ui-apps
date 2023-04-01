import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  singleValue: {
    fontSize: 16,
  },
});

const SingleValue = ({
  innerProps,
  children,
}: {
  innerProps: TypographyProps;
  children?: React.ReactElement;
}) => {
  const classes = useStyles();
  return (
    <Typography className={classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
};

export default SingleValue;
