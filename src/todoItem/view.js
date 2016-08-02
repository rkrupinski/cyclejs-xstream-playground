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
        !editing ? span(`.${css(styles.todoBody)}.todo-body`, {
          props: {
            title: 'Edit',
          },
        }, body) : ' ',
        editing ? input('.todo-input', {
          props: {
            type: 'text',
          },
          hook: {
            insert({ elm }) {
              elm.value = body;
              elm.focus();
              elm.selectionStart = body.length;
            },
          },
        }) : ' ',
        button('.todo-delete', 'x'),
      ]));
}

export default view;
