import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    padding: 0,
  },
});

const InputComponent = ({ inputRef, ...rest }) => (
  <div ref={inputRef} {...rest} />
);

function Control({
  innerRef,
  innerProps,
  children,
  selectProps,
}: {
  innerRef: React.Ref<unknown>;
  innerProps: any;
  children: React.ReactNode;
  selectProps: { textFieldProps: TextFieldProps };
}) {
  const classes = useStyles();
  return (
    <TextField
      fullWidth
      InputProps={{
        // @ts-expect-error not sure how to fix
        inputComponent: InputComponent,
        inputProps: {
          className: classes.input,
          inputRef: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...selectProps.textFieldProps}
    />
  );
}

export default Control;
