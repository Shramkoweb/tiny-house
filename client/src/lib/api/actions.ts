import {
  ActionType,
  FetchError,
  FetchSuccess,
  StartFetch
} from "./types";


export const startFetch = (): StartFetch => {
  return {
    type: ActionType.FETCH
  }
}

export const fetchError = (): FetchError => {
  return  {
    type: ActionType.FETCH_ERROR
  }
};

export const fetchSuccess = <TData>(data:TData): FetchSuccess<TData> => {
  return {
    type:ActionType.FETCH_SUCCESS,
    payload: data
  };
};

