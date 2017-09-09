/* @flow */
import { Observable } from 'rxjs';

export default class DeepstreamClient {
  client: any;
  constructor(deepstream: any, ...args: any[]) {
    this.client = deepstream(...args);
  }
  login(...args: any[]): Promise<DeepstreamClient> {
    return new Promise((resolve, reject) => {
      this.client.login(...args, success => {
        success ? resolve(this) : reject();
      });
    });
  }
  subscribe(eventName: string): Observable<*> {
    return Observable.fromEventPattern(
      handler => this.client.event.subscribe(eventName, handler),
      handler => this.client.event.unsubscribe(eventName, handler),
    );
  }
  emit(eventName: string, data?: mixed): void {
    this.client.event.emit(eventName, data);
  }
  make(rpcName: string, data?: mixed) {
    return new Promise((resolve, reject) => {
      this.client.rpc.make(rpcName, data, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
}
