/* @flow */
/* eslint-env jest */
import DeepstreamClient from './deepstreamClient';

describe('deepstream client', () => {
  test('constructor passes args to deepstream', () => {
    const deepstream = jest.fn();
    const client = new DeepstreamClient(deepstream, 'localhost:6020');

    expect(client).toBeDefined();
    expect(deepstream).toHaveBeenCalledTimes(1);
    expect(deepstream).toHaveBeenCalledWith('localhost:6020');
  });

  test('subscribe returns an observable of a deepstream event', async () => {
    const testEvents = [
      {
        t: 'test-event',
      },
      'event data string',
      42,
    ];

    let handler;

    const mockClient = {
      event: {
        subscribe: jest
          .fn()
          .mockImplementation((eventName, h) => (handler = h)),
        unsubscribe: jest.fn(),
      },
    };

    const deepstream = () => mockClient;
    const client = new DeepstreamClient(deepstream);
    const event$ = client.subscribe('event name');

    await new Promise(resolve => {
      event$.take(testEvents.length).toArray().subscribe(receivedEvents => {
        expect(receivedEvents).toEqual(testEvents);
        resolve();
      });

      testEvents.forEach(e => handler(e));
    });
  });

  test('emit passes data to event.emit', () => {
    const mockClient = {
      event: {
        emit: jest.fn(),
      },
    };
    const deepstream = () => mockClient;
    const client = new DeepstreamClient(deepstream);

    client.emit('event name', 'data');

    expect(mockClient.event.emit).toHaveBeenCalledTimes(1);
    expect(mockClient.event.emit).toHaveBeenCalledWith('event name', 'data');
  });
});
