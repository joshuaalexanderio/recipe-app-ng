const fs = require('fs');

const environment = `export const environment = {
  production: true,
  apiUrl: '${process.env.apiUrl}',
  basicAuthUsername: '${process.env.basicAuthUsername}',
  basicAuthPassword: '${process.env.basicAuthPassword}'
};
 `;

fs.writeFileSync('./src/environments/environment.ts', environment);
console.log('environment.ts generated');
