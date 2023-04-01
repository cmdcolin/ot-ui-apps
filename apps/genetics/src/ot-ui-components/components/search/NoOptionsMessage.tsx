import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  noOptionsMessage: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  },
}));

const NoOptionsMessage = ({
  innerProps,
  children,
}: {
  innerProps: TypographyProps;
  children?: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <Typography
      color="textSecondary"
      className={classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
};

export default NoOptionsMessage;
