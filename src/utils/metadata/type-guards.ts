import { TokensBody } from "@helpers/auth-helper";
import {
    InvalidCredentialsApiError,
    ServerErrorApiError
} from "@utils/metadata/metadata";

/** Type guard for {@link InvalidCredentialsApiError } */
export function isInvalidCredentialsApiResponseError(error: string): error is InvalidCredentialsApiError {
    return error === "invalid-credentials"
}

/** Type guard for {@link ServerErrorApiError } */
export function isServerErrorApiResponseError(error: string): error is ServerErrorApiError {
    return error === "server-error"
}

/** Type guard for {@link TokensBody } */
export function isTokensBody(obj: any): obj is TokensBody {
    return typeof obj.tokens === "object"
        && typeof obj.tokens.access === "string"
        && typeof obj.tokens.refresh === "string"
        && typeof obj.id === "string";
}
