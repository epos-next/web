import { BigDataObject } from "@services/api-service";
import lodash from "lodash";
import { Advertisement } from "../src/models/advertisement";
import { ControlWork } from "../src/models/control-work";
import { Homework } from "../src/models/homework";
import { Lesson } from "../src/models/lesson";
import { Marks } from "../src/models/marks";
import { User } from "../src/models/user";

export const lesson: Lesson = {
    date: new Date().toISOString(),
    room: "202",
    subject: "Алгебра",
    duration: 40,
    groupId: 1,
    id: 1,
}

export const lessonsList = lodash.times(35).map((_, i) => ({ ...lesson, id: i }))

export const marks: Marks = {
    "Алгебра": {
        total: 4,
        periods: [
            {
                total: 4,
                all: [{ value: 4, name: "КР", date: new Date(), topic: "преобразования" }],
            },
            {
                total: 3,
                all: [{ value: 3, name: "КР №2", date: new Date(), topic: "преобразования" }],
            },
            {
                total: 5,
                all: [{ value: 5, name: "КР №3", date: new Date(), topic: "преобразования" }],
            },
            {
                total: 4,
                all: [{ value: 4, name: "КР №4", date: new Date(), topic: "преобразования" }],
            },
        ],
    }
}

export const marksJson = {
    "Алгебра": {
        total: 4,
        periods: [
            {
                total: 4,
                all: [{ value: 4, name: "КР", date: new Date().toISOString(), topic: "преобразования" }],
            },
            {
                total: 3,
                all: [{ value: 3, name: "КР №2", date: new Date().toISOString(), topic: "преобразования" }],
            },
            {
                total: 5,
                all: [{ value: 5, name: "КР №3", date: new Date().toISOString(), topic: "преобразования" }],
            },
            {
                total: 4,
                all: [{ value: 4, name: "КР №4", date: new Date().toISOString(), topic: "преобразования" }],
            },
        ],
    }
}

export const ad: Advertisement = {
    content: "some content",
    id: 12,
    targetDate: new Date(),
}
export const adsList = lodash.times(213).map((_, i) => ({ ...ad, id: i }))

export const controlWork: ControlWork = {
    lesson: "Физика",
    date: new Date(),
    name: "Кр",
    id: 123,
}
export const controlWorkList = lodash.times(213).map((_, i) => ({ ...controlWork, id: i }))

export const homework: Homework = {
    done: false,
    id: 213,
    lesson: "Физика",
    content: "Some test data adsadasd"
}
export const homeworkList = lodash.times(123).map((_, i) => ({ ...homework, id: i }))

export const user: User = {
    name: "Mike Wazowski",
    id: 2,
}

export const bdo: BigDataObject = {
    lessons: lessonsList,
    marks,
    advertisements: adsList,
    controlWorks: controlWorkList,
    homework: homeworkList,
    user,
}

export const bdo2: BigDataObject = {
    lessons: [...lessonsList, lesson],
    marks,
    advertisements: [...adsList, ad],
    controlWorks: [...controlWorkList, controlWork],
    homework: [...homeworkList, homework],
    user,
}

export const bdoJson = {
    lessons: lessonsList,
    marks: marksJson,
    advertisements: adsList.map(e => ({ ...e, targetDate: e.targetDate.toISOString() })),
    controlWorks: controlWorkList.map(e => ({ ...e, date: e.date.toISOString() })),
    homework: homeworkList,
    user,
}

export const schedule = {
    "2021-12-21T00:00:00.000Z": lodash.times(6).map(() => ({ ...lesson, date: new Date(2021, 11, 21).toISOString() })),
    "2021-12-22T00:00:00.000Z": lodash.times(7).map(() => ({ ...lesson, date: new Date(2021, 11, 22).toISOString() })),
    "2021-12-23T00:00:00.000Z": lodash.times(5).map(() => ({ ...lesson, date: new Date(2021, 11, 23).toISOString() })),
}

const lessonsDates = [
    new Date(2021, 11, 21),
    new Date(2021, 11, 22),
    new Date(2021, 11, 23),
    new Date(2021, 11, 24),
    new Date(2021, 11, 25),
    new Date(2021, 11, 26),
    new Date(2021, 11, 27),
]
export const savedRandomLessonByISODates: any = {}

export let randomLessons: any = []

for (let date of lessonsDates) {
    const r = Math.floor(Math.random() * 100) + 1
    savedRandomLessonByISODates[date.toISOString()] = lodash.times(r, (i) => ({
        ...lesson,
        date: date.toISOString(),
        id: i
    }));
    randomLessons.push(...savedRandomLessonByISODates[date.toISOString()])
}

randomLessons = lodash.shuffle(randomLessons)

export const tokensBody = {
    tokens: {
        access: '123.123.123',
        refresh: '456.456.456',
    },
    id: 1,
}

export const getDatesAnswers = [
    [
        {
            "date": new Date("2021-11-28T19:00:00.000Z"),
            "disable": true,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-11-29T19:00:00.000Z"),
            "disable": true,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-11-30T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-12-01T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-12-02T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-12-03T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-12-04T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-12-05T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-12-06T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-12-07T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-12-08T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-12-09T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-12-10T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-12-11T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-12-12T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-12-13T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-12-14T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-12-15T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-12-16T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-12-17T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-12-18T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-12-19T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-12-20T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-12-21T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-12-22T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-12-23T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-12-24T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-12-25T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-12-26T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-12-27T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-12-28T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-12-29T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-12-30T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-12-31T19:00:00.000Z"),
            "disable": true,
            "weekday": "Сб"
        },
        {
            "date": new Date("2022-01-01T19:00:00.000Z"),
            "disable": true,
            "weekday": "Вс"
        }
    ],
    [
        {
            "date": new Date("2021-01-31T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-01T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-02T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-03T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-04T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-05T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-06T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-02-07T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-08T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-09T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-10T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-11T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-12T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-13T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-02-14T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-15T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-16T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-17T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-18T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-19T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-20T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-02-21T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-22T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-23T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-24T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-25T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-26T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-27T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        }
    ],
    [
        {
            "date": new Date("2021-04-25T19:00:00.000Z"),
            "disable": true,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-04-26T19:00:00.000Z"),
            "disable": true,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-04-27T19:00:00.000Z"),
            "disable": true
        },
        {
            "date": new Date("2021-04-28T19:00:00.000Z"),
            "disable": true,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-04-29T19:00:00.000Z"),
            "disable": true,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-04-30T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-05-01T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-05-02T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-05-03T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-05-04T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-05-05T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-05-06T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-05-07T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-05-08T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-05-09T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-05-10T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-05-11T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-05-12T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-05-13T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-05-14T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-05-15T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-05-16T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-05-17T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-05-18T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-05-19T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-05-20T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-05-21T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-05-22T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-05-23T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-05-24T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-05-25T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-05-26T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-05-27T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-05-28T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-05-29T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-05-30T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-05-31T19:00:00.000Z"),
            "disable": true,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-06-01T19:00:00.000Z"),
            "disable": true,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-06-02T19:00:00.000Z"),
            "disable": true,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-06-03T19:00:00.000Z"),
            "disable": true,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-06-04T19:00:00.000Z"),
            "disable": true,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-06-05T19:00:00.000Z"),
            "disable": true,
            "weekday": "Вс"
        }
    ],
    [
        {
            "date": new Date("2021-01-31T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-01T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-02T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-03T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-04T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-05T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-06T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-02-07T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-08T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-09T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-10T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-11T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-12T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-13T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-02-14T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-15T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-16T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-17T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-18T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-19T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-20T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        },
        {
            "date": new Date("2021-02-21T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пн"
        },
        {
            "date": new Date("2021-02-22T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вт"
        },
        {
            "date": new Date("2021-02-23T19:00:00.000Z"),
            "disable": false,
            "weekday": "Ср"
        },
        {
            "date": new Date("2021-02-24T19:00:00.000Z"),
            "disable": false,
            "weekday": "Чт"
        },
        {
            "date": new Date("2021-02-25T19:00:00.000Z"),
            "disable": false,
            "weekday": "Пт"
        },
        {
            "date": new Date("2021-02-26T19:00:00.000Z"),
            "disable": false,
            "weekday": "Сб"
        },
        {
            "date": new Date("2021-02-27T19:00:00.000Z"),
            "disable": false,
            "weekday": "Вс"
        }
    ]
]
