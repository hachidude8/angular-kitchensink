import { HttpOptions } from '@aks/core/crud';


export type Credentials = Record<string, unknown>;

export type AuthenticationResult = unknown;

export interface AuthenticationConfig {
  url: string;
  httpOptions?: HttpOptions
}
