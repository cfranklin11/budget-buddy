import fetch from 'isomorphic-fetch';

export function addProgram (name) {
  return {
    type: 'ADD_PROGRAM',
    name,
  };
}

export function removeProgram (id) {
  return {
    type: 'REMOVE_PROGRAM',
    id,
  };
}

function receiveData (state, json, dataProperty, dataLabel) {
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

function fetchData (state, dataProperty, dataLabel) {
  return (dispatch) => {
    const url = dataLabel ?
      `/data/${dataProperty}?department_name=${dataLabel}` :
      `/data/${dataProperty}`;

    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveData(state, json, dataProperty, dataLabel));
      });
  };
}

function shouldFetchData (state, checkLabel) {
  const { data, isFetching } = state[checkLabel] ||
    { data: [], isFetching: false };
  if (!data) {
    return true;
  }
  if (data.length === 0) {
    return true;
  }
  if (isFetching) {
    return false;
  }
  return true;
}

export function fetchDataIfNeeded (dataProperty, dataLabel) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), dataProperty)) {
      return dispatch(fetchData(getState(), dataProperty, dataLabel));
    }

    return null;
  };
}
