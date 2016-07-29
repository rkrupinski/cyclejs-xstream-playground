import xs from 'xstream';
import flattenConcurrently from 'xstream/extra/flattenConcurrently';

import intent from './intent';
import model from './model';
import view from './view';

import todoForm from '../todoForm';
import todoList from '../todoList';
import { serialize, deserialize } from '../utils';

const STORAGE_KEY = '__todos';

function ammendState(DOM) {
  return function mapFn(state) {
    const { list, filter } = state;

    return {
      ...state,
      form: todoForm({ DOM }),
      list: todoList({
        DOM,
        props$: xs.of({ list, filter }),
      }),
    };
  };
}

function app({ DOM, storage }) {
  const localStorageData$ = storage.local
      .getItem(STORAGE_KEY)
      .take(1);

  const initialTodosData$ = deserialize(localStorageData$);

  const proxyActions$ = xs.create();

  const actions = intent(DOM, proxyActions$);

  const state$ = model(actions, initialTodosData$);

  const ammendedState$ = state$
      .map(ammendState(DOM))
      .remember();

  const actions$ = ammendedState$
      .map(({ form, list }) => xs.merge(
        form.action$,
        list.action$
      ))
      .compose(flattenConcurrently);

  proxyActions$.imitate(actions$);

  const vtree$ = view(ammendedState$);

  const storage$ = state$
      .map(serialize)
      .map(state => ({
        key: STORAGE_KEY,
        value: state,
      }));

  return {
    DOM: vtree$,
    storage: storage$,
  };
}

export default app;
