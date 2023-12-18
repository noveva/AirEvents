import {useEffect, useRef} from 'react';
import {
  ActionType,
  useRequestReducer,
  RequestState,
  RequestStatus,
} from './RequestReducer';
import {getProtocol} from './utils';

function useFetch<T>(url: string, body?: RequestInit) {
  const cache = useRef<{[key: string]: any}>({});

  const initialState: RequestState<T> = {
    status: RequestStatus.idle,
    error: null,
    data: [],
  };

  const [fetchState, dispatch] =
    useRequestReducer<RequestState<T>>(initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url || !url.trim()) {
      return;
    }

    const fetchData = async () => {
      dispatch({type: ActionType.fetching});
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({type: ActionType.fetched, payload: data});
      } else {
        try {
          const response = await fetch(`${getProtocol()}localhost:8081${url}`);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) {
            return;
          }
          dispatch({type: ActionType.fetched, payload: data});
        } catch (error) {
          if (cancelRequest) {
            return;
          }
          if (error) {
            dispatch({type: ActionType.error, payload: error.message});
          }
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url, body, dispatch]);

  return fetchState;
}

export default useFetch;
