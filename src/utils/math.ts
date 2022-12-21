export const divisor = (number: number) => {
  const arr = [];
  for (let i = 2; i < number; i++) {
    if (number % i == 0) {
      arr.push(i);
    }
  }
  if (!arr[0]) {
    return [number];
  } else {
    return arr;
  }
};
