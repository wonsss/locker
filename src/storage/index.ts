const localStorageGetItem = (key: string) => {
  const localData = localStorage.getItem(key);
  return localData && JSON.parse(localData);
};

const localStorageSetItem = (key: string, data: unknown) => {
  const prevData = localStorageGetItem(key);
  localStorage.setItem('name', JSON.stringify([...prevData, data]));
};

const Storage = {
  load: localStorageGetItem,
  save: localStorageSetItem,
};

export default Storage;
