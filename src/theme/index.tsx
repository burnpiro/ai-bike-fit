import {PropsWithChildren, useMemo} from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typograpthy';
import GlobalStyles from './globalStyles';
import customShadows, {CustomShadows} from './customShadows';
import componentsOverride from './overrides';
import {ThemeOptions} from "@mui/material/styles/createTheme";

interface ThemeProviderProps {

}

export default function ThemeProvider({ children }: PropsWithChildren<ThemeProviderProps>) {
    const themeOptions = useMemo<ThemeOptions>(
        () => ({
            palette,
            shape: { borderRadius: 6 },
            typography,
            shadows: shadows(),
            customShadows: customShadows(),
        }),
        []
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}

declare module '@mui/material/styles' {
    interface Theme {
        customShadows: CustomShadows;
    }
    interface TypeBackground {
        neutral: string;
        transparent: string;
        light: string;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        customShadows: CustomShadows;
    }
}