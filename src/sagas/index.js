import { put, takeLatest, all } from 'redux-saga/effects';
export function* fetchPeople(action) {
  const page = action && action.page ? '/?page=' + action.page : '';
  const response = yield fetch('https://swapi.co/api/people' + page)
        .then(response => response.json(), );    
  yield put({ 
    type: "PEOPLE_RECEIVED", 
    peoples: response.results,
    total: response.count,
    page: action.page ? action.page : 1
  });
}

export function* fetchDetails(action) {
  const param = action.param;
  const response = yield fetch('https://swapi.co/api/' + param)
        .then(response => response.json(), );    
  yield put({ 
    type: "DETAILS_RECEIVED", 
    details: response
  });
}

export function* actionWatcher() {
    yield takeLatest('GET_PEOPLE', fetchPeople);
    yield takeLatest('GET_DETAILS', fetchDetails);
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}