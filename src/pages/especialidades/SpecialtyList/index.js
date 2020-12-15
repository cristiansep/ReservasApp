import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import PageTitle from '../../../components/PageTitle/PageTitle';
import { SpecialtyTable } from '../../../components/tables/SpecialtyTable';
import { ModalContext } from '../../../context/modal/ModalContext';



export const SpecialtyList = () => {

  const {uiOpenModal} = useContext(ModalContext);

  const openModal = () => {
    uiOpenModal();
  }

    return (
        <div>
      <PageTitle title="Mantenedor de especialidades" 
      button={
      <Button
      // component={Link}
      // to="/create-user"
      onClick={openModal}
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