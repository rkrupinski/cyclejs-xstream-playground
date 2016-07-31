import xs from 'xstream';
import { v4 } from 'node-uuid';

function model(actions, initialData$) {
  const modifications$ = xs.merge(
    actions.addTodo$
        .map(({ payload }) => data => ({
          ...data,
          list: [
            ...data.list,
            {
              id: v4(),
              completed: false,
              body: payload,
            },
          ],
        }))
  );

  return initialData$
      .map(initialData => modifications$
          .fold((data, mod) => mod(data), initialData))
      .flatten()
      .remember();
}

export default model;
