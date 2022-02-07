import { call, all, take, put, select } from 'redux-saga/effects';
import { get, post } from '../../utils/network';
import {
  fetchUsers,
  saveUsers,
} from '../actions/users';

export function* loadUsers() {
  while (true) {
    const action = yield take(fetchUsers);
    try {
      const { page } = action.payload.params;
      const p = page ? page : 1;
      const users  = yield call(get, `https://reqres.in/api/users?page=${p}`);
      yield put(saveUsers({users}));
    } catch (err) {
      console.error('load users error: ', err);
      yield put(saveUsers({ error: err?.message || 'Can\'t load users' }));
    }
  }
}

export function* userSaga() {
  yield all([
    call(loadUsers),
  ]);
}
