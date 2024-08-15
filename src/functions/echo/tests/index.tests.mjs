
import * as app from '../index.mjs';
import { expect } from 'chai';
import { $RefParser } from '@apidevtools/json-schema-ref-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Echo', () => {
  describe('handler', () => {
    it('Successfully', async () => {
      const response = await app.handler({
        body: JSON.stringify({
          hello: 'world'
        })
      });

      expect(response.statusCode).to.equal(200);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('hello', 'world');
    });

    it('500 - Unhandled error', async () => {
      const response = await app.handler();
      expect(response.statusCode).to.equal(500);
      const body = JSON.parse(response.body);
      expect(body).to.have.property('message', 'Something went wrong!');
    });
  });

  before(async () => {
    const baseSchema = await import('../../shared/schemas/submitted-incident.json', {
      with: { type: 'json' }
    });
    const dereferencedSchema = await $RefParser.dereference(`${__dirname}/../../shared/schemas/`, baseSchema, {
      mutateInputSchema: false,
      dereference: {
        circular: 'ignore'
      }
    });

    console.log(JSON.stringify(dereferencedSchema.default));

    fs.writeFileSync(`${__dirname}/../submitted-incident.json`, JSON.stringify(dereferencedSchema.default, null, 2));
  })
});