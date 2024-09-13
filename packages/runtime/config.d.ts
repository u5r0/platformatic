/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type HttpsSchemasPlatformaticDevPlatformaticRuntime200Alpha8Json = {
  [k: string]: unknown;
} & {
  $schema?: string;
  preload?: string;
  autoload?: {
    path: string;
    exclude?: string[];
    mappings?: {
      [k: string]: {
        id: string;
        config?: string;
        useHttp?: boolean;
      };
    };
  };
  telemetry?: OpenTelemetry;
  server?: {
    hostname?: string;
    port?: number | string;
    pluginTimeout?: number;
    healthCheck?:
      | boolean
      | {
          enabled?: boolean;
          interval?: number;
          [k: string]: unknown;
        };
    ignoreTrailingSlash?: boolean;
    ignoreDuplicateSlashes?: boolean;
    connectionTimeout?: number;
    keepAliveTimeout?: number;
    maxRequestsPerSocket?: number;
    forceCloseConnections?: boolean | string;
    requestTimeout?: number;
    bodyLimit?: number;
    maxParamLength?: number;
    disableRequestLogging?: boolean;
    exposeHeadRoutes?: boolean;
    logger?:
      | boolean
      | {
          level?: string;
          transport?:
            | {
                target?: string;
                options?: {
                  [k: string]: unknown;
                };
              }
            | {
                targets?: {
                  target?: string;
                  options?: {
                    [k: string]: unknown;
                  };
                  level?: string;
                  additionalProperties?: never;
                  [k: string]: unknown;
                }[];
                options?: {
                  [k: string]: unknown;
                };
              };
          pipeline?: {
            target?: string;
            options?: {
              [k: string]: unknown;
            };
          };
          [k: string]: unknown;
        };
    serializerOpts?: {
      schema?: {
        [k: string]: unknown;
      };
      ajv?: {
        [k: string]: unknown;
      };
      rounding?: "floor" | "ceil" | "round" | "trunc";
      debugMode?: boolean;
      mode?: "debug" | "standalone";
      largeArraySize?: number | string;
      largeArrayMechanism?: "default" | "json-stringify";
      [k: string]: unknown;
    };
    caseSensitive?: boolean;
    requestIdHeader?: string | false;
    requestIdLogLabel?: string;
    jsonShorthand?: boolean;
    trustProxy?: boolean | string | string[] | number;
    http2?: boolean;
    https?: {
      allowHTTP1?: boolean;
      key:
        | string
        | {
            path?: string;
          }
        | (
            | string
            | {
                path?: string;
              }
          )[];
      cert:
        | string
        | {
            path?: string;
          }
        | (
            | string
            | {
                path?: string;
              }
          )[];
      requestCert?: boolean;
      rejectUnauthorized?: boolean;
    };
    cors?: {
      origin?:
        | boolean
        | string
        | (
            | string
            | {
                regexp: string;
                [k: string]: unknown;
              }
          )[]
        | {
            regexp: string;
            [k: string]: unknown;
          };
      methods?: string[];
      /**
       * Comma separated string of allowed headers.
       */
      allowedHeaders?: string;
      exposedHeaders?: string[] | string;
      credentials?: boolean;
      maxAge?: number;
      preflightContinue?: boolean;
      optionsSuccessStatus?: number;
      preflight?: boolean;
      strictPreflight?: boolean;
      hideOptionsRoute?: boolean;
    };
  };
  entrypoint?: string;
  watch?: boolean | string;
  inspectorOptions?: {
    host?: string;
    port?: number;
    breakFirstLine?: boolean;
    watchDisabled?: boolean;
    [k: string]: unknown;
  };
  undici?: {
    agentOptions?: {
      [k: string]: unknown;
    };
    interceptors?:
      | UndiciInterceptor[]
      | {
          Client?: UndiciInterceptor[];
          Pool?: UndiciInterceptor[];
          Agent?: UndiciInterceptor[];
          [k: string]: unknown;
        };
    [k: string]: unknown;
  };
  managementApi?:
    | boolean
    | string
    | {
        logs?: {
          [k: string]: unknown;
        };
      };
  metrics?:
    | boolean
    | {
        port?: number | string;
        hostname?: string;
        endpoint?: string;
        auth?: {
          username: string;
          password: string;
        };
        labels?: {
          [k: string]: string;
        };
      };
  restartOnError?: boolean | number;
  services?: {
    [k: string]: unknown;
  }[];
};

export interface OpenTelemetry {
  /**
   * The name of the service. Defaults to the folder name if not specified.
   */
  serviceName: string;
  /**
   * The version of the service (optional)
   */
  version?: string;
  /**
   * An array of paths to skip when creating spans. Useful for health checks and other endpoints that do not need to be traced.
   */
  skip?: {
    /**
     * The path to skip. Can be a string or a regex.
     */
    path?: string;
    /**
     * HTTP method to skip
     */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
    [k: string]: unknown;
  }[];
  exporter?:
    | {
        type?: "console" | "otlp" | "zipkin" | "memory";
        /**
         * Options for the exporter. These are passed directly to the exporter.
         */
        options?: {
          /**
           * The URL to send the traces to. Not used for console or memory exporters.
           */
          url?: string;
          /**
           * Headers to send to the exporter. Not used for console or memory exporters.
           */
          headers?: {
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        additionalProperties?: never;
        [k: string]: unknown;
      }[]
    | {
        type?: "console" | "otlp" | "zipkin" | "memory";
        /**
         * Options for the exporter. These are passed directly to the exporter.
         */
        options?: {
          /**
           * The URL to send the traces to. Not used for console or memory exporters.
           */
          url?: string;
          /**
           * Headers to send to the exporter. Not used for console or memory exporters.
           */
          headers?: {
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        additionalProperties?: never;
        [k: string]: unknown;
      };
}
export interface UndiciInterceptor {
  module: string;
  options: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
