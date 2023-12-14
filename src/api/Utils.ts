export enum HttpRequestMethods {
  post = 'POST',
  patch = 'PATCH',
}

export type HttpRequestMethodString =
  | HttpRequestMethods.post
  | HttpRequestMethods.patch;

export function getRequestBody(
  data: {},
  method: HttpRequestMethodString,
): RequestInit {
  return {
    headers: {'Content-Type': 'application/json'},
    method,
    body: JSON.stringify(data),
  };
}

export function getProtocol(): string {
  return process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
}

// number of seconds since epoch
export function getUnixTimestamp(JSTimestamp: number): number {
  return Math.floor(JSTimestamp / 1000);
}

export function getUnixNow() {
  const now = new Date().getTime();
  return getUnixTimestamp(now);
}
