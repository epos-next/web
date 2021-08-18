import moment from "moment";

const startTime = moment();

export default class DateHelper {
    static isSummer() {
        return this.now.getMonth() >= 5 && this.now.getMonth() <= 7;
    }

    static get now() {
        const time = {
            date: 1,
            month: 1,
            hours: 0,
            minutes: 0,
        }
        const diff = moment(startTime).diff(moment())
        return moment(time).add(Math.abs(diff), "ms").toDate(); // will change in demo mode
    }
}
