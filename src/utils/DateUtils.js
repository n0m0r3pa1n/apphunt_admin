var moment = require('moment')
import {WEEK_DAYS} from '../constants/DaysEnum.js'
export var DateUtils = {
    getDoubleDigitDate: function (dateStr) {
        if (dateStr === "") {
            return;
        }

        var split = dateStr.split('-');
        var year = split[0];
        var month = split[1];
        var day = split[2];

        month = getFormattedNumber(month)
        day = getFormattedNumber(day)

        return year + "-" + month + "-" + day;
    },
    formatDate: function (date) {
        if (date === '') {
            return;
        }
        var output = '';
        output += date.getFullYear() + '-';
        output += getFormattedNumber(date.getMonth() + 1) + '-';
        output += getFormattedNumber(date.getDate());
        return output;
    },
    getWeeksInDate: function (fromDate, toDate) {
        fromDate = new Date();
        toDate = new Date();

        //fromDate.setDate(toDate.getDate() - 31)

        let daysBetween = getNumberOfDaysBetween(fromDate, toDate)
        let weeks = []
        let period = {}
        let currentDate = moment(fromDate)
        for (let i = 0; i <= daysBetween; i++) {
            currentDate = moment(fromDate).add(i, 'days').toDate()

            if (moment(currentDate).days() == 1 || i == 0) {
                period.fromDate = currentDate;
            }

            if (moment(currentDate).days() == 0 || i == daysBetween) {
                period.toDate = currentDate;
                weeks.push(period)
                period = {}
            }
        }

        return weeks;
    }
};

function getFormattedNumber(number) {
    if(typeof number == 'string') {
        return number.length === 1 ? "0" + number : number;
    } else {
        return number < 10 ? "0" + number : number;
    }
}

function getNumberOfDaysBetween(firstDate, secondDate) {
    var one = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    var two = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    return Math.floor(days);
}
