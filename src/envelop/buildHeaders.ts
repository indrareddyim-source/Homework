import type { Plugin } from '@envelop/core';
import { ContextType } from '../types';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onContextBuilding({ context, extendContext }) {
      const request = context.request;
      const headers: Record<string, string | undefined> = {};

      if (request?.headers) {
        for (const [key, value] of request.headers.entries()) {
          headers[key.toLowerCase()] = value;
        }
      }

      extendContext({ headers });
    },
  };
};
