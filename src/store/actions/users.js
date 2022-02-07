export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = (params) => ({
  type: FETCH_USERS,
  payload: {params}
});

export const SAVE_USERS = 'SAVE_USERS';
export const saveUsers = ({users, error}) => ({
  type: SAVE_USERS,
  payload: {users, error}
});
