import { Result } from '.';
import { useParams } from 'react-router-dom';
import Storage from 'storage';

const useGetResult = () => {
  const { resultId } = useParams();
  const resultList = Storage.load('result') as Result[];
  const result = resultList.find((result) => result.id === resultId);

  return { result };
};

export default useGetResult;
