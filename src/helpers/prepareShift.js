import moment from 'moment';


export const prepareShift = (shifts = []) => {


    return shifts.map(
        (e) => ({
            ...e,
            slots: e.slots.slice(2, -2).split('","'),
            fecha: moment(e.fecha).toDate()
        })
    );

}