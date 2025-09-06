const PRIMARY = {
	lighter: '#C8FACD',
	light: '#5BE584',
	main: '#825EF6',
	dark: '#6D4FCC',
	darker: '#005249',
};
const SECONDARY = {
	lighter: '#D6E4FF',
	light: '#84A9FF',
	main: '#3366FF',
	dark: '#1939B7',
	darker: '#091A7A',
};
const INFO = {
	lighter: '#D0F2FF',
	light: '#74CAFF',
	main: '#1890FF',
	dark: '#0C53B7',
	darker: '#04297A',
};
const SUCCESS = {
	lighter: '#E9FCD4',
	light: '#AAF27F',
	main: '#54D62C',
	dark: '#229A16',
	darker: '#08660D',
};
const WARNING = {
	lighter: '#FFF7CD',
	light: '#FFE16A',
	main: '#FFC107',
	dark: '#B78103',
	darker: '#7A4F01',
};
const ERROR = {
	lighter: '#FFE7D9',
	light: '#FFA48D',
	main: '#FF4842',
	dark: '#B72136',
	darker: '#7A0C2E',
};

const GREY = {
	0: '#FFFFFF',
	100: '#F9FAFB',
	200: '#F4F6F8',
	300: '#DFE3E8',
	400: '#C4CDD5',
	500: '#919EAB',
	600: '#637381',
	700: '#454F5B',
	800: '#212B36',
	900: '#161C24',
};

const COMMON = {
	common: { black: '#000', white: '#fff' },
	primary: { ...PRIMARY, contrastText: '#1F1F1F' },
	secondary: { ...SECONDARY, contrastText: '#fff' },
	info: { ...INFO, contrastText: '#fff' },
	success: { ...SUCCESS, contrastText: GREY[800] },
	warning: { ...WARNING, contrastText: GREY[800] },
	error: { ...ERROR, contrastText: '#fff' },
	grey: GREY,
};

// ? for the dark mode , you should hav ceate a dark object like light object with its own colors
const palette = {
	light: {
		...COMMON,
		mode: 'light',
		text: { primary: '#1F1F1F', secondary: 'red', disabled: GREY[500] },
		background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
	},
};

export default palette;
