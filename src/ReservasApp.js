import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";
import { AppRouter } from './routes/AppRouter';
import { AuthState } from './context/auth/authState';




export const ReservasApp = () => {


  return (
   
    <AuthState>
    <LayoutProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </LayoutProvider>
    </AuthState>
  );
};
