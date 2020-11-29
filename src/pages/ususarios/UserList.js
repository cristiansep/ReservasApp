import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import { TableUser } from '../../components/tables/TableUser'
import Button from '@material-ui/core/Button';



export const UserList = ({history}) => {
    return (
        <div>
      <PageTitle title="Mantenedor de usuarios" 
      button={
      <Button
      // component={Link}
      // to="/create-user"
      onClick={() => history.push('/create-user')}
      variant="contained"
      size="medium"
      color="primary"
    >
        Nuevo usuario
    </Button>} />
          <TableUser/>
        </div>
    )
}
