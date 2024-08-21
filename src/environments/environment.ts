export const environment = {
    production: true,
    serverUrl: process.env['SERVER_URL'] || '',
    cryptoSecretKey: process.env['CRYPTO_SECRET_KEY'] || ''
};
