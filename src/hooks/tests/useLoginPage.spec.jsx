import React from "react"
import {act, renderHook} from "@testing-library/react-hooks";
import useLoginPage from "../useLoginPage";
import AuthHelper from "../../helpers/auth-helper";
import UiHelper from "../../helpers/ui-helper";
import ApiService from "../../services/api-service";
import {tokensBody} from "../../../test/fixtures";
import AppRouter from "../app-router";

it("should be idle (not loading) by default", () => {
    const {result} = renderHook(useLoginPage);
    expect(result.current.values.isLoading).toEqual(false)
});

it("should handle email and password", async () => {
    const {result} = renderHook(() => useLoginPage());
    jest.spyOn(ApiService, "authenticate").mockResolvedValueOnce(tokensBody)
    jest.spyOn(AuthHelper, "tokens", "set")
    const routerHomePrev = AppRouter.goHome;
    const routerMock = AppRouter.goHome = jest.fn()
    jest.spyOn(UiHelper, "showErrorToast")

    const email = "test@zotov.dev"
    const password = "12345678aSd"

    act(() => {
        result.current.handlers.onEmailChanged({target: {value: email}})
        result.current.handlers.onPasswordChanged({target: {value: password}})
    })

    await act(() => result.current.handlers.onSubmit({
        preventDefault() {
        }
    }))

    expect(ApiService.authenticate).toBeCalledWith(email, password)
    AppRouter.goHome = routerHomePrev
    jest.clearAllMocks()
});

describe("testing onSubmit()", () => {

    it("should login", async () => {
        const {result} = renderHook(() => useLoginPage());
        jest.spyOn(ApiService, "authenticate").mockResolvedValueOnce(tokensBody)
        const routerHomePrev = AppRouter.goHome;
        const routerMock = AppRouter.goHome = jest.fn()
        const authMock = jest.spyOn(AuthHelper, "tokens", "set")

        const email = "test@zotov.dev"
        const password = "12345678aSd"

        act(() => {
            result.current.handlers.onEmailChanged({target: {value: email}})
            result.current.handlers.onPasswordChanged({target: {value: password}})
        })

        await act(() => result.current.handlers.onSubmit({
            preventDefault() {
            }
        }))
        expect(authMock).toBeCalledWith(tokensBody)
        expect(routerMock).toBeCalledTimes(1)
        jest.clearAllMocks();
        AppRouter.goHome = routerHomePrev;
    });

    it("should handle invalid credentials", async () => {
        const {result} = renderHook(() => useLoginPage());
        jest.spyOn(ApiService, "authenticate").mockReturnValue("invalid-credentials")
        jest.spyOn(UiHelper, "showErrorToast").mockImplementation()

        const email = "test@zotov.dev"
        const password = "12345678aSd"

        act(() => {
            result.current.handlers.onEmailChanged({target: {value: email}})
            result.current.handlers.onPasswordChanged({target: {value: password}})
        })

        await act(() => result.current.handlers.onSubmit({
            preventDefault() {
            }
        }))

        expect(UiHelper.showErrorToast).toBeCalledWith(
            "Неверный Email или пароль. Проверьте корректность введённых данных."
        )
    });

    it("should handle server error", async () => {
        const {result} = renderHook(() => useLoginPage());
        jest.spyOn(ApiService, "authenticate").mockReturnValue("server-error")
        jest.spyOn(UiHelper, "showErrorToast").mockImplementation()

        const email = "test@zotov.dev"
        const password = "12345678aSd"

        act(() => {
            result.current.handlers.onEmailChanged({target: {value: email}})
            result.current.handlers.onPasswordChanged({target: {value: password}})
        })

        await act(() => result.current.handlers.onSubmit({
            preventDefault() {
            }
        }))

        expect(UiHelper.showErrorToast).toBeCalledWith(
            "Похоже что наши сервисы сейчас недоступны. Повторите попытку чуть позже"
        )
    });

})
