import React from 'react';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    position: 'absolute',
    minWidth: '100px',
    maxWidth: '800px',
    zIndex: 1005,
  },
}));

const Menu = ({
  innerProps,
  children,
}: {
  innerProps: PaperProps;
  children?: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <Paper square className={classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
};

export default Menu;
