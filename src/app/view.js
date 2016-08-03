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
        const { form, list, toolbar, nav } = state;

        return xs.combine(form.DOM, list.DOM, toolbar.DOM, nav.DOM)
            .map(vtrees => div(`.${css(styles.app)}`, vtrees));
      })
      .flatten();
}

export default view;
