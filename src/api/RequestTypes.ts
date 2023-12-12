export enum RequestStatus {
  idle,
  fetching,
  fetched,
  error,
}

export enum ActionType {
  fetching,
  fetched,
  error,
}

export type RequestState = {
  status:
    | RequestStatus.idle
    | RequestStatus.fetching
    | RequestStatus.fetched
    | RequestStatus.error;
  error: string | null;
  data: any[];
};

export type FetchReducerAction = {
  type: ActionType.fetching | ActionType.fetched | ActionType.error;
  payload?: any;
};
