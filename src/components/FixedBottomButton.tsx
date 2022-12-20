import Button from './Button';
import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

export default function FixedBottomButton({
  children,
  onClick,
  disabled,
}: PropsWithChildren<{ onClick: () => void; disabled: boolean }>) {
  return (
    <div
      css={css`
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
      `}
    >
      <div
        css={css`
          padding: 0 20px 18px;
        `}
      >
        <Button disabled={disabled} onClick={onClick} size="large">
          {children}
        </Button>
      </div>
    </div>
  );
}
