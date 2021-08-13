import React from "react"
import useIsLoading from "../useIsLoading";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import {renderHook} from "@testing-library/react-hooks";
import {user} from "../../../test/fixtures";

const mockStore = configureMockStore()

it("should return false if all loading states is false", () => {
    const store = mockStore({
        advertisementState: { loading: false },
        controlWorkState: { loading: false },
        homeworkState: { loading: false },
        lessonsState: { loading: false },
        marksState: { loading: false },
        userState: { user },
    })

    const { result } = renderHook(useIsLoading, {
        wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
    })

    expect(result.current).toEqual(false);
});

describe("should return true if at least one is true", () => {
    it("should return true if ads loading", () => {
        const store = mockStore({
            advertisementState: { loading: true },
            controlWorkState: { loading: false },
            homeworkState: { loading: false },
            lessonsState: { loading: false },
            marksState: { loading: false },
            userState: { user },
        })

        const { result } = renderHook(useIsLoading, {
            wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
        })

        expect(result.current).toEqual(true);
    });

    it("should return true if controlWorks loading", () => {
        const store = mockStore({
            advertisementState: { loading: false },
            controlWorkState: { loading: true },
            homeworkState: { loading: false },
            lessonsState: { loading: false },
            marksState: { loading: false },
            userState: { user },
        })

        const { result } = renderHook(useIsLoading, {
            wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
        })

        expect(result.current).toEqual(true);
    });

    it("should return true if homework loading", () => {
        const store = mockStore({
            advertisementState: { loading: false },
            controlWorkState: { loading: false },
            homeworkState: { loading: true },
            lessonsState: { loading: false },
            marksState: { loading: false },
            userState: { user },
        })

        const { result } = renderHook(useIsLoading, {
            wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
        })

        expect(result.current).toEqual(true);
    });

    it("should return true if lessons loading", () => {
        const store = mockStore({
            advertisementState: { loading: false },
            controlWorkState: { loading: false },
            homeworkState: { loading: false },
            lessonsState: { loading: true },
            marksState: { loading: false },
            userState: { user },
        })

        const { result } = renderHook(useIsLoading, {
            wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
        })

        expect(result.current).toEqual(true);
    });

    it("should return true if marks loading", () => {
        const store = mockStore({
            advertisementState: { loading: false },
            controlWorkState: { loading: false },
            homeworkState: { loading: false },
            lessonsState: { loading: false },
            marksState: { loading: true },
            userState: { user },
        })

        const { result } = renderHook(useIsLoading, {
            wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
        })

        expect(result.current).toEqual(true);
    });

    it("should return true if user loading", () => {
        const store = mockStore({
            advertisementState: { loading: false },
            controlWorkState: { loading: false },
            homeworkState: { loading: false },
            lessonsState: { loading: false },
            marksState: { loading: false },
            userState: { user: null },
        })

        const { result } = renderHook(useIsLoading, {
            wrapper: ({ children }) => <Provider store={store}>{ children }</Provider>
        })

        expect(result.current).toEqual(true);
    });
})
