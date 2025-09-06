export default function LoadingButton(theme: ThemeOverrideType) {
	return {
		MuiLoadingButton: {
			styleOverrides: {
				root: {
					'&.MuiLoadingButton-root': {
						height: 44,
					},
					'&.MuiLoadingButton-text': {
						'& .MuiLoadingButton-startIconPendingStart': {
							marginLeft: 0,
						},
						'& .MuiLoadingButton-endIconPendingEnd': {
							marginRight: 0,
						},
					},
				},
			},
		},
	};
}
