import {HttpRequestMethodString, getProtocol, getRequestBody} from './utils';
import {
  ActionType,
  useRequestReducer,
  RequestState,
  RequestStatus,
} from './RequestReducer';

interface PostRequestState<T> extends RequestState<T> {
  mutate: (url: string, body: {}) => Promise<void>;
}

function useMutate<T>(method: HttpRequestMethodString) {
  const mutate = async (url: string, data: {}) => {
    if (!url || !url.trim()) {
      dispatch({
        type: ActionType.error,
        payload: 'Cannot POST: no url provided',
      });
      return;
    }

    dispatch({type: ActionType.fetching});
    const body = getRequestBody(data, method);
    try {
      const response = await fetch(
        `${getProtocol()}localhost:8081${url}`,
        body,
      );
      const responseData = await response.json();
      dispatch({type: ActionType.fetched, payload: responseData});
    } catch (error) {
      dispatch({
        type: ActionType.error,
        payload: error instanceof Error ? error.message : error,
      });
    }
  };

  const initialState: PostRequestState<T> = {
    status: RequestStatus.idle,
    mutate,
  };

  const [postState, dispatch] =
    useRequestReducer<PostRequestState<T>>(initialState);

  return postState;
}

export default useMutate;
