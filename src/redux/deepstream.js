/* @flow */
import deepstream from 'deepstream.io-client-js';

export function login() {
  return new Promise((resolve, reject) => {
    const client = deepstream('localhost:6020');
    client.login(success => {
      if (success) {
        resolve(client);
      }
      reject();
    });
  });
}
