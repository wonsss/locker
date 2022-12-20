import styled from '@emotion/styled';

import { colors } from 'constants/colors';

const UnderLineInput = styled.input`
  color: ${colors.grey500};
  height: 30px;
  width: 100%;
  font-weight: 500;
  font-size: 20px;
  border-radius: 1px;
  outline: none;
  border: 0 none;
  border-bottom: 2px solid ${colors.grey100};

  :focus {
    border-bottom-color: ${colors.grey500};
  }
  transition: background-color 0.2s ease;

  ::placeholder {
    color: ${colors.grey300};
  }
`;

export default UnderLineInput;
