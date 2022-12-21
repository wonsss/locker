import { ChangeEvent, useState } from 'react';

export const useRadioOption = (initialOption: string) => {
  const [option, setOption] = useState(initialOption);

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  return { option, handleChangeRadio };
};
