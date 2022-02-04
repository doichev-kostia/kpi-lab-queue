import React from 'react';
import {ThemeProvider, useTheme} from "@mui/material";

const CustomThemeProvider: React.FC = ({children}): JSX.Element => {
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default CustomThemeProvider;