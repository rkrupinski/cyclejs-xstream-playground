import { css, StyleSheet } from 'aphrodite';

import { a, span } from '@cycle/dom';

const styles = StyleSheet.create({
  filterLink: {
    fontWeight: 'bold',
  },
});

function view(state$) {
  return state$
      .map(state => {
        const { label, filter, currentFilter } = state;

        return filter !== currentFilter ? a({
          props: {
            href: `#/${filter}`,
          },
        }, label) : span(`.${css(styles.filterLink)}`, label);
      });
}

export default view;
