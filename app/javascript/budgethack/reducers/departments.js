function departments (state = [], action) {
  switch (action.type) {
    case 'SELECT_DEPARTMENT':
      return state;

    case 'RECEIVE_DEPARTMENTS':
      return action.departments;

    default:
      return state;
  }
}

export default departments;
