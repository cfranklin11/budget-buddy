function departments (state = { addedPrograms: [] }, action) {
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
        currentDepartment: action.currentDepartment,
        department: action.data,
      };

    case 'ADD_PROGRAM':
      return {
        ...state,
        addedPrograms: state.addedPrograms
          .concat(state.department.programs
            .filter((program) => { return program.name === action.name; })),
      };

    default:
      return state;
  }
}

export default departments;
