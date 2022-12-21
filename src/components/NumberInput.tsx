import { InputHTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
};

export default function NumberInput(props: NumberInputProps) {
  return (
    <InputWrapper>
      <Label htmlFor={props.title}>{props.title}</Label>
      <Input type="number" id={props.title} {...props} max="26" min="1" />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: ${colors.grey300};
  font-weight: bold;
`;

const Input = styled.input`
  color: ${colors.grey500};
  height: 30px;
  width: 30px;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 12px;
  border: 2px solid ${colors.grey300};
  outline: 0;
  text-align: center;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :focus {
    border-color: ${colors.grey500};
  }
  transition: background-color 0.2s ease;
`;
