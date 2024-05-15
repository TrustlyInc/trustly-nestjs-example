import { EstablishDto } from '../Dtos/establish.dto';

import {
  createSignatureQueryString,
  generateSignature,
  normalizeEstablishData,
} from './request-signature.utils';

describe('generateSignature', () => {
  const accessId = '123456';
  const establishData: EstablishDto = {
    accessId: '1234',
    account: {
      accountNumber: '',
      routingNumber: '',
      type: 1,
      // Application specific fields
      country: '',
      name: '',
      nameOnAccount: '',
      paymentProviderSubtype: 0,
      profile: 0,
      source: 0,
      token: '',
      verification: {
        hasEnoughFunds: false,
        verificationDate: 0,
        verified: false,
        type: 0,
      },
      verified: false,
    },
    amount: '1.00',
    cancelUrl: '',
    currency: 'USD',
    customer: {
      address: {
        address1: '123 Main St',
        city: 'San Francisco',
        country: 'US',
        state: 'CA',
        zip: '94111',
      },
      dateOfBirth: '1990-01-01',
      driverLicense: {
        number: '1010',
        state: 'CA',
      },
      email: 'john@ca.us',
      enrollDate: 1234567890,
      externalId: '1234',
      name: 'John Doe',
      phone: '123-456-7890',
      taxId: '123-45-6789',
      // Application specific fields
      createdAt: 0,
      customerId: '',
      merchantId: '',
      updatedAt: 0,
    },
    description: 'text',
    displayAmount: '1.00',
    localUrl: 'mySite',
    merchantId: '1234',
    merchantReference: 'ref123',
    metadata: {
      urlScheme: '',
    },
    paymentType: 'Recurring',
    recurrence: {
      automaticCapture: false,
      frequencyUnit: 1,
      frequencyUnitType: 3,
      recurringAmount: '1.00',
    },
    returnUrl: '',
    transactionId: '',
    verification: {
      verifyCustomer: false,
      // Application specific fields
      status: '',
      verified: false,
    },
    // Application specific fields
    env: '',
    minimumBalance: 0,
    timeZone: '',
  };

  it('should generate proper signature', () => {
    const expectedQueryString =
      'accessId=1234&merchantId=1234&description=text&currency=USD&amount=1.00&displayAmount=1.00&merchantReference=ref123&paymentType=Recurring&recurrence.frequencyUnit=1&recurrence.frequencyUnitType=3&recurrence.recurringAmount=1.00&customer.externalId=1234&customer.name=John Doe&customer.taxId=123-45-6789&customer.driverLicense.number=1010&customer.driverLicense.state=CA&customer.address.address1=123 Main St&customer.address.city=San Francisco&customer.address.state=CA&customer.address.zip=94111&customer.address.country=US&customer.phone=123-456-7890&customer.email=john@ca.us&customer.enrollDate=1234567890&customer.dateOfBirth=1990-01-01&account.type=1';
    const expectedSignature = 'HrGQpg/NsPXmh+P9u37R121Rot0=';

    const queryString = createSignatureQueryString(establishData);
    const signature = generateSignature(establishData, accessId);

    expect(queryString).toEqual(expectedQueryString);
    expect(signature).toBe(expectedSignature);
  });

  it('should generate proper signature ignoring empty strings', () => {
    const establishDataWithEmptyStrings = {
      ...establishData,
      displayAmount: '',
    };
    const expectedSignature = 'L/tBy40/WKaWNH0dcdp9j09cMqs=';

    const queryString = createSignatureQueryString(
      establishDataWithEmptyStrings
    );
    const signature = generateSignature(
      establishDataWithEmptyStrings,
      accessId
    );

    expect(queryString).not.toContain('transactionId=');
    expect(signature).toBe(expectedSignature);
  });

  it('should generate proper signature ignoring not intended data', () => {
    const establishDataWithNotIntendedData = {
      ...establishData,
      notIntendedData: 'notIntendedData',
    };
    const expectedSignature = 'HrGQpg/NsPXmh+P9u37R121Rot0=';

    const queryString = createSignatureQueryString(
      establishDataWithNotIntendedData
    );
    const signature = generateSignature(
      establishDataWithNotIntendedData,
      accessId
    );

    expect(queryString).not.toContain('notIntendedData=');
    expect(signature).toBe(expectedSignature);
  });

  it('should generate proper signature ignoring false booleans', () => {
    const establishDataWithFalseBooleans = {
      ...establishData,
      recurrence: {
        ...establishData.recurrence,
        automaticCapture: false,
      },
    };
    const expectedSignature = 'HrGQpg/NsPXmh+P9u37R121Rot0=';

    const queryString = createSignatureQueryString(
      establishDataWithFalseBooleans
    );
    const signature = generateSignature(
      establishDataWithFalseBooleans,
      accessId
    );

    expect(queryString).not.toContain('recurrence.automaticCapture=');
    expect(signature).toBe(expectedSignature);
  });

  it('should create proper query string with first-level nested objects', () => {
    const establishDataWithNestedObjects = {
      ...establishData,
      customer: {
        ...establishData.customer,
        dateOfBirth: '2000-01-01',
      },
    };

    const queryString = createSignatureQueryString(
      establishDataWithNestedObjects
    );

    expect(queryString).toContain('customer.dateOfBirth=2000-01-01');
  });

  it('should create proper query string with deep nested objects', () => {
    const establishDataWithNestedObjects = {
      ...establishData,
      customer: {
        ...establishData.customer,
        address: {
          ...establishData.customer.address,
          country: 'BR',
        },
      },
    };

    const queryString = createSignatureQueryString(
      establishDataWithNestedObjects
    );

    expect(queryString).toContain('customer.address.country=BR');
  });
});

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
