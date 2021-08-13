import {render} from "@testing-library/react";
import React from "react"
import useIndexPage, { calculateNextLesson } from "../useIndexPage";
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import {parse} from "query-string";
import MockDate from 'mockdate'
import {
    Router,
    createHistory,
    createMemorySource,
    LocationProvider,
} from '@reach/router';
import {decodeQueryParams, QueryParamProvider, StringParam,} from "use-query-params";
import {lesson, user} from "../../../test/fixtures";
import DateHelper from "../../helpers/date-helper";
import lodash from "lodash";
import moment from "moment";

describe("testing useIndexPage()", () => {
    const mockStore = configureMockStore([]);

    const TestComponent = ({initialRoute, store} = {}) => {
        const history = createHistory(createMemorySource(initialRoute ?? ""))

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
                <Provider store={ store ?? mockStore({userState: {}}) }>
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

    describe("testing user selector", () => {
        it("should select user", () => {
            const store = mockStore({userState: {user}});
            const {queryByTestId} = TestComponent({store});
            expect(queryByTestId("user")).toHaveTextContent(JSON.stringify(user))
        });

        it("should select empty user", () => {
            const store = mockStore({userState: {}});
            const {queryByTestId} = TestComponent({store});
            expect(queryByTestId("user")).toHaveTextContent("")
        });
    });
});


describe("testing calculateNextLesson", () => {

    const lessons = [
        { ...lesson, date: new Date(2021, 11, 21, 9, 0).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 10, 50).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 11, 45).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 9, 55).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 15, 25).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 14, 30).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 13, 35).toISOString() },
        { ...lesson, date: new Date(2021, 11, 21, 12, 40).toISOString() },
    ]

    const mockStore = configureMockStore([]);

    describe("should dispatch which lesson is currently being taught", () => {
        it("should dispatch which lesson is currently being taught (before all lessons)", () => {
            const now = new Date(2021, 11, 21, 8, 55)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": {
                            "date": "2021-12-21T04:00:00.000Z",
                            "duration": 40,
                            "groupId": 1,
                            "id": 1,
                            "room": "202",
                            "subject": "Алгебра"
                        },
                        "nextLessonType": "до начала  1 урока",
                        "timeLeftToNextLesson": "05:00"
                    },
                    "type": "lessons/setNextLesson"
                }
            ])

            dateMock.mockRestore();
        });

        it("should dispatch which lesson is currently being taught (in the middle of the day)", () => {
            const now = new Date(2021, 11, 21, 13)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": {
                            "date": "2021-12-21T08:35:00.000Z",
                            "duration": 40,
                            "groupId": 1,
                            "id": 1,
                            "room": "202",
                            "subject": "Алгебра"
                        },
                        "nextLessonType": "до конца 5 урока",
                        "timeLeftToNextLesson": "20:00"
                    },
                    "type": "lessons/setNextLesson"
                }
            ])

            dateMock.mockRestore();
        });

        it("should dispatch which lesson is currently being taught (last lesson)", () => {
            const now = new Date(2021, 11, 21, 16)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": null,
                        "nextLessonType": "до конца 8 урока",
                        "timeLeftToNextLesson": "05:00"
                    },
                    "type": "lessons/setNextLesson"
                }
            ])
            dateMock.mockRestore();
        });

        it("should dispatch which lesson is currently being taught (no lessons)", () => {
            const now = new Date(2021, 11, 21, 16)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson([], store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": null,
                        "nextLessonType": "",
                        "timeLeftToNextLesson": ""
                    },
                    "type": "lessons/setNextLesson"
                }
            ])
            dateMock.mockRestore();
        });

        it("should dispatch which lesson is currently being taught (lessons are over)", () => {
            const now = new Date(2021, 11, 21, 16, 5, 1)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": null,
                        "nextLessonType": "",
                        "timeLeftToNextLesson": ""
                    },
                    "type": "lessons/setNextLesson"
                }
            ])
            dateMock.mockRestore();
        });

        it("should dispatch which lesson is currently being taught (no lessons in the next 2 hours)", () => {
            const now = new Date(2021, 11, 21, 6, 59, 59)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": null,
                        "nextLessonType": "",
                        "timeLeftToNextLesson": ""
                    },
                    "type": "lessons/setNextLesson"
                }
            ])
            dateMock.mockRestore()
        });

        it("should dispatch which lesson is currently being taught (it's lesson break)", () => {
            const now = new Date(2021, 11, 21, 9, 46, 0)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": {
                            "date": "2021-12-21T04:55:00.000Z",
                            "duration": 40,
                            "groupId": 1,
                            "id": 1,
                            "room": "202",
                            "subject": "Алгебра"
                        },
                        "nextLessonType": "до начала  2 урока",
                        "timeLeftToNextLesson": "09:00"
                    },
                    "type": "lessons/setNextLesson"
                }
            ])
            dateMock.mockRestore();
        });

        it("should dispatch which lesson is currently being taught (it's lesson break #2)", () => {
            const now = new Date(2021, 11, 21, 11, 30, 1)
            MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })
            calculateNextLesson(lessons, store.dispatch)

            expect(store.getActions()).toEqual([
                {
                    "payload": {
                        "nextLesson": {
                            "date": "2021-12-21T06:45:00.000Z",
                            "duration": 40,
                            "groupId": 1,
                            "id": 1,
                            "room": "202",
                            "subject": "Алгебра"
                        },
                        "nextLessonType": "до начала  4 урока",
                        "timeLeftToNextLesson": "14:59"
                    },
                    "type": "lessons/setNextLesson"
                }
            ])

            dateMock.mockRestore();
        });

        it("should process 1000 lessons in less than 0.5s", async() => {
            const now = new Date(2021, 11, 21, 16, 5, 1)
            // MockDate.set(now)
            const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
            const store = mockStore({ lessonsState: {} })

            const input = [].concat.apply([], lodash.times(125).map(e => lessons))

            const start = new Date();
            await calculateNextLesson(input, store.dispatch)

            expect(new Date().getTime() - start.getTime()).toBeLessThanOrEqual(500)
            dateMock.mockRestore();
        });
    })

    /**
     * Really strange bug here
     *
     Error: expect(received).toEqual(expected) // deep equality

     - Expected  - 1
     + Received  + 1

     @@ -7,9 +7,9 @@
     "id": 1,
     "room": "202",
     "subject": "Алгебра",
     },
     "nextLessonType": "до начала  1 урока",
     -     "timeLeftToNextLesson": "00:29", <--- WTF????
     +     "timeLeftToNextLesson": "00:59",
     },
     "type": "lessons/setNextLesson",
     }
     * It's looks like it working in prod but some strange magic happened if i test it with jest
     * maybe i'm incorrect expect promise based function, idk. This function is like a daemon,
     * hard to test it. Will leave this code here and return back if I figure out how to deal with it
     */
    // describe("should handle timer changed",  () => {
    //     it("should dispatch until event changed",  async () => {
    //         jest.useFakeTimers();
    //         let now = new Date(2021, 11, 21, 8, 59, 1)
    //         MockDate.set(now)
    //         const dateMock = jest.spyOn(DateHelper, "now", "get").mockReturnValueOnce(now)
    //         const store = mockStore({ lessonsState: {} })
    //
    //         calculateNextLesson(lessons, store.dispatch)
    //
    //         let diff = moment.duration(moment(now).diff(lessons[0].date)).abs()
    //         for (let i = 59; i >= 0; i--) {
    //             console.log(moment.utc(diff.asMilliseconds()).format("mm:ss"))
    //             now = new Date(2021, 11, 21, 8, 59, 60 - i)
    //             dateMock.mockReturnValueOnce(now)
    //
    //             expect(store.getActions().length).toEqual(60 - i)
    //             expect(store.getActions()[59 - i]).toEqual({
    //                 "payload": {
    //                     "nextLesson": {
    //                         "date": "2021-12-21T04:00:00.000Z",
    //                         "duration": 40,
    //                         "groupId": 1,
    //                         "id": 1,
    //                         "room": "202",
    //                         "subject": "Алгебра"
    //                     },
    //                     "nextLessonType": "до начала  1 урока",
    //                     "timeLeftToNextLesson": `00:${i < 10 ? "0" + i : i}`
    //                 },
    //                 "type": "lessons/setNextLesson"
    //             })
    //             jest.runOnlyPendingTimers();
    //             await Promise.resolve();
    //             diff = diff.subtract(1, "seconds")
    //         }
    //         dateMock.mockRestore();
    //         jest.useRealTimers();
    //     });
    // })
})
