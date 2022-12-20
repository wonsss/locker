import Button from './Button';
import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

export default function FixedBottomButton({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) {
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
        <Button onClick={onClick} size="large">
          {children}
        </Button>
      </div>
    </div>
  );
}
