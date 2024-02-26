/**
 * Returns an array of values of a given object
 *
 * @param object
 */
export function valuesExtractor(object: any) {
  if (object === undefined || object === null || typeof object != 'object') {
    return null;
  }

  const values: any[] = Object.values(object).map(value => {
    if (typeof value === 'object') {
      return valuesExtractor(value);
    }

    if (value === '') {
      return null;
    }
    return value;
  });

  return values.flat(5);
}

/**
 * Returns an array of keys of a given object
 *
 * @param object
 */
export function keysExtractor(object: any, prefix: string = '') {
  if (object === undefined || object === null || typeof object != 'object') {
    if (prefix === '') {
      return null;
    }
    return prefix;
  }

  const keys: any[] = Object.entries(object).map(entry => {
    if (typeof entry[1] === 'object') {
      if (prefix === '') {
        return keysExtractor(entry[1], entry[0]);
      }
      return keysExtractor(entry[1], `${prefix}_${entry[0]}`);
    }
    if (prefix === '') {
      return entry[0];
    }
    return `${prefix}_${entry[0]}`;
  });

  return keys.flat(5);
}
