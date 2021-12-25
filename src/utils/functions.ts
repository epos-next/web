/**
 * Convert usual month index to month index in academic year
 * @param month The month as a number between 0 and 11 (January to December)
 * @return Index in academic year (0 is September, 1 is October, etc)
 */
import { Lesson } from "../models/lesson";

export function getAcademicMonthIndex(month: number): number {
    if (month == 8) return 0;
    if (month == 9) return 1;
    if (month == 10) return 2;
    if (month == 11) return 3;
    if (month == 0) return 4;
    if (month == 1) return 5;
    if (month == 2) return 6;
    if (month == 3) return 7;
    if (month == 4) return 8;
    if (month == 5) return 9;
    if (month == 6) return 10;
    else return 11;
}

/**
 * Convert month index in academic year in usual month index
 * @param month Index in academic year (0 is September, 1 is October, etc)
 * @return The month as a number between 0 and 11 (January to December)
 *
 */
export function getMonthFromAcademicYear(month: number): number {
    return ((month + 9) % 12 == 0 ? 12 : (month + 9) % 12) - 1;
}

export function urlify<T>(
    content: string,
    link: (content: string, href: string) => T,
    text: (content: string) => T
): T[] {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
    return content
        .split(urlRegex)
        .map(part => {
            if (part.match(urlRegex)) return link(part.replace(/(^\w+:|^)\/\//, ''), part);
            return text(part);
        });
}

/**
 * Sort list of lessons by date
 * @param schedule list of lessons, which should be sorted
 * @return sorted lessons in the order of the beginning of lessons
 */
export function sortSchedule(schedule: Lesson[]): Lesson[] {
    return schedule
        .slice()
        .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
}

/**
 * Remove time from date
 * @param date Date object, from which function should to delete time
 * @return date without time
 */
export function dateWithoutTime(date: Date): Date {
    const newDate = new Date(date.getTime())
    newDate.setHours(0, 0, 0, 0)
    return newDate
}

/**
 * Compare 2 Date object, comparing only date
 * @param date1 first date object
 * @param date2 second date object
 * @return true date1 == date2
 */
export function isTheSameDate(date1: Date, date2: Date): boolean {
    return dateWithoutTime(date1).getTime() == dateWithoutTime(date2).getTime()
}
