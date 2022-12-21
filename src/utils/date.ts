export const getNowDate = () => {
  const date = new Date();
  const convertedDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return convertedDate;
};
