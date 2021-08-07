import React, { useState } from "react";
import { navigate } from "gatsby"
import AuthHelper from "@helpers/auth-helper";
import UiHelper from "@helpers/ui-helper";
import client from "@utils/api/client";
import ApiRoutes from "@utils/api/routes";

export default function useLoginPage() {
    // state
    let email = "",  password = "";
    const [isLoading, setIsLoading] = useState(false);

    return {
        values: {
            isLoading,
        },
        handlers: {
            onEmailChanged: (event: React.ChangeEvent<HTMLInputElement>) => email = event.target.value,
            onPasswordChanged: (event: React.ChangeEvent<HTMLInputElement>) => password = event.target.value,
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                if (!email || !password) return;
                setIsLoading(true);

                const response = await client.post(ApiRoutes.authenticate, { email, password });

                // Ok
                if (response.status === 200) {
                    AuthHelper.tokens = response.data;
                    await navigate("/");
                }

                // Invalid credentials
                if (response.status === 400) UiHelper.showErrorToast(
                    "Неверный Email или пароль. Проверьте корректность введнённых данных."
                );

                // Server error
                if (!response || !response.status || response.status === 500) UiHelper.showErrorToast(
                    "Похоже что наши сервисы сейчас недоступны. Повторите попытку чуть позже"
                );

                setIsLoading(false);
            }
        }
    }

}
