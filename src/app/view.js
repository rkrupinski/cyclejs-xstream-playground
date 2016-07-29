import xs from 'xstream';
import { StyleSheet, css } from 'aphrodite';

import { div } from '@cycle/dom';

const styles = StyleSheet.create({
  app: {
    font: '.75rem sans-serif',
  },
});

function view(state$) {
  return state$
      .map(state => {
        const { form, list } = state;

        return xs.combine(form.DOM, list.DOM)
            .map(([formTree, listTree]) => div(
              `.${css(styles.app)}`,
              [
                formTree,
                listTree,
              ]
            ));
      })
      .flatten();
}

export default view;
