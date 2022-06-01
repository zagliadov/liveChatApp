import { ActionType } from "./actions";

export const initialState = {
  user: {},
  name: "",
  room: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload };
    case ActionType.SET_NAME:
      localStorage.setItem("name", action.payload);
      return { ...state, name: localStorage.getItem("name") };
    case ActionType.SET_ROOM:
      localStorage.setItem("room", action.payload);
      return { ...state, room: localStorage.getItem("room") };
    default:
      return state;
  }
};
