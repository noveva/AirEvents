import {useReducer} from 'react';

export enum RequestStatus {
  idle = 'idle',
  fetching = 'fetching',
  fetched = 'fetched',
  error = 'error',
}

export type RequestStatusString =
  | RequestStatus.idle
  | RequestStatus.fetching
  | RequestStatus.fetched
  | RequestStatus.error;

export interface RequestState {
  status: RequestStatusString;
  error: string | null;
  data?: any;
}

export enum ActionType {
  fetching = 'fetching',
  fetched = 'fetched',
  error = 'error',
}

export type RequestReducerAction = {
  type: ActionType.fetching | ActionType.fetched | ActionType.error;
  payload?: any;
};

export function useRequestReducer<T>(initialState: T) {
  return useReducer((state: T, action: RequestReducerAction): T => {
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
  }, initialState);
}
