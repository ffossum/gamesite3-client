/* @flow */
import deepstream from 'deepstream.io-client-js';

const client = deepstream('localhost:6020').login();

export default client;
