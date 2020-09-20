import {
  ActionType,
  FetchActionTypes,
  State
} from "./types";

export const fetchReducer = <TData>() => (state: State<TData>, action: FetchActionTypes<TData>): State<TData> => {
  switch (action.type) {
    case ActionType.FETCH:
      return {
        ...state,
        loading: true,
      };
    case ActionType.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case ActionType.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error("Unknown action type");
  }
};
