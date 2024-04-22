type NestedObject = { [key: string]: NestedObject | string };

export function convertDotNotationIntoNestedObject(
  obj: NestedObject
): NestedObject {
  const result: NestedObject = {};

  for (const key in obj) {
    const parts = key.split('.');
    let current: NestedObject = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      current[part] = current[part] || {};
      current = current[part] as NestedObject;
    }

    current[parts[parts.length - 1]] = obj[key];
  }

  return result;
}
