
export type AuthenticateApiError = ServerErrorApiError | InvalidCredentialsApiError;

/**
 * Can't connect to server
 * Used as base type to *server-error based* types.
 * @see type-guard {@link isServerErrorApiError}
 */
export type ServerErrorApiError = "server-error";

/**
 * User send invalid email or/and password
 * @see type-guard {@link isInvalidCredentialsApiError}
 */
export type InvalidCredentialsApiError = "invalid-credentials";

/**
 * Can't find record
 */
export type NotFoundApiError = "not-found";

/**
 * User have no access to this or he don't authorized at all
 */
export type ForbiddenApiError = "forbidden";

/**
 * Invalid data were provide to the request
 */
export type BadRequestApiError = "bad-request"



