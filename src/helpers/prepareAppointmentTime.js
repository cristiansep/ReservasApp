import moment from 'moment';


export const prepareAppointmentTime = (appointments = []) => {


    return appointments.map(
        (e) => ({
            ...e,
            fecha: moment(e.fecha).toDate(),
            hora: moment(e.hora).toDate(),
        })
    );

}