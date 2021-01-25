import React, { useContext } from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ScheduleContext } from '../../context/schedule/ScheduleContext';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        margin: theme.spacing(8),
      },
   position: 'fixed',
   bottom: theme.spacing(2),
//    left: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const DeleteEventFab = () => {

  const classes = useStyles();

  const {scheduleDelete, scheduleClearActive} = useContext(ScheduleContext);

  const handleDelete = () => {
    scheduleDelete();
    scheduleClearActive();
  }

  return (
    <div className={classes.root}>
      <Fab 
        color="secondary" 
        aria-label="delete"
        onClick={handleDelete}
        >
        <DeleteForeverIcon />
      </Fab>
    </div>
  );
}