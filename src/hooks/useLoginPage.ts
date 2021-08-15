import ApiService from "@services/api-service";
import {
    isInvalidCredentialsAuthenticateApiResponseError, isServerErrorAuthenticateApiResponseError,
    isSuccessAuthenticateApiResponse
} from "@utils/metadata/type-guards";
import React, { useState } from "react";
import { navigate } from "gatsby"
import AuthHelper from "@helpers/auth-helper";
import UiHelper from "@helpers/ui-helper";

export default function useLoginPage() {
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return {
        values: {
            isLoading,
        },
        handlers: {
            onEmailChanged: (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
            onPasswordChanged: (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                if (!email || !password) return;
                setIsLoading(true);

                const response = await ApiService.authenticate(email, password);

                if (isSuccessAuthenticateApiResponse(response)) {
                    AuthHelper.tokens = response;
                    await navigate("/");
                }

                if (isInvalidCredentialsAuthenticateApiResponseError(response)) UiHelper.showErrorToast(
                    "Неверный Email или пароль. Проверьте корректность введённых данных."
                );

                if (isServerErrorAuthenticateApiResponseError(response)) UiHelper.showErrorToast(
                    "Похоже что наши сервисы сейчас недоступны. Повторите попытку чуть позже"
                );

                setIsLoading(false);
            }
        }
    }

}
