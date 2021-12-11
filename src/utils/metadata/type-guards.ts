import { TokensBody } from "@helpers/auth-helper";
import {
    BadRequestApiError,
    ForbiddenApiError,
    InvalidCredentialsApiError, NotFoundApiError,
    ServerErrorApiError
} from "@utils/metadata/metadata";

/** Type guard for {@link InvalidCredentialsApiError } */
export function isInvalidCredentialsApiError(error: any): error is InvalidCredentialsApiError {
    return error === "invalid-credentials"
}

/** Type guard for {@link ServerErrorApiError } */
export function isServerErrorApiError(error: any): error is ServerErrorApiError {
    return error === "server-error"
}

/** Type guard for {@link ForbiddenApiError } */
export function isForbiddenApiError(error: any): error is ForbiddenApiError {
    return error === "forbidden"
}

/** Type guard for {@link NotFoundApiError } */
export function isNotFoundApiError(error: any): error is NotFoundApiError {
    return error === "not-found"
}

/** Type guard for {@link BadRequestApiError } */
export function isBadRequestApiError(error: any): error is BadRequestApiError {
    return error === "bad-request"
}

/** Type guard for {@link TokensBody } */
export function isTokensBody(obj: any): obj is TokensBody {
    return typeof obj.tokens === "object"
        && typeof obj.tokens.access === "string"
        && typeof obj.tokens.refresh === "string"
        && typeof obj.id === "number";
}
