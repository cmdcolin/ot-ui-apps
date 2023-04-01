import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiSlider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: 200,
    padding: '0 20px',
  },
  sliderContainer: {
    padding: '10px 5px 8px 5px',
  },
  min: {
    fontSize: '0.7rem',
  },
  max: {
    fontSize: '0.7rem',
  },
});

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (event: ChangeEvent<{}>, value: number | number[]) => void;
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>{label}</Typography>
      <div className={classes.sliderContainer}>
        <MuiSlider
          //classes={{ container: classes.slider }} does not exist?
          {...{ value, min, max, step, onChange }}
        />
      </div>

      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography className={classes.min}>{min}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.max}>{max}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Slider;
