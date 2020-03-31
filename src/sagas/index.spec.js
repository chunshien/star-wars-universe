import { takeLatest } from 'redux-saga/effects';
import { fetchPeople, fetchDetails, actionWatcher } from './index'

describe('fetchPeople', () => {
    const genObject = actionWatcher()
    it('should wait for every GET_PEOPLE action and call fetchPeople', () => {
        expect(genObject.next().value).toEqual(takeLatest('GET_PEOPLE', fetchPeople));
    });

    it('should wait for every GET_DETAILS action and call fetchDetails', () => {
        expect(genObject.next().value).toEqual(takeLatest('GET_DETAILS', fetchDetails));
    });

    it('should be done on next iteration', () => {
        expect(genObject.next().done).toBeTruthy();
    });
});