import { CalendarDay, CalendarMonthType, DateMatrix, DateMatrixOptions } from "./types";

export function createDateMatrix(targetDate: Date, options: DateMatrixOptions = {}): DateMatrix {
    const { firstDay = "monday", locale, weekdayFormat = "short" } = options;
    const firstDayOfMonth = getFirstOfMonth(targetDate);
    const firstMonday = getFirstWeekday(firstDayOfMonth, firstDay === "monday");
    const weekdays = getWeekdayNames(firstMonday, locale, weekdayFormat);
    const weeks = [];
    let currentRow: Array<CalendarDay> = [],
        currentDate = dateFromDate(firstMonday),
        type: CalendarMonthType =
            currentDate.getMonth() === targetDate.getMonth() ? "current" : "previous",
        lastRow = false;
    while (true) {
        // Push day item to row
        currentRow.push({
            day: currentDate.getDate(),
            date: dateFromDate(currentDate),
            type
        });
        // Handle row
        if (currentRow.length >= 7) {
            weeks.push(currentRow);
            currentRow = [];
            if (lastRow) break;
        }
        // Increment day
        let previousDateMonth = currentDate.getMonth();
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getMonth() !== previousDateMonth) {
            // Handle month change
            if (type === "previous") {
                type = "current";
            } else if (type === "current") {
                type = "next";
                lastRow = true;
            } else {
                throw new Error("Failed generating calendar matrix: Invalid state");
            }
        }
    }
    return {
        weekdays,
        weeks
    };
}

function dateFromDate(date: Date): Date {
    return new Date(date.getTime());
}

function getFirstOfMonth(date: Date): Date {
    const newDate = dateFromDate(date);
    newDate.setDate(1);
    return newDate;
}

function getFirstWeekday(date: Date, firstDayMonday: boolean): Date {
    const [offsetA, offsetB] = firstDayMonday ? [-6, 1] : [-7, 0];
    const newDate = dateFromDate(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day === 0 ? offsetA : offsetB);
    newDate.setDate(diff);
    return newDate;
}

function getWeekdayNames(date: Date, locale: string, format: "short" | "long"): Array<string> {
    const currentDate = dateFromDate(date);
    const weekdays: Array<string> = [];
    for (let i = 0; i < 7; i += 1) {
        weekdays.push(currentDate.toLocaleString(locale, { weekday: format }));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdays;
}
