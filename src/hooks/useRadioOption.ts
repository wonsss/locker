import { ChangeEvent, useState } from 'react';
import Storage from 'storage';

export const useRadioOption = (key: string) => {
  const storage = Storage.load(key);
  const initialOption = storage.length === 0 ? '새로 입력' : '불러오기';

  const [option, setOption] = useState(initialOption);

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  return { option, handleChangeRadio };
};
