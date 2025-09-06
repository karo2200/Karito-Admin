import { Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type QueryType = 'up' | 'down' | 'between' | 'only';

export function useResponsive(
	query: QueryType,
	key: Breakpoint,
	start?: number | Breakpoint,
	end?: number | Breakpoint
) {
	const theme = useTheme();

	const mediaUp = useMediaQuery(theme.breakpoints.up(key));

	const mediaDown = useMediaQuery(theme.breakpoints.down(key));

	const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

	const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

	if (query === 'up') {
		return mediaUp;
	}

	if (query === 'down') {
		return mediaDown;
	}

	if (query === 'between') {
		return mediaBetween;
	}

	if (query === 'only') {
		return mediaOnly;
	}
}
