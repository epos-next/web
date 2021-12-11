import moment from "moment";

const startTime = moment();

export default class DateHelper {
    static isSummer() {
        return this.now.getMonth() >= 5 && this.now.getMonth() <= 7;
    }

    static get now() {
        return new Date();
    }
}
