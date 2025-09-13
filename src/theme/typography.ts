import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Vazirmatn } from 'next/font/google';

export const poppins = Vazirmatn({ weight: ['500'], subsets: ['latin'] });

const typography = {
	fontFamily: 'Vazir', //poppins.style.fontFamily,
} as TypographyOptions;

export default typography;
