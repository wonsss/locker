import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

type TextProps = {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
};

export default function Text({
  children,
  color,
  fontSize,
  fontWeight,
}: PropsWithChildren<TextProps>) {
  return (
    <Span
      style={{
        color: color ?? colors.grey500,
        fontSize: fontSize ?? '17px',
        fontWeight: fontWeight,
      }}
    >
      {children}
    </Span>
  );
}

const Span = styled.span`
  color: ${colors.grey500};
  font-size: 17px;
  font-weight: bold;
`;
