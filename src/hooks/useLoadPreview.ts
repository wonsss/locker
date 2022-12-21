import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import Storage from 'storage';

export const useLoadPreview = ({
  key,
  defaultData,
  nextPath,
  setRecoilState,
}: {
  key: string;
  defaultData: any;
  nextPath: string;
  setRecoilState: SetterOrUpdater<any>;
}) => {
  const listFromStorage = Storage.load(key);
  const [list, setList] = useState<any[] | undefined>(listFromStorage);
  const [preview, setPreview] = useState(list?.length ? list[0] : defaultData);

  const handleClickItemButton = (data: any) => {
    setPreview(data);
  };

  const handleDeleteButton = () => {
    if (!list) {
      return;
    }

    const filteredList = list.filter(({ id }) => id !== preview.id);
    setList(filteredList);
    setPreview(filteredList.length ? filteredList[0] : defaultData);

    localStorage.setItem(key, JSON.stringify(filteredList));
  };

  const navigate = useNavigate();

  const handleClickNextButton = () => {
    setRecoilState(preview);
    navigate(nextPath);
  };

  return {
    list,
    preview,
    handleClickItemButton,
    handleDeleteButton,
    handleClickNextButton,
  };
};
