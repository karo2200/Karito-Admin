// ? Overwrite MUI components here

import Avatar from './Avatar';
import Backdrop from './Backdrop';
import Button from './Button';
import Card from './Card';
import CssBaseline from './CssBaseline';
import Input from './Input';
import LoadingButton from './LoadingButton';
import Pagination from './Pagination';
import Skeleton from './Skeleton';
import Typography from './Typography';

export default function ComponentsOverrides(theme: ThemeOverrideType) {
	return Object.assign(
		Card(theme),
		Input(theme),
		Avatar(theme),
		Button(theme),
		Skeleton(theme),
		Backdrop(theme),
		Typography(theme),
		Pagination(theme),
		CssBaseline(theme),
		LoadingButton(theme)
	);
}
