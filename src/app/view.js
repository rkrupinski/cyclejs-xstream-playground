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
        const { form } = state;

        return xs.combine(form.DOM)
            .map(([formTree]) => div(
              `.${css(styles.app)}`,
              [
                formTree,
              ]
            ));
      })
      .flatten()
      .remember();
}

export default view;
