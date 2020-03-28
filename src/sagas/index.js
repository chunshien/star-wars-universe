import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchPeople(action) {
  const page = action.page;
  const json = yield fetch('https://swapi.co/api/people/?page=' + page)
        .then(response => response.json(), );    
  yield put({ type: "PEOPLE_RECEIVED", json: json.results});
}
function* actionWatcher() {
     yield takeLatest('GET_PEOPLE', fetchPeople)
}
export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}