/* eslint arrow-body-style: 0 */

import fetch from 'isomorphic-fetch';

export function shareInfographic (index) {
  return {
    type: 'SHARE_INFOGRAPHIC',
    index,
  };
}

function receiveData (state, dataProperty, json) {
  return {
    type: 'RECEIVE_DEPARTMENTS',
    departments: json,
  };
}

function fetchData (state, dataProperty) {
  return (dispatch) => {
    // dispatch(requestData(dataProperty));
    return fetch(`/data/${dataProperty}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveData(state, dataProperty, json));
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

export function fetchDataIfNeeded (dataProperty) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), dataProperty)) {
      return dispatch(fetchData(getState(), dataProperty));
    }
  };
}
