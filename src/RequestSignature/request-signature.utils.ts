import { EstablishDto } from '../Dtos/establish.dto';
import { convertDotNotationIntoNestedObject } from '../utils/normalize';

const CryptoSignature = require('crypto');

export const generateSignature = (establishData: EstablishDto, accessKey: string) => {
    let query = '';
    query += `accessId=${establishData.accessId}`;
    query += `&merchantId=${establishData.merchantId}`;
    query += `&description=${establishData.description}`;
    query += `&currency=${establishData.currency}`;
    query += `&amount=${establishData.amount}`;

    if (establishData.displayAmount) query += `&displayAmount=${establishData.displayAmount}`;
    if (establishData.minimumBalance) query += `&minimumBalance=${establishData.minimumBalance}`;
    
    query += `&merchantReference=${establishData.merchantReference}`;
    query += `&paymentType=${establishData.paymentType}`;
    
    if (establishData.timeZone) query += `&timeZone=${establishData.timeZone}`;

    if (establishData.paymentType === 'Recurring' && establishData.recurrence) {
        if (establishData.recurrence.startDate) query += `&recurrence.startDate=${establishData.recurrence.startDate}`;
        if (establishData.recurrence.endDate) query += `&recurrence.endDate=${establishData.recurrence.endDate}`;
        if (establishData.recurrence.frequency) query += `&recurrence.frequency=${establishData.recurrence.frequency}`;
        if (establishData.recurrence.frequencyUnit) query += `&recurrence.frequencyUnit=${establishData.recurrence.frequencyUnit}`;
        if (establishData.recurrence.frequencyUnitType) query += `&recurrence.frequencyUnitType=${establishData.recurrence.frequencyUnitType}`;
        if (establishData.recurrence.recurringAmount) query += `&recurrence.recurringAmount=${establishData.recurrence.recurringAmount}`;
        if (establishData.recurrence.automaticCapture) query += `&recurrence.automaticCapture=${establishData.recurrence.automaticCapture}`;
    }

    if (establishData.verification) {
        if (establishData.verification.status) query += `&verification.status=${establishData.verification.status}`;
        if (establishData.verification.verifyCustomer) query += `&verification.verifyCustomer=${establishData.verification.verifyCustomer}`;
    }

    if (establishData.customer) {
        if (establishData.customer.customerId) query += `&customer.customerId=${establishData.customer.customerId}`;
        if (establishData.customer.externalId) query += `&customer.externalId=${establishData.customer.externalId}`;
        if (establishData.customer.name) query += `&customer.name=${establishData.customer.name}`;
        if (establishData.customer.vip !== undefined) query += `&customer.vip=${establishData.customer.vip}`;
        if (establishData.customer.taxId) query += `&customer.taxId=${establishData.customer.taxId}`;
        if (establishData.customer.driverLicense) {
            if (establishData.customer.driverLicense.number) query += `&customer.driverLicense.number=${establishData.customer.driverLicense.number}`;
            if (establishData.customer.driverLicense.state) query += `&customer.driverLicense.state=${establishData.customer.driverLicense.state}`;
        }
        if (establishData.customer.address) {
            if (establishData.customer.address.address1) query += `&customer.address.address1=${establishData.customer.address.address1}`;
            if (establishData.customer.address.address2) query += `&customer.address.address2=${establishData.customer.address.address2}`;
            if (establishData.customer.address.city) query += `&customer.address.city=${establishData.customer.address.city}`;
            if (establishData.customer.address.state) query += `&customer.address.state=${establishData.customer.address.state}`;
            if (establishData.customer.address.zip) query += `&customer.address.zip=${establishData.customer.address.zip}`;
            if (establishData.customer.address.country) query += `&customer.address.country=${establishData.customer.address.country}`;
        }
        if (establishData.customer.phone) query += `&customer.phone=${establishData.customer.phone}`;
        if (establishData.customer.email) query += `&customer.email=${establishData.customer.email}`;
        if (establishData.customer.balance) query += `&customer.balance=${establishData.customer.balance}`;
        if (establishData.customer.currency) query += `&customer.currency=${establishData.customer.currency}`;
        if (establishData.customer.enrollDate) query += `&customer.enrollDate=${establishData.customer.enrollDate}`;
        if (establishData.customer.dateOfBirth) query += `&customer.dateOfBirth=${establishData.customer.dateOfBirth}`;
    }

    if (establishData.account) {
        if (establishData.account.nameOnAccount) query += `&account.nameOnAccount=${establishData.account.nameOnAccount}`;
        if (establishData.account.name) query += `&account.name=${establishData.account.name}`;
        if (establishData.account.type) query += `&account.type=${establishData.account.type}`;
        if (establishData.account.profile) query += `&account.profile=${establishData.account.profile}`;
        if (establishData.account.accountNumber) query += `&account.accountNumber=${establishData.account.accountNumber}`;
        if (establishData.account.routingNumber) query += `&account.routingNumber=${establishData.account.routingNumber}`;
    }

    if (establishData.transactionId) query += `&transactionId=${establishData.transactionId}`;

    const requestSignature = CryptoSignature.createHmac('sha1', accessKey).update(query).digest('base64');
    return requestSignature;
};

export const normalizeEstablishData = (
  establish: EstablishDto,
  rawBody: Buffer
) => {
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
