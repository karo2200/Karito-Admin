import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import {
	useSettings_GetSkillLimitationSettingsQuery,
	useSettings_UpdateSkillLimitationSettingsMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider, TextField } from '@/components/atoms/Form';
export const PHONE_VALIDATION = /^9\d{9}$/;

const LoginSchema = Yup.object().shape({
	maxPrimarySkills: Yup.number()?.required('فیلد اجباری است'),
	maxSecondarySkills: Yup.number()?.required('فیلد اجباری است'),
	maxOptionalSkills: Yup.number()?.required('فیلد اجباری است'),
});
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

import COLORS from '@/theme/colors';

const Index = () => {
	const { mutate: mutateState, isLoading: isLoading } = useSettings_UpdateSkillLimitationSettingsMutation();
	const { data } = useSettings_GetSkillLimitationSettingsQuery();
	const { enqueueSnackbar } = useSnackbar();
	const mutationErrorHandler = useMutationErrorHandler();
	const defaultValues = {
		maxPrimarySkills: 0,
		maxSecondarySkills: 0,
		maxOptionalSkills: 0,
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, reset, setValue } = methods;

	useEffect(() => {
		if (data) {
			reset({
				maxPrimarySkills: data.settings_getSkillLimitationSettings?.result?.maxPrimarySkills,
				maxSecondarySkills: data.settings_getSkillLimitationSettings?.result?.maxSecondarySkills,
				maxOptionalSkills: data.settings_getSkillLimitationSettings?.result?.maxOptionalSkills,
			});
		}
	}, [data, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		await mutateState(
			{
				input: {
					maxPrimarySkills: data.maxPrimarySkills,
					maxSecondarySkills: data.maxSecondarySkills,
					maxOptionalSkills: data.maxOptionalSkills,
				},
			},
			{
				onSuccess: async (res) => {
					enqueueSnackbar('ثبت اطلاعات با موفقیت انجام شد ', { variant: 'success' });
				},
				onError: (err) => {
					mutationErrorHandler(err, 'admin_getAll');
				},
			}
		);
	};

	return (
		<Box
			sx={{
				//boxShadow: ' rgb(100 100 111 / 9%) 0px 7px 29px 0px',
				width: '100%',
				minHeight: '90px',
				borderRadius: 2,
				marginBottom: 5,
				padding: 2,
				backgroundColor: COLORS.grey3,
				border: '1px solid #c1c1c1a8',
			}}
		>
			<FormProvider methods={methods}>
				<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="maxPrimarySkills"
							name="maxPrimarySkills"
							placeholder="maxPrimarySkills"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="maxSecondarySkills"
							name="maxSecondarySkills"
							placeholder="maxSecondarySkills"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="maxOptionalSkills"
							name="maxOptionalSkills"
							placeholder="maxOptionalSkills"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<LoadingButton
							variant="contained"
							onClick={handleSubmit(onSubmit)}
							loading={isLoading}
							fullWidth
							sx={{
								fontSize: '15px',
								//backgroundImage: 'linear-gradient(to right,#1D5BD2, #4D88F9)',
								background: '#88b2e1',
								color: '#fff',
								borderRadius: '8px !important',
								width: '100px',
							}}
						>
							ثبت
						</LoadingButton>
					</Grid>
				</Grid>
			</FormProvider>
		</Box>
	);
};

export default Index;
