import moment from "moment";

const startTime = moment();

export default class DateHelper {
    static isSummer() {
        return this.now.getMonth() >= 5 && this.now.getMonth() <= 7;
    }

    static get now() {
        const time = {
            date: 25,
            month: 4,
            hours: 11,
            minutes: 20,
        }
        const diff = moment(startTime).diff(moment())
        return moment(time).add(Math.abs(diff), "ms").toDate(); // will change in demo mode
    }
}
