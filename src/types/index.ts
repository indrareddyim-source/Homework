import type { Logger } from '../logger';

export type ContextType = {
  // Provided by GraphQL Yoga
  request?: Request;

  // Added by buildHeaders plugin
  headers?: {
    client?: string;
    [key: string]: string | undefined;
  };

  // Added by requestIdPlugin
  requestId?: string;

  // Added by useLogger
  logger?: Logger;
};
