import { Plugin } from '@envelop/core';
import { randomUUID } from 'crypto';
import { ContextType } from '../types';

export const requestIdPlugin = (): Plugin<ContextType> => ({
  onContextBuilding({ extendContext }) {
    const requestId = randomUUID();

    extendContext({
      requestId,
    });
  },
});
