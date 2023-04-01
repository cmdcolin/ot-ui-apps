import React, { Ref, useState } from 'react';
import Select, {
  InputProps,
  MultiValue as MultiValueType,
  SingleValue as SingleValueType,
} from 'react-select';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';

import Placeholder from './Placeholder';
import NoOptionsMessage from './NoOptionsMessage';
import SingleValue from './SingleValue';
import ValueContainer from './ValueContainer';
import Menu from './MenuFilter';
import MultiValue from './MultiValue';
import OptionFilter from './OptionFilter';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    minWidth: '70px',
  },
  wide: {
    minWidth: '300px',
  },
});

const IndicatorSeparator = () => null;

const ClearIndicator = () => null;

const OptionContainer = ({
  children,
  innerRef,
  innerProps,
  isFocused,
  isSelected,
}: {
  children?: React.ReactElement;
  innerRef?: Ref<unknown>;
  innerProps?: MenuItemProps;
  isFocused?: boolean;
  isSelected?: boolean;
}) => {
  // typescript is picky about it being true or undefined, not false
  const buttonProp =
    innerProps && innerProps.button === true ? true : undefined;
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      style={{
        fontWeight: isSelected ? 500 : 400,
        maxWidth: '800px',
        padding: 0,
        height: 'auto',
      }}
      {...innerProps}
      button={buttonProp}
    >
      {children}
    </MenuItem>
  );
};

const InputComponent = ({ inputRef, ...rest }) => (
  <div ref={inputRef} {...rest} />
);

function Control(props: {
  innerRef: Ref<unknown>;
  children: React.ReactElement;
  innerProps: InputProps;
  selectProps: { textFieldProps: TextFieldProps };
}) {
  return (
    <TextField
      fullWidth
      InputProps={{
        // @ts-expect-error unsure what this error is
        inputComponent: InputComponent,
        inputProps: {
          style: {
            display: 'flex',
            backgroundColor: '#eee',
          },
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Autocomplete({
  placeholder,
  options,
  multiple,
  value,
  handleSelectOption,
  getOptionLabel,
  getOptionValue,
  OptionComponent,
  wide,
}: {
  placeholder: string;
  options: string[];
  multiple: boolean;
  value: string;
  handleSelectOption: (
    arg: MultiValueType<string> | SingleValueType<string>
  ) => void;
  getOptionLabel: () => string;
  getOptionValue: () => string;
  OptionComponent: React.FC<any>;
  wide: boolean;
}) {
  const classes = useStyles();
  const theme = useTheme();
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
  };

  const Option = ({
    data,
    children,
    isSelected,
    ...rest
  }: {
    data: { chained: boolean; selected: boolean };
    children?: React.ReactElement;
    isSelected: boolean;
  }) => {
    return (
      <OptionContainer {...rest}>
        {OptionComponent ? (
          <OptionComponent data={data}>{children}</OptionComponent>
        ) : (
          <OptionFilter data={data}>{children}</OptionFilter>
        )}
      </OptionContainer>
    );
  };

  const components = {
    Control,
    NoOptionsMessage,
    Placeholder,
    SingleValue,
    ValueContainer,
    Menu,
    Option,
    MultiValue,
    IndicatorSeparator,
    ClearIndicator,
  };

  return (
    <div className={classNames(classes.root, { [classes.wide]: wide })}>
      <Select
        options={options}
        styles={selectStyles}
        // @ts-expect-error may be good to avoid this ignore error
        components={components}
        value={value}
        onChange={arg =>
          // may be good to avoid the 'as'  cast if possible
          handleSelectOption(
            arg as SingleValueType<string> | MultiValueType<string>
          )
        }
        placeholder={placeholder}
        isMulti={multiple}
        hideSelectedOptions={false}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        menuPosition="absolute"
      />
    </div>
  );
}

export default Autocomplete;
