import { EstablishDto } from '../Dtos/establish.dto';
import { convertDotNotationIntoNestedObject } from '../utils/normalize';

const crypto = require('crypto');

const signatureKeysOrdered = [
  'accessId',
  'merchantId',
  'description',
  'currency',
  'amount',
  'displayAmount',
  'minimumBalance',
  'merchantReference',
  'paymentType',
  'timeZone',
  'recurrence.startDate',
  'recurrence.endDate',
  'recurrence.frequency',
  'recurrence.frequencyUnit',
  'recurrence.frequencyUnitType',
  'recurrence.recurringAmount',
  'recurrence.automaticCapture',
  'verification.status',
  'verification.verifyCustomer',
  'customer.customerId',
  'customer.externalId',
  'customer.name',
  'customer.vip',
  'customer.taxId',
  'customer.driverLicense.number',
  'customer.driverLicense.state',
  'customer.address.address1',
  'customer.address.address2',
  'customer.address.city',
  'customer.address.state',
  'customer.address.zip',
  'customer.address.country',
  'customer.phone',
  'customer.email',
  'customer.balance',
  'customer.currency',
  'customer.enrollDate',
  'customer.externalTier',
  'customer.dateOfBirth',
  'account.nameOnAccount',
  'account.name',
  'account.type',
  'account.profile',
  'account.accountNumber',
  'account.routingNumber',
  'transactionId',
];

export const createSignatureQueryString = (establishData: EstablishDto) => {
  const searchParams: string[] = [];

  const appendSearchParam = (key: string, value: any) => {
    value && searchParams.push(`${key}=${value.toString()}`);
  };

  for (const key of signatureKeysOrdered) {
    if (!key.includes('.')) {
      appendSearchParam(key, establishData[key]);
      continue;
    }

    const subKeys = key.split('.');
    let data: EstablishDto = establishData;

    for (const subKey of subKeys) {
      const innerValue = data[subKey];

      if (typeof innerValue === 'object') {
        data = innerValue as EstablishDto;
      } else {
        appendSearchParam(key, innerValue);
        break;
      }
    }
  }

  return searchParams.join('&');
};

export const generateSignature = (establishData: EstablishDto, accessKey: string) => {
  const query = createSignatureQueryString(establishData);
  const requestSignature = crypto.createHmac('sha1', accessKey).update(query).digest('base64');

  return requestSignature;
};

export const normalizeEstablishData = (establish: EstablishDto, rawBody: Buffer) => {
  // Remove dot notations
  for (const key in establish) {
    if (key.includes('.')) delete establish[key];
  }

  // Add as nested objects
  const jsonBody = JSON.parse(rawBody.toString());
  const objectLiteralBody = convertDotNotationIntoNestedObject(jsonBody);
  for (const key in objectLiteralBody) {
    establish[key] = objectLiteralBody[key];
  }

  return establish;
};
