/* @flow */
import { Observable } from 'rxjs';

export default class DeepstreamClient {
  client: any;
  constructor(deepstream: any, ...args: any[]) {
    this.client = deepstream(...args);
  }
  login(...args: any[]) {
    return new Promise((resolve, reject) => {
      this.client.login(...args, success => {
        success ? resolve(this) : reject();
      });
    });
  }
  subscribe(eventName: string): rxjs$Observable<*> {
    return Observable.fromEventPattern(
      handler => this.client.event.subscribe(eventName, handler),
      handler => this.client.event.unsubscribe(eventName, handler)
    );
  }
  emit(eventName: string, data?: mixed): void {
    this.client.event.emit(eventName, data);
  }
}
