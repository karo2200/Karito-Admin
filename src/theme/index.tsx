import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import React from 'react';

import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
import typography from './typography';

export function ThemeProvider({ children }: React.PropsWithChildren) {
	const themeOptions = React.useMemo(
		() =>
			({
				typography,
				breakpoints,
				palette: palette.light,
				shape: { borderRadius: 4 },
				components: {},
			} as ThemeOptions),
		[]
	);

	const theme = createTheme(themeOptions);
	theme.components = componentsOverride(theme as any) as any;

	return (
		<MUIThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MUIThemeProvider>
	);
}
