import { ChangeEvent } from 'react';

import { colors } from 'constants/colors';

export default function SeparatorRadioInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ margin: '0 24px 24px' }}>
      <fieldset
        style={{ borderRadius: '14px', border: `2px solid ${colors.grey100}` }}
      >
        <legend style={{ color: colors.grey400 }}>
          이름 구분자를 선택하세요
        </legend>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <input
              type="radio"
              id="공백(아스키코드32번)"
              name="separator"
              value=" "
              onChange={onChange}
              checked={value === ' '}
            />
            <label htmlFor="공백(아스키코드32번)"> 공백(아스키코드32번)</label>
          </div>

          <div>
            <input
              type="radio"
              id="공백(아스키코드9번)"
              name="separator"
              value="	"
              onChange={onChange}
              checked={value === '	'}
            />
            <label htmlFor="공백(아스키코드9번)"> 공백(아스키코드9번)</label>
          </div>

          <div>
            <input
              type="radio"
              id="콤마"
              name="separator"
              value=","
              onChange={onChange}
              checked={value === ','}
            />
            <label htmlFor="콤마"> 콤마</label>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
