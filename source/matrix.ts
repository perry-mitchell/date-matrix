import {
    CalendarDay,
    CalendarMonthType,
    DateMatrix,
    DateMatrixOptions
} from "./types";

export function createDateMatrix(targetDate: Date, options: DateMatrixOptions = {}): DateMatrix {
    const {
        firstDay = "monday",
        locale
    } = options;
    const firstDayOfMonth = getFirstOfMonth(targetDate);
    const firstMonday = getFirstWeekday(firstDayOfMonth, firstDay === "monday");
    const weekdays = getWeekdayNames(firstMonday, locale);
    const rows = [];
    let currentRow: Array<CalendarDay> = [],
        currentDate = new Date(firstMonday),
        type: CalendarMonthType = currentDate.getMonth() === targetDate.getMonth() ? "current" : "previous",
        lastRow = false;
    while (true) {
        // Push day item to row
        currentRow.push({
            day: currentDate.getDate(),
            date: new Date(currentDate),
            type
        });
        // Handle row
        if (currentRow.length >= 7) {
            rows.push(currentRow);
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
        rows
    };
}

function getFirstOfMonth(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate;
}

function getFirstWeekday(date: Date, firstDayMonday: boolean): Date {
    const [offsetA, offsetB] = firstDayMonday ? [-6, 1] : [-7, 0];
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day === 0 ? offsetA : offsetB);
    return new Date(newDate.setDate(diff));
}

function getWeekdayNames(date: Date, locale: string): Array<string> {
    const currentDate = new Date(date);
    const weekdays: Array<string> = [];
    for (let i = 0; i < 7; i += 1) {
        weekdays.push(currentDate.toLocaleString(
            locale,
            { weekday: "short" }
        ).substring(0, 1));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdays;
}
