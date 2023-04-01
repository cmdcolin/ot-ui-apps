import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  option: {
    fontSize: '0.8rem',
    padding: '0 5px',
    marginLeft: '2px',
    marginBottom: '2px',
    fontWeight: 400,
    borderLeft: `4px solid ${theme.palette.grey[500]}`,
  },
  optionChained: {
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    fontWeight: 500,
  },
  optionSelected: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    fontWeight: 500,
  },
}));

const Option = ({
  children,
  data,
}: {
  children?: React.ReactElement;
  data: { chained: boolean; selected: boolean };
}) => {
  const classes = useStyles();
  return (
    <div
      className={classNames(classes.option, {
        [classes.optionChained]: data.chained,
        [classes.optionSelected]: data.selected,
      })}
    >
      {children}
    </div>
  );
};

export default Option;
