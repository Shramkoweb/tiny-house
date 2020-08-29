import {
  useCallback,
  useEffect,
  useState
} from "react";

import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null
  });

  const fetchApi = useCallback(async () => {
    const {data} = await server.fetch<TData>({query});
    setState({data});
  }, [query]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {...state, fetchApi};
};
