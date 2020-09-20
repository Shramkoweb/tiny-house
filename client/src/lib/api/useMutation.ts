import { useReducer } from "react";

import { server } from "./server";
import { fetchReducer } from "./fetchReducer";
import {
  fetchError,
  fetchSuccess,
  startFetch
} from "./actions";

export const useMutation = <TData = any, TVariables = any>(query: string) => {
  const getReducer = fetchReducer<TData>();

  const [state, dispatch] = useReducer(getReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch(startFetch());
      const {data, errors} = await server.fetch<TData, TVariables>({query, variables});

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchError());
      throw console.error(error.message);
    }
  };

  return [fetch, state] as const;
};

