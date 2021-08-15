import { TokensBody } from "@helpers/auth-helper";
import {
    AuthenticateApiResponse,
    InvalidCredentialsAuthenticateApiResponseError,
    ServerErrorAuthenticateApiResponseError
} from "@utils/metadata/metadata";

/** Type guard for {@link AuthenticateApiResponse } */
export function isSuccessAuthenticateApiResponse(response: AuthenticateApiResponse): response is TokensBody {
    return isTokensBody(response);
}

/** Type guard for {@link InvalidCredentialsAuthenticateApiResponseError } */
export function isInvalidCredentialsAuthenticateApiResponseError(response: AuthenticateApiResponse): response is InvalidCredentialsAuthenticateApiResponseError {
    return response === "invalid-credentials"
}

/** Type guard for {@link ServerErrorAuthenticateApiResponseError } */
export function isServerErrorAuthenticateApiResponseError(response: AuthenticateApiResponse): response is ServerErrorAuthenticateApiResponseError {
    return response === "server-error"
}

/** Type guard for {@link TokensBody } */
export function isTokensBody(obj: any): obj is TokensBody {
    return typeof obj.tokens === "object"
        && typeof obj.tokens.access === "string"
        && typeof obj.tokens.refresh === "string"
        && typeof obj.id === "string";
}
