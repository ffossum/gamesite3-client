/* @flow */
/* eslint-env jest */
import { Observable } from 'rxjs';
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
    const action$ = Observable.of(action);

    const actions = await chatEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.emit).toHaveBeenCalledTimes(1);
    expect(deepstreamClient.emit.mock.calls).toMatchSnapshot();
    expect(actions).toHaveLength(0);
  });

  test('subscribes to chat channel deepstream events', async () => {
    const action = joinChannel('general');
    const action$ = Observable.of(action);

    deepstreamClient.subscribe.mockReturnValueOnce(Observable.empty());

    const actions = await chatEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);
    expect(actions).toHaveLength(0);
  });

  test('handles events from deepstream subscription', async () => {
    const action = joinChannel('general');
    const action$ = Observable.of(action);

    const eventData = {
      t: 'chatmsg',
      ch: 'general',
      uid: 'asdf-id',
      txt: 'message text',
    };
    deepstreamClient.subscribe.mockReturnValueOnce(Observable.of(eventData));

    const actions = await chatEpic(action$, store, { deepstreamClient })
      .toArray()
      .toPromise();

    expect(deepstreamClient.subscribe).toHaveBeenCalledTimes(1);

    expect(actions).toHaveLength(1);

    const resultAction = actions[0];
    const timeStamp = resultAction.payload.time;

    expect(isISO8601(timeStamp)).toBe(true);
    expect(resultAction).toEqual(receiveMessage(eventData, timeStamp));
  });
});
