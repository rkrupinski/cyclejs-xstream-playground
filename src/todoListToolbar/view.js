import xs from 'xstream';
import { StyleSheet, css } from 'aphrodite';

import { div } from '@cycle/dom';

const styles = StyleSheet.create({
  toolbar: {
    marginBottom: 10,
  },
});

function view(state$) {
  return state$
      .map(state => {
        const { toggleBtn, clearBtn } = state;

        return xs.combine(toggleBtn.DOM, clearBtn.DOM)
            .map(([
              toggleBtnTree,
              clearBtnTree,
            ]) => div(`.${css(styles.toolbar)}`, [
              toggleBtnTree,
              ' ',
              clearBtnTree,
            ]));
      });
}

export default view;
