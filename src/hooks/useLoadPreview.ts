import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import Storage from 'storage';

import useSetResult from 'pages/ResultPage/useSetResult';

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

  useEffect(() => {
    setRecoilState(preview);
  }, []);

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
  const { setResult, resultId } = useSetResult();

  const handleClickNextButton = () => {
    if (nextPath === '/result') {
      setResult();
      navigate(`${nextPath}/${resultId}`);
    } else {
      navigate(nextPath);
    }
  };

  return {
    list,
    preview,
    handleClickItemButton,
    handleDeleteButton,
    handleClickNextButton,
  };
};
