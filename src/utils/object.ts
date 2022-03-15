export const getType = (value: any): string => Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();

export const hasType = (value: any, types: string) => getType(value) === types.toLocaleLowerCase();

export const deepCopy = (value: any): any => {
  const target: { [key: string]: any } = hasType(value, 'array') ? [] : {};
  Object.keys(value).forEach((keys): void => {
    const item = value[keys];
    if (['array', 'object'].includes(getType(item))) {
      target[keys] = deepCopy(item);
    } else {
      target[keys] = item;
    }
  });
  return target;
};
