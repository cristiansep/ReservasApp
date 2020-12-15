import moment from 'moment';


export const prepareDates = (schedules = []) => {


    return schedules.map(
        (e) => ({
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate(),
        })
    );

}