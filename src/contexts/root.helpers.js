export const loggedReducer = (reducer, title) => (state, action) => {
  console.group(title, action.type);
  console.groupCollapsed("Previous State");
  console.log(state);
  console.groupEnd();
  console.groupCollapsed("Action");
  console.log(action);
  console.groupEnd();
  const newState = reducer(state, action);
  console.groupCollapsed("Next State");
  console.log(newState);
  console.groupEnd();
  console.groupEnd();
  return newState;
};
