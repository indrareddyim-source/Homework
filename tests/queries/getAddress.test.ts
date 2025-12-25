import { parse } from 'graphql';
import { executor } from '../exectuor';

describe('getAddress', () => {
  test('Success – returns address with state and extensions.requestId', async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) {
          street
          city
          state
          zipcode
        }
      }
    `;

    const variables = { username: 'jack' };

    const result = await executor({
      document: parse(query),
      variables: { username: 'jack' },
      extensions: {
        headers: {
          client: 'test-client',
        },
      },
    });

    expect(result).toEqual({
      data: {
        address: {
          street: '123 Street St.',
          city: 'Sometown',
          state: 'OH',
          zipcode: '43215',
        },
      },
      extensions: {
        requestId: expect.any(String),
      },
    });
  });

  test('Error – unknown user returns error and extensions.requestId', async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) {
          street
          city
          state
          zipcode
        }
      }
    `;

    const variables = { username: '__does_not_exist__' };

    const result = await executor({
      document: parse(query),
      variables,
      extensions: {
        headers: {
          client: 'test-client',
        },
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({
            message: 'No address found in getAddress resolver',
          }),
        ]),
        extensions: {
          requestId: expect.any(String),
        },
      }),
    );
  });

  test('Error – missing client header is rejected', async () => {
    const query = `
      query GetAddress($username: String!) {
        address(username: $username) {
          street
          city
          state
          zipcode
        }
      }
    `;

    const result = await executor({
      document: parse(query),
      variables: { username: 'jack' },
      extensions: {
        headers: {},
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        errors: expect.arrayContaining([
          expect.objectContaining({
            message: 'Missing required client header',
          }),
        ]),
      }),
    );
  });
});
