/* eslint arrow-body-style: 0 */

import fetch from 'isomorphic-fetch';

export function shareInfographic (index) {
  return {
    type: 'SHARE_INFOGRAPHIC',
    index,
  };
}

function receiveData (state, json, dataProperty, dataLabel) {
  if (dataLabel) {
    return {
      type: 'RECEIVE_DEPARTMENT_DATA',
      data: json,
      label: dataLabel,
    };
  }

  return {
    type: 'RECEIVE_DEPARTMENTS',
    departments: json,
  };
}

function fetchData (state, dataProperty, dataLabel) {
  return (dispatch) => {
    const url = dataLabel ? `/data/${dataProperty}?department_name=${dataLabel}` : `/data/${dataProperty}`;

    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveData(state, json, dataProperty, dataLabel));
      });
  };
}

function shouldFetchData (state, dataProperty) {
  const { data, isFetching } = state[dataProperty] || { data: [], isFetching: false };
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
  };
}
