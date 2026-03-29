const fs = require('fs');

const environment = `export const environment = {
  production: true,
  apiUrl: '${process.env.apiUrl}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', environment);
console.log('environment.ts generated');
