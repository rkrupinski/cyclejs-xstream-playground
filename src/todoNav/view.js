import xs from 'xstream';

import { div } from '@cycle/dom';

import filterLink from '../filterLink';
import constants from '../constants';

function view(state$) {
  return state$
      .map(({ filter: currentFilter }) => xs.combine(
        filterLink({
          props$: xs.of({
            label: 'all',
            filter: constants.FILTER_ALL,
            currentFilter,
          }),
        }).DOM,
        filterLink({
          props$: xs.of({
            label: 'pending',
            filter: constants.FILTER_PENDING,
            currentFilter,
          }),
        }).DOM,
        filterLink({
          props$: xs.of({
            label: 'completed',
            filter: constants.FILTER_COMPLETED,
            currentFilter,
          }),
        }).DOM
      ))
      .flatten()
      .map(([allLinkTree, pendingLinkTree, completedLinkTree]) => div([
        allLinkTree,
        ' ',
        pendingLinkTree,
        ' ',
        completedLinkTree,
      ]));
}

export default view;
