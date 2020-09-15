import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

// TODO useQuery & useMutation refactor interface to equal { fetch: function, state: { data, loading, error} }
// TODO DRY Action & reducer
type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (state: State<TData>, action: Action<TData>): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error("Unknown action type");
  }
};
export const useQuery = <TData = any>(query: string) => {
  const getReducer = reducer<TData>();
  const [state, dispatch] = useReducer(getReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetchApi = useCallback(async () => {
    try {
      dispatch({type: "FETCH"});
      const {data, errors} = await server.fetch<TData>({query});
      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      dispatch({type: "FETCH_SUCCESS", payload: data});
    } catch (error) {
      dispatch({type: "FETCH_ERROR"});
      throw console.error(error.message);
    }
  }, [query]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {...state, refetch: fetchApi};
};
