import React from 'react'
import Button from '@material-ui/core/Button';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { SpecialtyTable } from '../../../components/tables/SpecialtyTable';



export const SpecialtyList = ({history}) => {
    return (
        <div>
      <PageTitle title="Mantenedor de especialidades" 
      button={
      <Button
      // component={Link}
      // to="/create-user"
      onClick={() => history.push('/create-user')}
      variant="contained"
      size="medium"
      color="primary"
    >
        Crear especialidad
    </Button>} />
          <SpecialtyTable/>
        </div>
    )
}