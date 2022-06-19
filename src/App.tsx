import React from 'react';
import {
    darkTheme,
    defaultTheme,
    Text,
    ThemeProvider
} from '@lapidist/components';

const App = (): JSX.Element => {
    const prefersDarkTheme =
        (window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches) ||
        localStorage.getItem('prefersDarkMode') === 'true';
    const theme = prefersDarkTheme ? darkTheme : defaultTheme;

    return (
        <ThemeProvider theme={theme}>
            <Text
                as="main"
                styles={{
                    backgroundColor: { group: 'base', shade: 'light' },
                    minHeight: '100vh'
                }}
            >
                Hello world!
            </Text>
        </ThemeProvider>
    );
};

export default App;
