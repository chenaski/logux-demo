const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/name":
      return { ...state, name: action.name };

    default:
      return state;
  }
};
