import { useAuth0 } from '@auth0/auth0-react';
import { useToast } from '@chakra-ui/react';
import axios, {
  AxiosHeaders,
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  isAxiosError,
} from 'axios';
import _ from 'lodash';
import { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLifecycleState } from '@/hooks';
import { config, Service } from '@/services';

type OmitFirstArg<F> = F extends (
  config: AxiosRequestConfig,
  ...params: infer P
) => Promise<AxiosResponse<infer R>>
  ? (...params: P) => Promise<R>
  : never;

export type UseAxiosOptions<Req> = {
  unauth?: boolean;
  delayPercentFinished?: number;
  displayMessageFromResponse?: boolean;
  displayMessageFromException?: boolean;
  autoRedirectByHttpStatus?: Array<HttpStatusCode>;
  message?: string;
  paramsOrData?: Req;
};

export const useAxios = <
  S extends Record<
    A,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config: AxiosRequestConfig, ...dataOrParams: any) => Promise<any>
  > &
    Service,
  A extends Exclude<keyof S, keyof Service>,
  Req extends Parameters<OmitFirstArg<S[A]>>,
  Res extends Awaited<ReturnType<OmitFirstArg<S[A]>>>,
>(
  service: S,
  action: A,
  options: UseAxiosOptions<Req> = {},
) => {
  const {
    unauth,
    delayPercentFinished = 0,
    displayMessageFromResponse = false,
    displayMessageFromException = true,
    autoRedirectByHttpStatus = [
      HttpStatusCode.Unauthorized,
      HttpStatusCode.Forbidden,
      HttpStatusCode.NotFound,
      HttpStatusCode.InternalServerError,
    ],
    message,
  } = options;

  const { getAccessTokenSilently } = useAuth0();

  const lifecycleState = useLifecycleState();

  const navigate = useNavigate();
  const location = useLocation();

  const toast = useToast();

  const axiosInstacne = axios.create(config);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>();

  const [data, setData] = useState<Res>();
  const [headers, setHeaders] = useState<AxiosHeaders>(new AxiosHeaders());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>();

  const onProgress = (event: AxiosProgressEvent): void => {
    setPercent(Math.round((event.loaded / (event.total ?? 0)) * 100));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let percentTimeout: any;

  const request = async (...paramsOrData: Req): Promise<Res> => {
    if (isLoading) {
      throw new Error('on progress');
    }
    if (percentTimeout) {
      clearTimeout(percentTimeout);
    }

    setIsLoading(true);
    setPercent(0);

    try {
      const token = unauth
        ? undefined
        : await getAccessTokenSilently().catch((error) => {
            navigate({
              pathname: '/not-logged',
              search: new URLSearchParams({
                returnTo: location.pathname,
              }).toString(),
            });
            return Promise.reject(error);
          });

      const fetcher = service.setFetcher(axiosInstacne);

      const requestHeaders = new AxiosHeaders();
      if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`);
      }

      const response = (await fetcher[action](
        {
          headers: requestHeaders,
          onUploadProgress: onProgress,
          onDownloadProgress: onProgress,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(paramsOrData as any),
      )) satisfies AxiosResponse<Res>;

      setData(response.data === '' ? undefined : response.data);
      setHeaders(response.headers);
      setError(undefined);

      if (
        displayMessageFromResponse &&
        typeof response.data.message === 'string'
      ) {
        toast({
          status: 'success',
          description: response.data.message,
        });
      } else if (message) {
        toast({
          status: 'success',
          description: message,
        });
      }

      return response.data;
    } catch (exception: unknown) {
      setPercent(undefined);
      setData(undefined);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!isAxiosError<any>(exception)) {
        setError(undefined);
        setHeaders(new AxiosHeaders());

        throw exception;
      }

      setError(exception.response!.data);
      setHeaders(exception.response!.headers as AxiosHeaders);

      const isAutoRedirect = _.includes(
        autoRedirectByHttpStatus,
        exception.response?.status ?? 500,
      );

      if (isAutoRedirect && lifecycleState.current.isMounted) {
        switch (exception.response!.status) {
          case HttpStatusCode.Unauthorized:
            navigate({
              pathname: '/not-logged',
              search: new URLSearchParams({
                returnTo: location.pathname,
              }).toString(),
            });
            break;
          case HttpStatusCode.Forbidden:
            navigate(
              {
                pathname: '/access-denied',
              },
              { replace: true },
            );
            break;
          case HttpStatusCode.NotFound:
            navigate(
              {
                pathname: '/not-found',
              },
              { replace: true },
            );
            break;
          case HttpStatusCode.InternalServerError:
          default:
            navigate(
              {
                pathname: '/internal-server-error',
              },
              { replace: true },
            );
            break;
        }
        throw exception;
      }

      if (
        !isAutoRedirect &&
        displayMessageFromException &&
        exception.response?.data?.message
      ) {
        toast({
          status: 'error',
          description: exception.response.data.message,
        });
      }

      throw exception;
    } finally {
      setIsLoading(false);
      percentTimeout = setTimeout(
        () => setPercent(undefined),
        delayPercentFinished,
      );
    }
  };

  useLayoutEffect(() => {
    if (typeof options.paramsOrData !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request(...(options.paramsOrData as any));
    }
  }, []);

  return {
    isLoading,
    percent,
    data,
    setData,
    error,
    setError,
    headers,
    setHeaders,
    request,
  };
};
