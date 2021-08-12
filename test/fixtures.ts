import { BigDataObject } from "@services/api-service";
import lodash from "lodash";
import { repeat } from "rxjs/operators";
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
    "2021-12-20T19:00:00.000Z": lodash.times(6).map(() => ({ ...lesson, date: new Date(2021, 11, 21).toISOString() })),
    "2021-12-21T19:00:00.000Z": lodash.times(7).map(() => ({ ...lesson, date: new Date(2021, 11, 22).toISOString() })),
    "2021-12-22T19:00:00.000Z": lodash.times(5).map(() => ({ ...lesson, date: new Date(2021, 11, 23).toISOString() })),
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
    savedRandomLessonByISODates[date.toISOString()] = lodash.times(r, (i) => ({ ...lesson, date: date.toISOString(), id: i }));
    randomLessons.push(...savedRandomLessonByISODates[date.toISOString()])
}

randomLessons = lodash.shuffle(randomLessons)


