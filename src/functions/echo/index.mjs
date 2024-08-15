import { initializePowertools, logger } from '../shared/lambda-powertools.mjs';
import { getResponse } from '../shared/apigateway.mjs';

export const handler = initializePowertools(async (event) => {
  try {
    const input = JSON.parse(event.body);

    // I want to push something to check for signed commit
    return getResponse(200, input);
  } catch (err) {
    logger.error(err, err.stack);
    return getResponse(500, { message: 'Something went wrong!' })
  }
});
