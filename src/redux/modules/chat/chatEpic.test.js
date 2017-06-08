/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import chatEpic from './chatEpic';
import { sendMessage, joinChannel, receiveMessage } from './chatActions';
import { isISO8601 } from 'validator';

describe('chat epic', () => {
  let deepstreamClient;
  const store = null;

  beforeEach(() => {
    deepstreamClient = {
      emit: jest.fn(),
      subscribe: jest.fn(),
    };
  });

  test('emits send message event to deepstream', async () => {
    const action = sendMessage('asdf-id', 'general', 'message text');
    const action$ = ActionsObservable.of(action);

    await new Promise(resolve => {
      chatEpic(action$, store, { deepstreamClient })
        .toArray()
        .subscribe(actions => {
          expect(deepstreamClient.emit).toHaveBeenCalledTimes(1);
          expect(deepstreamClient.emit.mock.calls).toMatchSnapshot();
          expect(actions).toHaveLength(0);
          resolve();
        });
    });
  });

  test('subscribes to chat channel deepstream events', async () => {
    const action = joinChannel('general');
    const action$ = ActionsObservable.of(action);

    deepstreamClient.subscribe.mockReturnValueOnce(Observable.empty());

    await new Promise(resolve => {
      chatEpic(action$, store, { deepstreamClient })
        .toArray()
        .subscribe(actions => {
          expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);
          expect(actions).toHaveLength(0);

          resolve();
        });
    });
  });

  test('handles events from deepstream subscription', async () => {
    const action = joinChannel('general');
    const action$ = ActionsObservable.of(action);

    const eventData = {
      t: 'chatmsg',
      ch: 'general',
      uid: 'asdf-id',
      txt: 'message text',
    };
    deepstreamClient.subscribe.mockReturnValueOnce(Observable.of(eventData));

    await new Promise(resolve => {
      chatEpic(action$, store, { deepstreamClient })
        .toArray()
        .subscribe(actions => {
          expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);

          expect(actions).toHaveLength(1);

          const resultAction = actions[0];
          const timeStamp = resultAction.payload.time;

          expect(isISO8601(timeStamp)).toBe(true);
          expect(resultAction).toEqual(receiveMessage(eventData, timeStamp));

          resolve();
        });
    });
  });
});
