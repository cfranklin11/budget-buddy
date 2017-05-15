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
        data: action.data,
      };

    case 'ADD_PROGRAM':
      return {
        ...state,
        addedPrograms: state.addedPrograms
          .concat(state.data
            .filter((dept) => { return dept.name === state.currentDepartment; })
            .map((dept) => {
              const deptProgram = dept.programs.filter((prog) => {
                return prog.name === action.name;
              });

              return deptProgram[0] || [];
            })),
      };

    default:
      return state;
  }
}

export default departments;
