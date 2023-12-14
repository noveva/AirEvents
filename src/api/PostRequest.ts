import {HttpRequestMethods, getProtocol, getRequestBody} from './Utils';
import {
  ActionType,
  useRequestReducer,
  RequestState,
  RequestStatus,
} from './RequestReducer';

interface PostRequestState<T> extends RequestState<T> {
  post: (body: {}) => Promise<void>;
}

function usePost<T>(url: string) {
  const post = async (data: {}) => {
    dispatch({type: ActionType.fetching});
    const body = getRequestBody(data, HttpRequestMethods.post);
    try {
      const response = await fetch(
        `${getProtocol()}localhost:8081${url}`,
        body,
      );
      const responseData = await response.json();
      dispatch({type: ActionType.fetched, payload: responseData});
    } catch (error) {
      dispatch({type: ActionType.error, payload: error.message});
    }
  };

  const initialState: PostRequestState<T> = {
    status: RequestStatus.idle,
    error: null,
    post,
  };

  const [postState, dispatch] =
    useRequestReducer<PostRequestState<T>>(initialState);

  if (!url || !url.trim()) {
    dispatch({type: ActionType.error, payload: 'Cannot POST: no url provided'});
  }

  return postState;
}

export default usePost;
