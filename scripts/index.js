const writeFile = require('fs').writeFileSync;

require('dotenv').config();
const token = process.env.MUSICKIT_TOKEN;
const isProd = process.env.ENVIRONMENT === 'production' ? true : false;

const envConfigFile = `export const environment = {
  production:    ${isProd},
  musicKitToken: '${token}',
}`;
writeFile('src/environments/environment.ts', envConfigFile);
