import { Advertisement } from "../models/advertisement";
import { ControlWork } from "../models/control-work";
import { Lesson } from "../models/lesson";
import { Marks } from "../models/marks";

export default class FormatHelper {

    private static getNumEnding = (num: number, ending: [string, string, string]): string => {
        const last2 = num % 100;
        if (last2 >= 11 && last2 <= 19) return ending[2];

        const last = num % 10;
        switch (last) {
            case (1):
                return ending[0];
            case (2):
            case (3):
            case (4):
                return ending[1];
            default:
                return ending[2]
        }

    }

    private static _deltaDateInDay = (date1: Date, date2: Date): number => {
        return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
    }

    static formatDate(date: Date): string {
        const delta = this._deltaDateInDay(new Date(), date);
        if (delta <= 1 && date.getDate() === new Date().getDate()) return "Сегодня";
        if (delta <= 1) return "Завтра";
        return this.formatDayAndMonth(date.getDate(), date.getMonth());
    }

    static formatDayAndMonth = (day: number, month: number) : string => {
        const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        return `${day} ${months[month]}`;
    }

    static formatTime(date: Date): string {
        let h = date.getHours().toString(), m = date.getMinutes().toString();
        if (h.length === 1) h = "0" + h;
        if (m.length === 1) m = "0" + m;
        return `${h}:${m}`;
    }

    static convertAdsDateFields(ads: Advertisement[]): Advertisement[] {
        return ads.map(e => ({...e, targetDate: new Date(e.targetDate)}))
    }

    static convertControlWorksDateFields(controlWorks: ControlWork[]): ControlWork[] {
        return controlWorks.map(e => ({...e, date: new Date(e.date)}))
    }

    static convertMarksDateFields(marks: Marks): Marks {
        for (let key of Object.keys(marks)) {
            marks[key].periods = marks[key].periods.map(periods => {
                return {
                    ...periods,
                    all: periods.all.map(e => ({
                        ...e,
                        date: new Date(e.date)
                    }))
                }
            })
        }
        return marks
    }

    static formatLessonTime(lesson: Lesson): string {
        const date = lesson.date;
        const duration = lesson.duration;
        const startDate = new Date(date);
        const endDate = new Date(startDate.getTime() + duration * 60000);
        return `${ FormatHelper.formatTime(startDate) } – ${ FormatHelper.formatTime(endDate) }`;
    }
}
