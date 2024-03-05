import { EstablishDto } from '../Dtos/establish.dto';
import { normalizeEstablishData } from './request-signature.utils';

describe('normalizeEstablishData', () => {
  test('converts dot notation into nested object', () => {
    const dotNotationExample = { 'customer.address.country': 'US' };
    const nestedObjectExpectation = {
      customer: { address: { country: 'US' } },
    };

    const establish = {
      ...new EstablishDto(),
      ...dotNotationExample,
    };
    const rawBody = Buffer.from(JSON.stringify(dotNotationExample), 'utf-8');

    const result = normalizeEstablishData(establish, rawBody);

    expect(result).toEqual(nestedObjectExpectation);
  });
});
