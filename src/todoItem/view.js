import { StyleSheet, css } from 'aphrodite';

import { li, input, span, button } from '@cycle/dom';

const styles = StyleSheet.create({
  todo: {
    marginBottom: 5,
  },
  todoBody: {
    lineHeight: 1,
    cursor: 'pointer',
    userSelect: 'none',
    ':hover': {
      background: 'lightcyan',
      outline: '2px solid lightcyan',
    },
  },
});

function view(state$) {
  return state$
      .map(({ body, completed, editing }) => li(`.${css(styles.todo)}`, [
        input('.todo-toggle', {
          props: {
            type: 'checkbox',
            checked: completed,
          },
        }),
        ' ',
        span(`.${css(styles.todoBody)}.todo-body`, {
          props: {
            title: 'Edit',
          },
          style: editing ? { display: 'none' } : null,
        }, body),
        input('.todo-input', {
          props: {
            type: 'text',
          },
          style: !editing ? { display: 'none' } : null,
          hook: {
            update(...args) {
              const [, { elm }] = args;

              elm.value = body;

              if (editing) {
                elm.focus();
                elm.selectionStart = body.length;
              }
            },
          },
        }),
        ' ',
        button('.todo-delete', 'x'),
      ]));
}

export default view;
