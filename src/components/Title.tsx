import { PropsWithChildren } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

export default function Title({
  linkTo,
  children,
}: PropsWithChildren<{
  linkTo?: string;
}>) {
  const navigate = useNavigate();
  const backToPreviousPage = () => {
    if (linkTo) {
      navigate(linkTo);
      return;
    }

    navigate(-1);
  };

  return (
    <Wrapper>
      {linkTo ? (
        <MdArrowBackIosNew
          role="button"
          size={24}
          onClick={backToPreviousPage}
          aria-label="뒤로가기"
          style={{ cursor: 'pointer' }}
        />
      ) : null}
      <Text>{children}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 0 24px;
`;

const Text = styled.h3`
  font-size: 22px;
  line-height: 31px;
  word-break: keep-all;
  white-space: pre-line;
  font-weight: bold;
  color: ${colors.grey900};
`;
