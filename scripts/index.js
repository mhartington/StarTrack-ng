import {writeFileSync } from 'node:fs'
import 'dotenv/config'


const token = process.env.MUSICKIT_TOKEN;
const isProd = process.env.ENVIRONMENT === 'production' ? true : false;

const envConfigFile = `export const environment = {
  production:    ${isProd},
  musicKitToken: '${token}',
}`;
writeFileSync('src/environments/environment.ts', envConfigFile);
