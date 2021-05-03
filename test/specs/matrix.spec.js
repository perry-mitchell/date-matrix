const { createDateMatrix } = require("../../dist/matrix.js");

describe("createDateMatrix", function() {
    const TARGET_DATE = "2021-04-30";

    it("returns the correct structure", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        expect(dm).to.have.property("weekdays").that.is.an("array");
        expect(dm).to.have.property("weeks").that.is.an("array");
    });

    it("returns correct weekdays", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE));
        expect(dm.weekdays).to.deep.equal([
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ]);
    });

    it("returns correct weekdays (fi_FI locale)", function() {
        const dm = createDateMatrix(new Date(TARGET_DATE), {
            locale: "fi-FI"
        });
        expect(dm.weekdays).to.deep.equal([
            "ma",
            "ti",
            "ke",
            "to",
            "pe",
            "la",
            "su"
        ]);
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
});
