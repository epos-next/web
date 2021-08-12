import { BigDataObject } from "@services/api-service";

export const bigDataObjectIsoStringToDate = (data: BigDataObject): BigDataObject => {
    data.controlWorks = data.controlWorks.map(e => ({
        ...e,
        date: new Date(e.date),
    }));
    data.advertisements = data.advertisements.map(e => ({
        ...e,
        targetDate: new Date(e.targetDate),
    }));

    for (let key of Object.keys(data.marks)) {
        data.marks[key].periods = data.marks[key].periods.map(e => {
            return {
                ...e,
                all: e.all.map(a => {
                    return {
                        ...a,
                        date: new Date(a.date),
                    }
                })
            }
        })
    }

    return data;
}
