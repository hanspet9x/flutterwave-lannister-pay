const testData = {};

testData.transactionData1 = {
    "ID": 91203,
    "Amount": 5000,
    "Currency": "NGN",
    "CurrencyCountry": "NG",
    "Customer": {
        "ID": 2211232,
        "EmailAddress": "anonimized29900@anon.io",
        "FullName": "Abel Eden",
        "BearsFee": true
    },
    "PaymentEntity": {
        "ID": 2203454,
        "Issuer": "GTBANK",
        "Brand": "MASTERCARD",
        "Number": "530191******2903",
        "SixID": 530191,
        "Type": "CREDIT-CARD",
        "Country": "NG"
    }
}

testData.transactionData2 = {
    "ID": 91204,
    "Amount": 3500,
    "Currency": "NGN",
    "CurrencyCountry": "NG",
    "Customer": {
        "ID": 4211232,
        "EmailAddress": "anonimized292200@anon.io",
        "FullName": "Wenthorth Scoffield",
        "BearsFee": false
    },
    "PaymentEntity": {
        "ID": 2203454,
        "Issuer": "AIRTEL",
        "Brand": "",
        "Number": "080234******2903",
        "SixID": '080234',
        "Type": "USSD",
        "Country": "NG"
    }
}

testData.transactionData3 = {
    "ID": 91204,
    "Amount": 3500,
    "Currency": "USD",
    "CurrencyCountry": "US",
    "Customer": {
        "ID": 4211232,
        "EmailAddress": "anonimized292200@anon.io",
        "FullName": "Wenthorth Scoffield",
        "BearsFee": false
    },
    "PaymentEntity": {
        "ID": 2203454,
        "Issuer": "WINTERFELLWALLETS",
        "Brand": "",
        "Number": "AX0923******0293",
        "SixID": "AX0923",
        "Type": "WALLET-ID",
        "Country": "NG"
    }
}

testData.feeSpecs = {
    "FeeConfigurationSpec": "LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55"
}
testData.feeSpec = 'LNPY1221 NGN LOCL CREDIT-CARD(VISA) : APPLY PERC 1.4';

testData.resultsDb = [
    {
        locale: '*',
        entity: '*',
        entityProperty: '*'
    },
    {
        locale: 'INTL',
        entity: 'CREDIT-CARD',
        entityProperty: 'VISA'
    },
    {
        locale: 'LOCL',
        entity: 'CREDIT-CARD',
        entityProperty: '*'
    },
    {
        locale: '*',
        entity: 'BANK-ACCOUNT',
        entityProperty: 'MASTERCARD'
    },
    {
        locale: '*',
        entity: 'USSD',
        entityProperty: 'MTN'
    }
]

testData.queryResult = [
    {
        locale: 'LOCL',
        entity: 'CREDIT-CARD',
        entityProperty: 'MASTERCARD'
    },
    {
        locale: 'LOCL',
        entity: 'USSD',
        entityProperty: 'AIRTEL'
    },
    {
        locale: 'LOCL',
        entity: 'USSD',
        entityProperty: 'MTN'
    },

]

module.exports = testData