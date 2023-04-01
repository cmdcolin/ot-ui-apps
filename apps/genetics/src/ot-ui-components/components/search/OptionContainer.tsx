import React, { Ref } from 'react';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';

const OptionContainer = (props: {
  children?: React.ReactNode;
  innerRef: Ref<unknown>;
  innerProps: MenuItemProps;
  isFocused: boolean;
  isSelected: boolean;
}) => {
  const { children, innerRef, innerProps, isFocused, isSelected } = props;
  const button = innerProps && innerProps.button === true ? true : undefined;
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
      button={button}
    >
      {children}
    </MenuItem>
  );
};

export default OptionContainer;
