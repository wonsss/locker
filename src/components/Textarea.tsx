import styled from '@emotion/styled';

import { colors } from 'constants/colors';

const Textarea = styled.textarea`
  color: ${colors.grey500};
  width: 100%;
  margin: 24px 0;
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

export default Textarea;
