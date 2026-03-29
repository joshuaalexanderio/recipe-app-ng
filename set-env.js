const fs = require('fs');

const environment = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  basicAuthUsername: '${process.env.API_USERNAME}',
  basicAuthPassword: '${process.env.API_PASSWORD}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', environment);
console.log('environment.ts generated');
