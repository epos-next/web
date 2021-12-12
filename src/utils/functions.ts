/**
 * Convert usual month index to month index in academic year
 * @param month The month as a number between 0 and 11 (January to December)
 * @return Index in academic year (0 is September, 1 is October, etc)
 */
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
