type ObjectTypes = { [key: string | number]: any }

export const getType = (value: ObjectTypes): string => Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();

export const hasType = (value: ObjectTypes, types: string) => getType(value) === types.toLocaleLowerCase();

export const deepCopy = (value: ObjectTypes) => {
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

export const merge = (target: ObjectTypes, ...args: ObjectTypes[]) => args.reduce((value, arg) => Object.keys(arg).reduce((val, keys) => {
  const [p1, p2] = [getType(val[keys]), getType(arg[keys])];
  if (['array', 'object'].includes(p1) && p1 === p2) {
    val[keys] = merge(val[keys], arg[keys]);
  } else {
    val[keys] = arg[keys];
  }
  return val;
}, value), target);

export const mergeConfig = (target: ObjectTypes, ...args: ObjectTypes[]) => args.reduce((data, value) => Object.keys(value).reduce((val, keys) => {
  if (!Object.prototype.hasOwnProperty.call(val, keys)) {
    val[keys] = value[keys];
  } else {
    const [p1, p2] = [getType(val[keys]), getType(value[keys])];
    if (p1 === p2 && p1 === 'object') {
      val[keys] = mergeConfig(val[keys], value[keys]);
    }
  }
  return val;
}, data), target);
