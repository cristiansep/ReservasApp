import React, { useContext } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '@material-ui/core/Button';
import { AppointmentTable } from '../../components/tables/AppointmentTable';
import { AuthContext } from '../../context/auth/AuthContext';



export const AppointmetList = ({history}) => {

    const {user:{rol}} = useContext(AuthContext);


    return (
        <div>
      <PageTitle title="Mantenedor de reservas médicas" 
      button={
        rol === 'USER_ROLE'  &&
        <Button
            onClick={() => history.push('/create-appointment')}
            variant="contained"
            size="medium"
            color="primary"
            >
            Nueva Reserva
        </Button>
      }    
    />
    <AppointmentTable/>
        </div>
    )
}