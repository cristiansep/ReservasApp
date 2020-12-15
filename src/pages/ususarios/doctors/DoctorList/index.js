import React from 'react'
import PageTitle from '../../../../components/PageTitle/PageTitle'
import { TableDoctor } from '../../../../components/tables/TableDoctor'
import Button from '@material-ui/core/Button';



export const DoctorList = ({history}) => {
    return (
        <div>
      <PageTitle title="Mantenedor de Médicos" 
      button={
      <Button
      // component={Link}
      // to="/create-user"
      onClick={() => history.push('/create-doctor')}
      variant="contained"
      size="medium"
      color="primary"
    >
        Nuevo Médico
    </Button>} />
          <TableDoctor/>
        </div>
    )
}