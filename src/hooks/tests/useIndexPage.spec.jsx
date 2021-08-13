import {render} from "@testing-library/react";
import React from "react"
import useIndexPage from "../useIndexPage";
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import {parse} from "query-string";
import {
    Router,
    createHistory,
    createMemorySource,
    LocationProvider,
} from '@reach/router';
import {decodeQueryParams, QueryParamProvider, StringParam,} from "use-query-params";

describe("testing useIndexPage()", () => {
    const mockStore = configureMockStore([]);

    const TestComponent = ({initialRoute} = {initialRoute: ""}) => {
        const history = createHistory(createMemorySource(initialRoute))
        const store = mockStore({userState: {}})

        const Inside = () => {
            const {values, handlers} = useIndexPage();
            return <React.Fragment>
                <div data-testid="user">{ JSON.stringify(values.user) }</div>
                <div data-testid="tab">{ JSON.stringify(values.tab) }</div>
                <button data-testid="change-tab-to-home" onChange={ () => handlers.handleTabChanged("home") }/>
                <button data-testid="change-tab-to-marks" onChange={ () => handlers.handleTabChanged("marks") }/>
            </React.Fragment>
        }

        return {
            ...render(<LocationProvider history={ history }>
                <Provider store={ store }>
                    <Router>
                        {/* @ts-ignore */ }
                        <QueryParamProvider default { ...{default: true} } reachHistory={ history }>
                            {/* @ts-ignore */ }
                            <Inside default/>
                        </QueryParamProvider>
                    </Router>
                </Provider>
            </LocationProvider>),
            history,
        }
    }


    describe("testing tab", () => {

        it("should return correct tab (home)", () => {
            const {queryByTestId} = TestComponent({initialRoute: "?tab=home"});
            expect(queryByTestId("tab")).toHaveTextContent("home")
        });

        it("should return correct tab (marks)", () => {
            const {queryByTestId} = TestComponent({initialRoute: "?tab=marks"});
            expect(queryByTestId("tab")).toHaveTextContent("marks")
        });

        it("should return home tab if no query specified", () => {
            const {queryByTestId} = TestComponent();
            expect(queryByTestId("tab")).toHaveTextContent("home")
        });

        it("should handleTabChanged", () => {
            const {queryByTestId, history} = TestComponent({initialRoute: "?tab=home"});
            queryByTestId("change-tab-to-marks")?.click()
            expect(
                decodeQueryParams({x: StringParam}, parse(history.location.search))
            ).toEqual({tab: "home"})
        });
    })
});
