import type { Plugin } from '@envelop/core';
import type { ExecutionResult } from 'graphql';
import { ContextType } from '../types';

function isExecutionResult(value: any): value is ExecutionResult {
  return value && typeof value === 'object' && ('data' in value || 'errors' in value);
}

export const appendRequestIdToResponse = (): Plugin<ContextType> => ({
  onExecute({ args }) {
    return {
      onExecuteDone({ result }) {
        const context = args.contextValue;

        if (!context?.requestId) {
          return;
        }

        // Case 1: Batched results
        if (Array.isArray(result)) {
          result.forEach(res => {
            if (isExecutionResult(res)) {
              res.extensions = {
                ...(res.extensions ?? {}),
                requestId: context.requestId,
              };
            }
          });
          return;
        }

        // Case 2: Single execution result
        if (isExecutionResult(result)) {
          result.extensions = {
            ...(result.extensions ?? {}),
            requestId: context.requestId,
          };
        }

        // Case 3: AsyncIterable (subscriptions) → do nothing
      },
    };
  },
});
