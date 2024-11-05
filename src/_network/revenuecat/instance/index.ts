import axios, { AxiosError, AxiosRequestConfig } from "axios";

const _instance = axios.create({
  baseURL: process.env.REVENUECAT_API_HOST,
});

export const instance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  const source = axios.CancelToken.source();

  const promise = _instance({
    ...config,
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.REVENUECAT_API_KEY}`,
    },
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
