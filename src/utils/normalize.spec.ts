import { convertDotNotationIntoNestedObject } from './normalize';

describe('convertDotNotationIntoNestedObject', () => {
  test('converts dot notation into nested object', () => {
    const input = {
      'customer.address.country': 'US',
      'customer.email': 'john@us.com',
      'customer.name': 'John',
    };

    const expectedOutput = {
      customer: {
        address: {
          country: 'US',
        },
        email: 'john@us.com',
        name: 'John',
      },
    };

    const result = convertDotNotationIntoNestedObject(input);

    expect(result).toEqual(expectedOutput);
  });

  test('returns the same object reference for object literal input', () => {
    const input = {
      customer: {
        address: {
          country: 'US',
        },
        email: 'john@us.com',
        name: 'John',
      },
    };

    const result = convertDotNotationIntoNestedObject(input);

    expect(result).toEqual(input);
  });
});
