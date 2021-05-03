export interface CalendarDay {
    day: number;
    date: Date;
    type: CalendarMonthType;
}

export type CalendarMonthType = "previous" | "current" | "next";

export interface DateMatrix {
    weekdays: Array<string>;
    rows: Array<Array<CalendarDay>>;
}

export interface DateMatrixOptions {
    firstDay?: "monday" | "sunday";
    locale?: string;
}
