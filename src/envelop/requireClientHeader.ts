import { Plugin } from '@envelop/core';
import { GraphQLError } from 'graphql';
import { ContextType } from '../types';

export const requireClientHeader = (): Plugin<ContextType> => ({
  onContextBuilding({ context }) {
    const client = context.headers?.client;

    if (!client) {
      throw new GraphQLError('Missing required client header', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }
  },
});
