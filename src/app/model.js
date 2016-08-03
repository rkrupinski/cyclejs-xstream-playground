import xs from 'xstream';
import { v4 } from 'node-uuid';

function model(actions, initialData$) {
  const modifications$ = xs.merge(
    actions.addTodo$
        .map(({ payload: { body } }) => data => ({
          ...data,
          list: [
            ...data.list,
            {
              id: v4(),
              completed: false,
              body,
            },
          ],
        })),
    actions.toggleTodo$
        .map(({ payload: { id } }) => data => ({
          ...data,
          list: data.list.map(todo => {
            if (todo.id !== id) {
              return todo;
            }

            return {
              ...todo,
              completed: !todo.completed,
            };
          }),
        })),
    actions.deleteTodo$
        .map(({ payload: { id } }) => data => ({
          ...data,
          list: data.list.filter(todo => todo.id !== id),
        })),
    actions.updateTodo$
        .map(({ payload: { id, body } }) => data => ({
          ...data,
          list: data.list.map(todo => {
            if (todo.id !== id) {
              return todo;
            }

            return {
              ...todo,
              body,
            };
          }),
        })),
    actions.toggleAll$
        .map(() => data => {
          const pending = data.list.some(({ completed }) => !completed);

          return {
            ...data,
            list: data.list.map(todo => ({
              ...todo,
              completed: pending,
            })),
          };
        })
  );

  return initialData$
      .map(initialData => modifications$
          .fold((data, mod) => mod(data), initialData))
      .flatten()
      .remember();
}

export default model;
