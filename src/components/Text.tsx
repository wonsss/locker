import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

type TextProps = {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  marginLeft?: string;
};

export default function Text({
  children,
  color = colors.grey500,
  fontSize = '17px',
  fontWeight,
  marginLeft,
}: PropsWithChildren<TextProps>) {
  return (
    <Span
      style={{
        color,
        fontSize,
        fontWeight,
        marginLeft,
      }}
    >
      {children}
    </Span>
  );
}

const Span = styled.span`
  color: ${colors.grey500};
  font-size: 17px;
`;
