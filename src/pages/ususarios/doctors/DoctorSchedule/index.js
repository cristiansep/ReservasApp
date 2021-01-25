import React, { useContext } from 'react'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import Button from '@material-ui/core/Button';
import { ScheduleTable } from '../../../../components/tables/ScheduleTable';
import { ModalContext } from '../../../../context/modal/ModalContext';



export const DoctorSchedule = () => {

  const {openCalendarModal} = useContext(ModalContext);

  const handleClickNew = () => {
    openCalendarModal();
  }


    return (
        <div>
      <PageTitle 
        title="Mantenedor de Horarios" 
        subTitle="Para crear su horario, debe seleccionar sus horas de trabajo usando el mouse"

    //   button={
    //   <Button
    //   variant="contained"
    //   size="medium"
    //   color="primary"
    //   onClick={handleClickNew} 
    // >
    //     Nuevo Horario
    // </Button>} 
    />

          <ScheduleTable/>
        </div>
    )
}