import { nameState } from 'globalStates/nameState';
import { ChangeEvent, useRef } from 'react';
import { useRecoilState } from 'recoil';

const useNewName = () => {
  const [name, setName] = useRecoilState(nameState);

  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChangeNameTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nameList = e.target.value.split(' ');
    setName((prev) => ({ title: prev.title, list: nameList }));
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  const handleChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName((prev) => ({ title: e.target.value, list: prev.list }));
  };

  return { name, textarea, handleChangeNameTextarea, handleChangeTitleInput };
};

export default useNewName;
