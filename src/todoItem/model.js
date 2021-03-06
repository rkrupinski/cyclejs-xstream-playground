import xs from 'xstream';
import delay from 'xstream/extra/delay';

import constants from '../constants';

function model(props$, action$) {
  const editing$ = xs.merge(
    action$
        .filter(({ type }) => type === constants.TODO_START_EDITING)
        .mapTo(true),
    action$
        .filter(({ type }) => type === constants.TODO_DONE_EDITING)
        .mapTo(false),
    action$
        .filter(({ type }) => type === constants.TODO_CANCEL_EDITING)
        .compose(delay(0))
        .mapTo(false)
  )
      .startWith(false);

  return xs.combine(
    props$,
    editing$
  )
      .map(([props, editing]) => ({
        ...props,
        editing,
      }));
}

export default model;
