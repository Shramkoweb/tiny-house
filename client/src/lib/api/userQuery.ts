import {
  useCallback,
  useEffect,
  useState
} from "react";

import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
  });

  const fetchApi = useCallback(async () => {
    setState({loading: true, data: null});

    const {data} = await server.fetch<TData>({query});
    setState({data, loading: false});
  }, [query]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {...state, fetchApi};
};
