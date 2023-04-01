import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiChip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  miniChip: {
    color: 'white',
    backgroundColor: props =>
      // @ts-expect-error
      props.data.chipcolor ? props.data.chipcolor : theme.palette.primary.main,
    margin: '1px',
    height: '20px',
    fontSize: '0.7rem',
  },
  deleteIcon: {
    fontSize: '16px',
  },
}));

const Chip = ({
  children,
  selectProps,
  removeProps,
  data,
}: {
  children?: React.ReactElement;
  selectProps: { getOptionValue: (arg: unknown) => string };
  removeProps: { onClick: () => void };
  data: unknown;
}) => {
  const classes = useStyles();
  return (
    <MuiChip
      key={selectProps.getOptionValue(data)}
      className={classes.miniChip}
      tabIndex={-1}
      label={children}
      onDelete={removeProps.onClick}
      deleteIcon={
        <CancelIcon className={classes.deleteIcon} {...removeProps} />
      }
    />
  );
};

export default Chip;
