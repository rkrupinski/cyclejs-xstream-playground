import { form, input, button } from '@cycle/dom';

function view(state$) {
  return state$
      .map(state => form('.todo-form', [
        input('.todo-input', {
          props: {
            type: 'text',
            name: 'todo',
            autocomplete: 'off',
          },
          hook: {
            update(...args) {
              const [, { elm }] = args;

              elm.value = state;
            },
          },
        }),
        ' ',
        button({
          props: {
            type: 'submit',
          },
        }, 'Add todo'),
      ]));
}

export default view;
