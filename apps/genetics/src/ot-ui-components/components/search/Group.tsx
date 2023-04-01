import React from 'react';

const Group = ({
  children,
  Heading,
  headingProps,
  label,
}: {
  children?: React.ReactNode;
  Heading: React.FC<any>;
  headingProps: any;
  label: string;
}) => (
  <div>
    <Heading {...headingProps}>{label}</Heading>
    <div>{children}</div>
  </div>
);

export default Group;
