import { form, input, button } from '@cycle/dom';

function view(state$) {
  return state$
      .map(state => form('.todo-form', [
        input('.todo-input', {
          props: {
            type: 'text',
            value: state,
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
