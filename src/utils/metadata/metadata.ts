import { TokensBody } from "@helpers/auth-helper";

/**
 * Used as return type of {@link ApiService.authenticate[](ApiService#authenticate) }
 */
export type AuthenticateApiResponse = TokensBody | AuthenticateApiResponseError;


/**
 * Error type of {@link AuthenticateApiResponse}
 */
export type AuthenticateApiResponseError =
    InvalidCredentialsAuthenticateApiResponseError
    | ServerErrorAuthenticateApiResponseError;

/**
 * {@link AuthenticateApiResponse}: user send invalid email or/and password
 */
export type InvalidCredentialsAuthenticateApiResponseError = "invalid-credentials";

/**
 * {@link AuthenticateApiResponse}: can't connect to server
 */
export type ServerErrorAuthenticateApiResponseError = ServerErrorApiResponseError;

/**
 * Can't connect to server
 * Used as base type to *server-error based* types.
 */
export type ServerErrorApiResponseError = "server-error";
