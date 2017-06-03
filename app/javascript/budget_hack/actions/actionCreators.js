import fetch from 'isomorphic-fetch';

export function addProgram (name) {
  return {
    type: 'ADD_PROGRAM',
    name,
  };
}

export function removeProgram (name) {
  return {
    type: 'REMOVE_PROGRAM',
    name,
  };
}

function receiveData (json, dataProperty, dataLabel) {
  if (dataLabel) {
    return {
      type: 'RECEIVE_DEPARTMENT_DATA',
      data: json,
      currentDepartment: dataLabel,
    };
  }

  return {
    type: 'RECEIVE_DEPARTMENTS',
    departments: json,
  };
}

export function fetchData (dataProperty, dataLabel) {
  return (dispatch) => {
    const url = dataLabel ?
      `/data/${dataProperty}?department_name=${dataLabel}` :
      `/data/${dataProperty}`;

    return fetch(url)
      .then((response) => { return response.json(); })
      .then((json) => {
        dispatch(receiveData(json, dataProperty, dataLabel));
      });
  };
}
