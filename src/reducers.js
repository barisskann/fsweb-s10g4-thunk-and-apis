import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
} from "./actions";

const initial = {
  favs: JSON.parse(localStorage.getItem("deger")) || [],
  current: true,
  error: false,
  loading: false,
  data: false,
};

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let i = state.favs.every((i) => i.punchline !== action.payload.punchline);
      if (i) {
        return {
          ...state,
          favs: [...state.favs, action.payload],
        };
      }
      return state;

    case FAV_REMOVE:
      return {
        ...state,
        favs: state.favs.filter((i) => i.punchline !== action.payload),
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        current: false,
      };

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        current: false,
        data: false,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        current: false,
      };

    default:
      return state;
  }
}
