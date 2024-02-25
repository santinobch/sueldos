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
export function keysExtractor(object: any) {
  if (object === undefined || object === null || typeof object != 'object') {
    return null;
  }

  const keys: any[] = Object.entries(object).map(entry => {
    if (typeof entry[1] === 'object') {
      return keysExtractor(entry[1]);
    }
    return entry[0];
  });

  return keys.flat(5);
}

export function ObjectToPostgreSQL() {}
