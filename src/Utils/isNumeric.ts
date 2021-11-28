export const isNumeric = (val: string) => {
  const regex = new RegExp(/^\d+$/);
  console.log('regex', regex.test(val));
  return regex.test(val);
};
