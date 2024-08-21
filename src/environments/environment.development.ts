export const environment = {
    production: false,
    serverUrl: 'http://localhost:3000/api',
    cryptoSecretKey: process.env['CRYPTO_SECRET_KEY'] || ''
};
