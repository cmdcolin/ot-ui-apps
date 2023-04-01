import React, { Ref } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { SvgIconProps, SvgIcon } from '@material-ui/core';

const DropdownIndicator = ({
  inputRef,
  innerProps,
}: {
  inputRef: Ref<SVGSVGElement>;
  innerProps: SvgIconProps;
}) => {
  return (
    <SvgIcon ref={inputRef} {...innerProps} color="inherit">
      <SearchIcon />
    </SvgIcon>
  );
};

export default DropdownIndicator;
