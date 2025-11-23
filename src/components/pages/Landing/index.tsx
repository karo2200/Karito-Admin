'use client';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import * as React from 'react';

export const Textsuccsess = styled.div({
	fontSize: '18px',
	fontFamily: 'Roboto',
	textAlign: 'center',
	color: '#001145',
	marginTop: '10px',
});

export default function Index() {
	const [tabValue, setTabValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<Grid
			container
			direction="row"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh', padding: '20px' }}
		>
			<Grid item xs={12} sm={12} md={6} lg={5}>
				{/* لوگو */}
				<Grid
					item
					xs={12}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 20,
					}}
				>
					<img src="/icons/logo.jpg" alt="business" draggable="false" width={150} style={{ borderRadius: 8 }} />
				</Grid>

				{/* تب‌ها */}
				<Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
					<Tabs
						value={tabValue}
						sx={{ direction: 'rtl' }}
						onChange={handleChange}
						centered
						textColor="primary"
						indicatorColor="primary"
					>
						<Tab label="درباره ما" />
						<Tab label="قوانین و مقررات" />
						<Tab label="موارد پیشنهادی" />
					</Tabs>

					{/* محتوای تب‌ها */}
					<Box sx={{ p: 3, direction: 'rtl', textAlign: 'justify' }}>
						{tabValue === 0 && (
							<Textsuccsess>
								لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است و با استفاده از طراحان گرافیک ایجاد شده
								است. هدف ما ایجاد بستری امن و حرفه‌ای برای کاربران است.
							</Textsuccsess>
						)}
						{tabValue === 1 && (
							<Textsuccsess>
								کاربران موظف به رعایت قوانین سامانه هستند. هرگونه تخطی از قوانین منجر به مسدود شدن حساب کاربری خواهد شد.
							</Textsuccsess>
						)}
						{tabValue === 2 && (
							<Textsuccsess>
								ما همیشه از پیشنهادات شما استقبال می‌کنیم. لطفاً ایده‌های خود را برای بهبود پلتفرم با ما در میان
								بگذارید.
							</Textsuccsess>
						)}
					</Box>
				</Box>

				{/* دکمه */}
				<Grid
					item
					xs={12}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 30,
					}}
				>
					<Link href="https://app.dev.karito.net" passHref>
						<div
							style={{
								width: '200px',
								height: '40px',
								borderRadius: '8px',
								color: '#0342FE',
								fontWeight: 'bold',
								fontSize: '15px',
								fontFamily: 'Helvetica Neue, sans-serif',
								border: '1px solid #0342FE',
								backgroundColor: '#fff',
								textAlign: 'center',
								paddingTop: '8px',
								cursor: 'pointer',
							}}
						>
							Go to app
						</div>
					</Link>
				</Grid>

				{/* نماد اعتماد */}
				<Grid
					item
					xs={12}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 20,
					}}
				>
					<a
						referrerPolicy="origin"
						target="_blank"
						href="https://trustseal.enamad.ir/?id=670581&Code=7c8m2069sCDmY4DQw0jqmKCCCw5F1F9U"
						rel="noreferrer"
					>
						<img
							referrerPolicy="origin"
							src="https://trustseal.enamad.ir/logo.aspx?id=670581&Code=7c8m2069sCDmY4DQw0jqmKCCCw5F1F9U"
							alt="Enamad Trust Seal"
							style={{ cursor: 'pointer' }}
						/>
					</a>
				</Grid>
			</Grid>
		</Grid>
	);
}
