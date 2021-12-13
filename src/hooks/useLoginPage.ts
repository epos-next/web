import ApiService from "@services/api-service";
import { uiMessages } from "@utils/constants";
import { isInvalidCredentialsApiError, isServerErrorApiError, isTokensBody } from "@utils/metadata/type-guards";
import React, { useState } from "react";
import AuthHelper from "@helpers/auth-helper";
import UiHelper from "@helpers/ui-helper";
import AppRouter from "./app-router";

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

                const response = await ApiService.authenticate(email, password)

                if (isTokensBody(response)) {
                    AuthHelper.tokens = response;
                    await AppRouter.goHome();
                }

                if (isInvalidCredentialsApiError(response)) UiHelper.showErrorToast(
                    "Неверный Email или пароль. Проверьте корректность введённых данных"
                );

                if (isServerErrorApiError(response)) UiHelper.showErrorToast(uiMessages.serverError);

                setIsLoading(false);
            }
        }
    }

}
