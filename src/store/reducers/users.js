import {
  SAVE_USERS,
} from '../actions/users';

export const defaultState = {
  allUsers: [],
  data: [],
  page: 1,
  per_page: 6,
  total : null,
  total_pages: null,
  error: null
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_USERS: {
        const { users, error } = action.payload;
        // const items = (state && state.allUsers && users?.data) ? state.allUsers.filter(i => !users?.data?.find(u => u.id === i.id)) : []
        if (error) {
          return { ...state, error };
        }
        return {
          ...state,
          // allUsers: [...items, ...users?.data],
          data: [...users.data],
          page: users?.page,
          per_page: users?.per_page,
          total : users?.total,
          total_pages: users?.total_pages,
          error: null
        };
      }

    default:
      return state;
  }
};

export default userReducer;
