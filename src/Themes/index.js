import PropTypes from 'prop-types';
import { useMemo } from 'react';
import * as React from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import Shadows from './Shadows';
import Typography from './Typography';
import GlobalStyles from './GlobalStyles';
import CustomShadows from './CustomShadows';
import { useColorMode } from '../Hooks/ColorMode';
// import componentsOverride from './overrides';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { mode } = useColorMode();
  const themeOptions = useMemo(
    () => ({
      // palette,
      palette: {
        mode
      },
      Shadows: Shadows(),
      CustomShadows: CustomShadows(),
      //   shape: { borderRadius: 6 },
    }),
    [mode]
  );

  const theme = createTheme(themeOptions);
//   theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {/* <GlobalStyles /> */}
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
