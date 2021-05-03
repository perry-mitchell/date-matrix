# Date Matrix
> Calendar date matrix generator

Date matrix generator for NodeJS / browsers, written in Typescript.

This can be used to generate grids of days, representing a calendar month, by passing in any `Date` in the desired month.

## Installation

Install by running `npm install date-matrix --save`.

## Usage

Import `createDateMatrix` to create a date matrix object:

```typescript
import { DateMatrix, createDateMatrix } from "date-matrix";

const dm: DateMatrix = createDateMatrix(new Date("2021-04-30"));
// {
//     weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     weeks: [
//         // ...
//     ]
// }
```

`weeks` is an array of weeks (rows), representing Monday-Sunday in a calendar grid (or Sunday-Saturday when using `{ firstDay: "sunday" }`).

Each day **object** looks like the following:

```javascript
{
    day: 30,
    date: Date(),
    type: "current"
}
```

To just render the days as-is, you could use a helper function like so:

```typescript
function weeksToNumbers(weeks) {
    return weeks.map(week => week.map(item => item.day));
}

const dm: DateMatrix = createDateMatrix(new Date("2021-04-30"));
const matrix = weeksToNumbers(dm.weeks);
// [
//     [29, 30, 31, 1, 2, 3, 4],
//     [5, 6, 7, 8, 9, 10, 11],
//     [12, 13, 14, 15, 16, 17, 18],
//     [19, 20, 21, 22, 23, 24, 25],
//     [26, 27, 28, 29, 30, 1, 2]
// ]
```

### createDateMatrix

The function takes two parameters:

```typescript
createDateMatrix(date: Date, options?: DateMatrixOptions) => DateMatrix
```

| Parameter         | Type              | Required  | Description                           |
|-------------------|-------------------|-----------|---------------------------------------|
| `date`            | `Date`            | Yes       | The target date, with which to generate the date matrix from (using its month). |
| `options`         | `DateMatrixOptions`| No       | Options for the matrix creation.      |

With the `options` parameter supporting the following properties:

| Property          | Default           | Description                                       |
|-------------------|-------------------|---------------------------------------------------|
| `firstDay`        | `monday`          | The first day of the week, either `monday` or `sunday`. |
| `locale`          | _undefined_       | The locale to use for date handling, eg. `en-GB`. |
| `weekdayFormat`   | `short`           | The Date function weekday format, either `short` or `long`. |
