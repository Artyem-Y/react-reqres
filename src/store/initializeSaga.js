import { call, all } from 'redux-saga/effects';

import { userSaga } from './saga/users';

export default function* mainSaga() {
  yield all([
    call(userSaga),
  ]);
}
