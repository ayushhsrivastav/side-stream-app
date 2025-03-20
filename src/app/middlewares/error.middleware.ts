// Packages
import { Context, Next } from 'koa';

// Dependencies
import { BaseError } from '../utils/error.util';
import { reportError } from '../errors/report-error.error';

export async function handleError(ctx: Context, next: Next) {
  try {
    return await next();
  } catch (error) {
    if (error instanceof BaseError) {
      reportError(error);
    } else {
      ctx.body = {
        status: 'failed',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
}
