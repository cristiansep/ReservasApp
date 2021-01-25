


export const types = {

    // authLogin: '[auth] login exitoso',
    login: '[auth] login',
    logout: '[auth] logout',

    //modal
    openModal: '[modal] Open modal',
    closeModal: '[modal] Close modal',
    openCalendarModal: '[calendarModal] Open calendar Modal',
    closeCalendarModal: '[calendarModal] Close calendar Modal',
    openAppointmentModal: '[appointmetModal] Open appointment modal',
    closeAppointmentModal: '[appointmetModal] Close appointment modal',

    //auth
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartTokenRenew: '[auth] Start Token renew',
    authLogout: '[auth] Logout',

    //usuarios
    obtenerUsuarios: '[users] listar usuarios',
    usersLoaded: '[users] Users loaded',
    userDeleted: '[users] User delete',
    userCreate: '[users] User create',
    userUpdated: '[users] User updated',
    usuarioSeleccionado: '[users] Usuario seleccionado',
    userSelectClear: '[users] Limpiar usuario seleccionado',
    
    // doctors
    doctorCreate: '[doctor] Doctor create',
    doctorsLoaded: '[doctor] Doctors loaded',
    doctorDeleted: '[doctor] Doctor delete',
    doctorUpdated: '[doctor] Doctor updated',
    doctorSeleccionado: '[doctor] Doctor seleccionado',
    doctorSelectClear: '[doctor] Limpiar doctor seleccionado',
    
    // Especialidades
    specialtiesLoaded: '[specialties] Especialties loaded',
    specialtyDoctor: '[specialties] Especialty doctors',
    especialidadSeleccionada: '[specialties] Especialidad seleccionada',
    specialtyDeleted: '[specialties] Specialty delete',
    specialtyCreate: '[specialties] Specialty create',
    specialtySelectClear: '[speciallties Sprcialty clear]',
    specialtyUpdated: '[speciallties Sprcialty updated]',

    // Horarios
    scheduleSetActive: '[schedule] Schedule Set Active',
    scheduleAddNew: '[schedule] Schedule add new',
    scheduleUpdated: '[schedule] Schedule updated',
    scheduleDeleted: '[schedule] Schedule deleted',
    scheduleClearActive: '[schedule] Schedule clear',
    schedulesLoaded: '[schedule] Schedule loaded',
    scheduleSelectedShift: '[schedule] Shift Selected',
    scheduleClearShift: '[schedule] Shift clear',
    scheduleShiftDay: '[schedule] Shift day',
    

    // Reservas
    appointmentAddNew: '[appointment] Appointment add new',
    appointmentSetActive: '[appointment] Appointment set active',
    appointmentCleanActive: '[appointment] Appointment clear',
    appointmentUpdated: '[appointment] Appointment updated',
    appointmentDeleted: '[appointment] Appointment deleted',
    appointmentsLoaded: '[appointment] Appointment loaded',
    appointmentsLoadedPatient: '[appointment] Appointment patient loaded',
    appointmentsLoadedConfirmed: '[appointment] Appointment loaded confirmed',
    appointmentUserStatusUpdated: '[appointment] Appointment user status update',
    appointmentStatusConfirmUpdated: '[appointment] Appointment status confirm update',
    appointmentStatusUpdated: '[appointment] Appointment status update',
}