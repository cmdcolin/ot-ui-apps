import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bold: {
    fill: theme.palette.grey[600],
  },

  blue: {
    fill: theme.palette.primary.main,
  },

  red: {
    fill: theme.palette.secondary.main,
  },

  default: {
    fill: theme.palette.grey[500],
  },
}));

const MAX_RADIUS = 6;
const WIDTH = 2 * (MAX_RADIUS + 1);
const CENTER = WIDTH / 2;
const DataCircle = ({
  radius,
  colorScheme,
}: {
  radius: number;
  colorScheme: keyof ReturnType<typeof useStyles>;
}) => {
  const classes = useStyles();
  const className = classes[colorScheme];
  return (
    <div className={classes.container}>
      <svg width={WIDTH} height={WIDTH} xmlns="http://www.w3.org/2000/svg">
        <circle cx={CENTER} cy={CENTER} r={radius} className={className} />
      </svg>
    </div>
  );
};

export default DataCircle;
