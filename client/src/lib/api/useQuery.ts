import {
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { server } from "./server";
import { fetchReducer } from "./fetchReducer";
import {
  fetchError,
  fetchSuccess,
  startFetch
} from "./actions";

// TODO useQuery & useMutation refactor interface to equal { fetch: function, state: { data, loading, error} }
// TODO DRY Action & reducer

export const useQuery = <TData = any>(query: string) => {
  const getReducer = fetchReducer<TData>();
  const [state, dispatch] = useReducer(getReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetchApi = useCallback(async () => {
    try {
      dispatch(startFetch());
      const {data, errors} = await server.fetch<TData>({query});
      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchError());
      throw console.error(error.message);
    }
  }, [query]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {...state, refetch: fetchApi};
};
