import DateHelper from "@helpers/date-helper";

it("should say that now summer", () => {
    jest.spyOn(DateHelper, "now", "get").mockReturnValue(new Date(1, 7, 22))
    expect(DateHelper.isSummer()).toEqual(true)
});

it("should say that now not summer", () => {
    jest.spyOn(DateHelper, "now", "get").mockReturnValue(new Date(1, 3, 22))
    expect(DateHelper.isSummer()).toEqual(false)
});

