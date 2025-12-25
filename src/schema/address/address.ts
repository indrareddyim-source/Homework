import addressTable from '../../../data/addresses.json';
import { Addresses, Address, Args } from './types';
import { GraphQLError } from 'graphql';
import fs from 'fs';
import path from 'path';

const addresses = addressTable as Addresses;

const _getAddress = (username: string): Address | null => {
  return addresses[username];
};

export const getAddress = (_: any, args: Args, context: any): Address => {
  context.logger.info('getAddress', 'Enter resolver');
  const address = _getAddress(args.username);
  if (address) {
    context.logger.info('getAddress', 'Returning address');
    return address;
  }
  context.logger.error('getAddress', 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};

const ADDRESSES_PATH = path.join(__dirname, '../../../data/addresses.json');

export const createAddress = (_: any, args: Args, context: any): Address => {
  context.logger.info('createAddress', 'Enter resolver');

  const { username, address } = args;

  if (!address) {
    throw new GraphQLError('Address input is required');
  }

  if (addresses[username]) {
    context.logger.error('createAddress', 'Address already exists');
    throw new GraphQLError('Address already exists for this username');
  }

  const newAddress: Address = {
    ...address,
  };

  addresses[username] = newAddress;

  fs.writeFileSync(ADDRESSES_PATH, JSON.stringify(addresses, null, 2));

  context.logger.info('createAddress', 'Address created');
  return newAddress;
};
