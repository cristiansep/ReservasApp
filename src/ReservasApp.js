import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";
import { AppRouter } from './routes/AppRouter';
import { AuthState } from './context/auth/authState';
import { UsuarioProvider } from './context/usuarios/UsuarioProvider';
import { SpecialtyProvider } from './context/especialidades/SpecialtyProvider';




export const ReservasApp = () => {


  return (
   
    <AuthState>
    <UsuarioProvider>
      <SpecialtyProvider>
    <LayoutProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </LayoutProvider>
    </SpecialtyProvider>
    </UsuarioProvider>
    </AuthState>
  );
};
