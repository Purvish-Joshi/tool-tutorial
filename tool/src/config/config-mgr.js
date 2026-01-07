import createLogger from '../logger.js';
import { cosmiconfigSync } from 'cosmiconfig';
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logger =createLogger('config:mgr');

// Load schema.json safely (ESM-friendly)
const schemaPath = path.join(__dirname, 'schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

const ajv = new Ajv();
const configLoader = cosmiconfigSync('tool');

export default function getConfig() {
  const result = configLoader.search(process.cwd());

  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 };
  }

  const isValid = ajv.validate(schema, result.config);

  if (!isValid) {
    logger.warning('Could not find configuration, using default');
    console.log();
    console.log(betterAjvErrors(schema, result.config, ajv.errors));
    process.exit(1);
  }

  logger.debug('Found configuration', result.config);
  return result.config;
}
