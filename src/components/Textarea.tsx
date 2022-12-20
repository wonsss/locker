import { Ref, forwardRef, TextareaHTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

const Textarea = forwardRef(
  (
    props: TextareaHTMLAttributes<HTMLTextAreaElement>,
    forwardRef: Ref<HTMLTextAreaElement>,
  ) => {
    return (
      <TextareaWrapper>
        <TextareaElement ref={forwardRef} {...props} />
      </TextareaWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;

const TextareaWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 24px;
`;

const TextareaElement = styled.textarea`
  color: ${colors.grey500};
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-weight: 500;
  font-size: 18px;
  outline: none;
  border: 2px solid ${colors.grey100};
  border-radius: 10px;
  overflow: hidden;

  :focus {
    border: 2px solid ${colors.grey500};
  }
  transition: 0.2s ease;

  ::placeholder {
    color: ${colors.grey300};
  }
`;
