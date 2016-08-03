import xs from 'xstream';

import intent from './intent';
import model from './model';
import view from './view';

import todoForm from '../todoForm';
import todoList from '../todoList';
import todoListToolbar from '../todoListToolbar';
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
      toolbar: todoListToolbar({
        DOM,
        props$: xs.of({ list }),
      }),
    };
  };
}

function app({ DOM, storage, initialHash, hashChange }) {
  const localStorageData$ = storage.local
      .getItem(STORAGE_KEY)
      .take(1);

  const initialTodosData$ = deserialize(localStorageData$);

  const proxyActions$ = xs.create();

  const actions = intent(proxyActions$, initialHash, hashChange);

  const state$ = model(actions, initialTodosData$);

  const ammendedState$ = state$
      .map(ammendState(DOM))
      .remember();

  const actions$ = ammendedState$
      .map(({ form, list, toolbar }) => xs.merge(
        form.action$,
        list.action$,
        toolbar.action$
      ))
      .flatten();

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
