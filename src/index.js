import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import storageDriver from '@cycle/storage';

import app from './app';

const drivers = {
  DOM: makeDOMDriver('#app', { transposition: true }),
  storage: storageDriver,
  initialHash: () => xs.of(location.hash),
  hashChange: () => fromEvent(window, 'hashchange'),
};

run(app, drivers);
