export default function Skeleton(theme: ThemeOverrideType) {
	return {
		MuiSkeleton: {
			defaultProps: {
				animation: 'wave',
			},

			styleOverrides: {
				root: {
					backgroundColor: theme.palette.background.neutral,
				},
			},
		},
	};
}
