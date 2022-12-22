import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from 'constants/colors';

type ButtonProps = {
  size: 'small' | 'medium' | 'large';
  isActive?: boolean;
};

const SIZES = {
  small: { minWidth: '50px', height: '29px', fontSize: '12px' },
  medium: { minWidth: '149px', height: '34px', fontSize: '14px' },
  large: { minWidth: '100%', height: '56px', fontSize: '16px' },
};

const Button = styled.button<ButtonProps>`
  ${({ size, isActive = true }) => css`
    min-height: ${SIZES[size].height};
    min-width: ${SIZES[size].minWidth};
    width: fit-content;
    vertical-align: middle;
    text-align: center;
    padding: 8px 12px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    max-width: 900px;
    border-radius: 16px;

    ${isActive
      ? css`
          background-color: ${colors.teal300};
          color: ${colors.white};
          &:hover {
            background-color: ${colors.teal400};
          }
        `
      : css`
          background-color: ${colors.grey400};
          color: ${colors.white};
          &:hover {
            background-color: ${colors.teal300};
          }
        `}

    font-size: ${SIZES[size].fontSize};

    &:disabled {
      background-color: ${colors.grey300};
      cursor: default;
    }
  `}
`;

export default Button;
