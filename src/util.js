import * as React from 'karet';
import * as U from 'karet.util';

export const connect = Component =>
  U.fromKefir(U.withContext((ps, { state }) =>
    React.createElement(Component, { ...ps, state }, null)));

