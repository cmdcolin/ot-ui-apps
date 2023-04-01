import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  placeholder: {
    position: 'absolute',
    left: 2,
  },
});

const Placeholder = ({
  innerProps,
  children,
}: {
  innerProps: TypographyProps;
  children: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <Typography
      color="textSecondary"
      className={classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
};

export default Placeholder;
