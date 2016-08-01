export const deserialize = data$ => data$
    .map(data => JSON.parse(data) || {})
    .map(data => ({ list: [], filter: '', ...data }));

export const serialize = state => JSON.stringify(state);

export const identity = val => val;
