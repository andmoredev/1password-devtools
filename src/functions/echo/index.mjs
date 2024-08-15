import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';
import schema from './submitted-incident.json' with { type: 'json' };

export const handler = initializePowertools(async (event) => {
  try {
    const input = JSON.parse(event.body);

    const apiKey = 'op://Dev Secrets/SendgrID/Section_lx46ortdghtmeb5it57xss5dce/api key';
    console.log('apiKey', apiKey);
    console.log('schema', schema);
    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' })
  }
});
