const { expect } = require("chai");
const { createDateMatrix } = require("../../dist/matrix.js");

function weeksToNumbers(weeks) {
    return weeks.map(week => week.map(item => item.day));
}

describe("createDateMatrix", function() {
    const TARGET_DATE = "2021-04-30";

    it("returns the correct structure", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        expect(dm)
            .to.have.property("weekdays")
            .that.is.an("array");
        expect(dm)
            .to.have.property("weeks")
            .that.is.an("array");
    });

    it("returns correct weekdays", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        expect(dm.weekdays).to.deep.equal(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    });

    it("returns correct weekdays (fi_FI locale)", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE), {
            locale: "fi-FI"
        });
        expect(dm.weekdays).to.deep.equal(["ma", "ti", "ke", "to", "pe", "la", "su"]);
    });

    it("returns correct weekdays (long format)", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE), {
            weekdayFormat: "long"
        });
        expect(dm.weekdays).to.deep.equal([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]);
    });

    it("returns correct matrix days", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        const weeks = weeksToNumbers(dm.weeks);
        // prettier-ignore
        expect(weeks).to.deep.equal([
            [29, 30, 31, 1, 2, 3, 4],
            [5, 6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24, 25],
            [26, 27, 28, 29, 30, 1, 2]
        ]);
    });

    it("returns correct matrix day date", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        expect(dm.weeks[0][1])
            .to.have.property("date")
            .that.satisfies(d => d.toDateString() === "Tue Mar 30 2021");
        expect(dm.weeks[1][0])
            .to.have.property("date")
            .that.satisfies(d => d.toDateString() === "Mon Apr 05 2021");
    });

    it("returns correct matrix day type", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        expect(dm.weeks[0][1]).to.have.property("type", "previous");
        expect(dm.weeks[1][0]).to.have.property("type", "current");
        expect(dm.weeks[4][6]).to.have.property("type", "next");
    });

    describe("with Sunday as first weekday", function() {
        it("returns correct weekdays", function() {
            const dm = createDateMatrix(new Date(TARGET_DATE), {
                firstDay: "sunday"
            });
            expect(dm.weekdays).to.deep.equal(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        });

        it("returns correct matrix days", function() {
            const dm = createDateMatrix(new Date(TARGET_DATE), {
                firstDay: "sunday"
            });
            const weeks = weeksToNumbers(dm.weeks);
            // prettier-ignore
            expect(weeks).to.deep.equal([
                [28, 29, 30, 31, 1, 2, 3],
                [4, 5, 6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15, 16, 17],
                [18, 19, 20, 21, 22, 23, 24],
                [25, 26, 27, 28, 29, 30, 1]
            ]);
        });
    });
});
