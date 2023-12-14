import {useReducer} from 'react';
import {
  ActionType,
  FetchReducerAction,
  RequestStatus,
} from './RequestTypes';
import {HttpRequestMethods, getProtocol, getRequestBody} from './Utils';

type PostRequestState = {
  status:
    | RequestStatus.idle
    | RequestStatus.fetching
    | RequestStatus.fetched
    | RequestStatus.error;
  error: string | null;
  post: (body: {}) => Promise<void>;
  data?: {};
};

function usePost(url: string) {
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

  const initialState: PostRequestState = {
    status: RequestStatus.idle,
    error: null,
    post,
  };

  const [postState, dispatch] = useReducer(
    (state: PostRequestState, action: FetchReducerAction): PostRequestState => {
      switch (action.type) {
        case ActionType.fetching:
          return {...initialState, status: RequestStatus.fetching};
        case ActionType.fetched:
          return {
            ...initialState,
            status: RequestStatus.fetched,
            data: action.payload,
          };
        case ActionType.error:
          return {
            ...initialState,
            status: RequestStatus.error,
            error: action.payload,
          };
        default:
          return state;
      }
    },
    initialState,
  );

  if (!url || !url.trim()) {
    dispatch({type: ActionType.error, payload: 'Cannot POST: no url provided'});
  }

  return postState;
}

export default usePost;
