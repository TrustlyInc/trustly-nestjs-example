import { VerificationDto } from 'src/Dtos/verification.dto';
import { EstablishDto } from '../Dtos/establish.dto';
import { CustomerDto } from 'src/Dtos/customer.dto';
import { DriverLicenseDto } from 'src/Dtos/driveLicense.dto';
import { AddressDto } from 'src/Dtos/address.dto';
import { AccountDto } from 'src/Dtos/account.dto';

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
}

export const normalizeEstablishData = (establish: EstablishDto, rawBody: string) => {

    if (rawBody) {
        let json = JSON.parse(rawBody);

        if (json['verification']) {
            let verification = new VerificationDto();
            verification.status = json['verification.status'];
            verification.verifyCustomer = json['verification.verifyCustomer'];

            establish.verification = verification;

        }

        if(json['customer.name']) {
            let customer = new CustomerDto();

            customer.customerId = json['customer.customerId'];
            customer.externalId = json['customer.externalId'];
            customer.name = json['customer.name'];
            customer.vip = json['customer.vip'];
            customer.taxId = json['customer.taxId'];


            let driverLicense = new DriverLicenseDto();
            driverLicense.number = json['customer.driverLicense.number'];
            driverLicense.state = json['customer.driverLicense.state'];

            customer.driverLicense = driverLicense;

            let address = new AddressDto();
            
            address.address1 = json['customer.address.address1'];
            address.address2 = json['customer.address.address2'];
            address.city = json['customer.address.city'];
            address.state = json['customer.address.state'];
            address.zip = json['customer.address.zip'];
            address.country = json['customer.address.country'];

            customer.address = address;

            customer.phone = json['customer.phone'];
            customer.email = json['customer.email'];
            customer.balance = json['customer.balance'];
            customer.currency = json['customer.currency'];
            customer.enrollDate = json['customer.enrollDate'];
            customer.dateOfBirth = json['customer.dateOfBirth'];

            establish.customer = customer;
        }

        if (json['account.name']) {
            let account = new AccountDto();

            account.nameOnAccount = json['account.nameOnAccount'];
            account.name = json['account.name'];
            account.type = json['account.type'];
            account.profile = json['account.profile'];
            account.accountNumber = json['account.accountNumber'];
            account.routingNumber = json['account.routingNumber'];

            establish.account = account;
        }
    }

    return establish;
}