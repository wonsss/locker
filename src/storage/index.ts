const localStorageGetItem = (key: string) => {
  const localData = localStorage.getItem(key);
  return localData && JSON.parse(localData);
};

const localStorageSetItem = (key: string, data: unknown) => {
  const newData = localStorageGetItem(key)
    ? [...localStorageGetItem(key), data]
    : [data];
  localStorage.setItem(key, JSON.stringify(newData));
};

const Storage = {
  load: localStorageGetItem,
  save: localStorageSetItem,
};

export default Storage;
