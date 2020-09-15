import { useReducer } from "react";

import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
) => {
  switch (action.type) {
    case "FETCH":
      return {...state, loading: true};
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false
      };
    case "FETCH_ERROR":
      return {...state, loading: false, error: true};
    default:
      throw new Error();
  }
};

export const useMutation = <TData = any, TVariables = any>(query: string) => {
  const getReducer = reducer<TData>();

  const [state, dispatch] = useReducer(getReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({type: "FETCH"});
      const {data, errors} = await server.fetch<TData, TVariables>({query, variables});

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      dispatch({type: "FETCH_SUCCESS", payload: data});
    } catch (error) {
      dispatch({type: "FETCH_ERROR"});
      throw console.error(error.message);
    }
  };

  return [fetch, state] as const;
};

