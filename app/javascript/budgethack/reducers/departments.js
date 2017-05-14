function departments (state = {}, action) {
  switch (action.type) {
    case 'SELECT_DEPARTMENT':
      return state;

    case 'RECEIVE_DEPARTMENTS':
      return {
        ...state,
        list: action.departments,
      };

    case 'RECEIVE_DEPARTMENT_DATA':
      return {
        ...state,
        [action.label.replace(/\s/g, '_').toLowerCase()]: action.data,
      };

    default:
      return state;
  }
}

export default departments;
