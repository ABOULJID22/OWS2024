import { createStore } from 'redux';

const initialState = {
  user: null,
  isAuthenticated: false, // connexion
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
