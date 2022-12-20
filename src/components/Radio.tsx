import { motion } from 'framer-motion';
import {
  Children,
  cloneElement,
  ComponentProps,
  InputHTMLAttributes,
  ReactElement,
  Ref,
  forwardRef,
} from 'react';

import styled from '@emotion/styled';

import { colors } from 'constants/colors';

interface RadioProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'disabled' | 'value'
  > {
  children: ReactElement<ComponentProps<typeof RadioOption>>[];
}

function Radio({ children, value, onChange }: RadioProps) {
  const checkedIndex = Children.map(children, (child) => {
    return child.props;
  }).findIndex((p) => p.value === value);

  const checked = checkedIndex !== -1;

  const numberOfChildren = Children.count(children);

  return (
    <RadioWrapper>
      <MotionDiv
        style={{
          width: `calc((100% - 8px) / ${numberOfChildren})`,
        }}
        animate={checked ? 'checked' : 'unchecked'}
        variants={{
          checked: {
            opacity: 1,
            translateX: `${checkedIndex * 100}%`,
          },
          unchecked: {
            opacity: 0,
            translateX: 0,
          },
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 1 }}
      />
      {Children.map(children, (child) => {
        return cloneElement(child, {
          value: child.props.value,
          name: 'radio',
          checked: value === child.props.value,
          onChange,
        });
      })}
    </RadioWrapper>
  );
}

const RadioOption = forwardRef(
  (
    {
      children,
      checked,
      value,
      name,
      onChange,
      ...rest
    }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <RadioOptionWrapper>
        <RadioOptionInput
          type="radio"
          id={String(value)}
          checked={checked}
          onChange={onChange}
          name={name}
          value={value}
          ref={ref}
          {...rest}
        />
        <RadioOptionLabel htmlFor={String(value)}>
          <RadioOptionSpan>{children}</RadioOptionSpan>
        </RadioOptionLabel>
      </RadioOptionWrapper>
    );
  },
);

RadioOption.displayName = 'RadioOption';

const RadioWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: ${colors.lightGrey};
`;

const MotionDiv = styled(motion.div)`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 9%);
  background-color: ${colors.white};
  z-index: 0;
  opacity: 0;
  border-radius: 24px;
`;

const RadioOptionWrapper = styled.div`
  z-index: 1;
  flex: 1 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  border-radius: 24px;
`;

const RadioOptionInput = styled.input`
  position: absolute;
  padding: 0;
  margin: -1px;
  width: 1px;
  height: 1px;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const RadioOptionLabel = styled.label`
  width: 100%;
  text-align: center;
  cursor: pointer;
  margin: 0;
  color: ${colors.grey};
`;

const RadioOptionSpan = styled.span`
  max-width: 100%;
  white-space: nowrap;
`;

Radio.Option = RadioOption;

export default Radio;
