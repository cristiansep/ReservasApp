import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";
import { AppRouter } from './routes/AppRouter';
import { AuthState } from './context/auth/authState';
import { UsuarioProvider } from './context/usuarios/UsuarioProvider';
import { SpecialtyProvider } from './context/especialidades/SpecialtyProvider';
import { ModalProvider } from './context/modal/ModalProvider';
import { ScheduleProvider } from './context/schedule/ScheduleProvider';
import { AppointmentProvider } from './context/appointments/AppointmentProvider';




export const ReservasApp = () => {


  return (
    <AuthState>
      <UsuarioProvider>
        <SpecialtyProvider>
          <LayoutProvider>
            <ScheduleProvider>
            <AppointmentProvider>
            <ModalProvider>
              <ThemeProvider theme={Themes.default}>
                <CssBaseline />
                <AppRouter />
              </ThemeProvider>
            </ModalProvider>
            </AppointmentProvider>
            </ScheduleProvider>
          </LayoutProvider>
        </SpecialtyProvider>
      </UsuarioProvider>
    </AuthState>
  );
};
