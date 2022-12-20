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

export const Button = styled.button<ButtonProps>`
  ${({ size, isActive = true }) => css`
    height: ${SIZES[size].height};
    max-height: ${SIZES[size].height};
    min-width: ${SIZES[size].minWidth};
    width: fit-content;
    vertical-align: middle;
    text-align: center;
    padding: 0 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    max-width: 900px;
    border-radius: 16px;

    ${isActive
      ? css`
          background-color: ${colors.darkGrey};
          color: ${colors.white};
          &:hover {
            filter: brightness(1.5);
          }
        `
      : css`
          background-color: ${colors.lightGrey};
          color: ${colors.white};
          &:hover {
            filter: brightness(1.5);
          }
        `}

    font-size: ${SIZES[size].fontSize};

    &:disabled {
      background-color: ${colors.darkGrey};
      cursor: default;
      &:hover {
        filter: brightness(1);
      }
    }
  `}
`;
