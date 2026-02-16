import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import {
	useSettings_GetSpecialistRequestRankingSettingsQuery,
	useSettings_UpdateSpecialistRequestRankingSettingsMutation,
} from 'src/graphql/generated';

import { useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { CheckBox, FormProvider, TextField } from '@/components/atoms/Form';
export const PHONE_VALIDATION = /^9\d{9}$/;

const LoginSchema = Yup.object().shape({
	primarySkillWeight: Yup.number()?.required('فیلد اجباری است'),
	secondarySkillWeight: Yup.number()?.required('فیلد اجباری است'),
	optionalSkillWeight: Yup.number()?.required('فیلد اجباری است'),
	budgetScoreMultiplier: Yup.number()?.required('فیلد اجباری است'),
	distancePenaltyFactor: Yup.number()?.required('فیلد اجباری است'),
	distancePenaltyPower: Yup.number()?.required('فیلد اجباری است'),
	distancePenaltyMax: Yup.number()?.required('فیلد اجباری است'),
	registrationAgePenaltyFactor: Yup.number()?.required('فیلد اجباری است'),
	registrationAgePenaltyPower: Yup.number()?.required('فیلد اجباری است'),
	registrationAgePenaltyMax: Yup.number()?.required('فیلد اجباری است'),
});
import { useSnackbar } from 'notistack';
import useMutationErrorHandler from 'src/hooks/useMutationErrorHandler';

import COLORS from '@/theme/colors';

const Index = () => {
	const { mutate: mutateState, isLoading: isLoading } = useSettings_UpdateSpecialistRequestRankingSettingsMutation();
	const { data } = useSettings_GetSpecialistRequestRankingSettingsQuery();
	const { enqueueSnackbar } = useSnackbar();
	const mutationErrorHandler = useMutationErrorHandler();
	const defaultValues = {
		primarySkillWeight: 0,
		secondarySkillWeight: 0,
		optionalSkillWeight: 0,
		budgetScoreMultiplier: 0,
		enableDistancePenalty: false,
		distancePenaltyFactor: 0,
		distancePenaltyPower: 0,
		distancePenaltyMax: 0,
		enableRegistrationAgePenalty: false,
		registrationAgePenaltyFactor: 0,
		registrationAgePenaltyPower: 0,
		registrationAgePenaltyMax: 0,
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, reset, setValue } = methods;

	useEffect(() => {
		if (data) {
			reset({
				primarySkillWeight: data.settings_getSpecialistRequestRankingSettings?.result?.primarySkillWeight,
				secondarySkillWeight: data.settings_getSpecialistRequestRankingSettings?.result?.secondarySkillWeight,
				optionalSkillWeight: data.settings_getSpecialistRequestRankingSettings?.result?.optionalSkillWeight,
				budgetScoreMultiplier: data.settings_getSpecialistRequestRankingSettings?.result?.budgetScoreMultiplier,
				enableDistancePenalty: data.settings_getSpecialistRequestRankingSettings?.result?.enableDistancePenalty,
				distancePenaltyFactor: data.settings_getSpecialistRequestRankingSettings?.result?.distancePenaltyFactor,
				distancePenaltyPower: data.settings_getSpecialistRequestRankingSettings?.result?.distancePenaltyPower,
				distancePenaltyMax: data.settings_getSpecialistRequestRankingSettings?.result?.distancePenaltyMax,
				enableRegistrationAgePenalty:
					data.settings_getSpecialistRequestRankingSettings?.result?.enableRegistrationAgePenalty,
				registrationAgePenaltyFactor:
					data.settings_getSpecialistRequestRankingSettings?.result?.registrationAgePenaltyFactor,
				registrationAgePenaltyPower:
					data.settings_getSpecialistRequestRankingSettings?.result?.registrationAgePenaltyPower,
				registrationAgePenaltyMax: data.settings_getSpecialistRequestRankingSettings?.result?.registrationAgePenaltyMax,
			});
		}
	}, [data, reset]);

	const onSubmit = async (data: typeof defaultValues) => {
		await mutateState(
			{
				input: {
					primarySkillWeight: data.primarySkillWeight,
					secondarySkillWeight: data.secondarySkillWeight,
					optionalSkillWeight: data.optionalSkillWeight,
					budgetScoreMultiplier: data.budgetScoreMultiplier,
					enableDistancePenalty: data.enableDistancePenalty,
					distancePenaltyFactor: data.distancePenaltyFactor,
					distancePenaltyPower: data.distancePenaltyPower,
					distancePenaltyMax: data.distancePenaltyMax,
					enableRegistrationAgePenalty: data.enableRegistrationAgePenalty,
					registrationAgePenaltyFactor: data.registrationAgePenaltyFactor,
					registrationAgePenaltyPower: data.registrationAgePenaltyPower,
					registrationAgePenaltyMax: data.registrationAgePenaltyMax,
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
							label="primarySkillWeight"
							name="primarySkillWeight"
							placeholder="primarySkillWeight"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="secondarySkillWeight"
							name="secondarySkillWeight"
							placeholder="secondarySkillWeight"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="optionalSkillWeight"
							name="optionalSkillWeight"
							placeholder="optionalSkillWeight"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="budgetScoreMultiplier"
							name="budgetScoreMultiplier"
							placeholder="budgetScoreMultiplier"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<CheckBox name="enableDistancePenalty" label="enableDistancePenalty" />
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="distancePenaltyFactor"
							name="distancePenaltyFactor"
							placeholder="distancePenaltyFactor"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="distancePenaltyPower"
							name="distancePenaltyPower"
							placeholder="distancePenaltyPower"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="distancePenaltyMax"
							name="distancePenaltyMax"
							placeholder="distancePenaltyMax"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<CheckBox name="enableRegistrationAgePenalty" label="enableRegistrationAgePenalty" />
					</Grid>

					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="registrationAgePenaltyFactor"
							name="registrationAgePenaltyFactor"
							placeholder="registrationAgePenaltyFactor"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="registrationAgePenaltyPower"
							name="registrationAgePenaltyPower"
							placeholder="registrationAgePenaltyPower"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							required
							label="registrationAgePenaltyMax"
							name="registrationAgePenaltyMax"
							placeholder="registrationAgePenaltyMax"
							sx={{ mb: 0, height: '40px' }}
							id="Name"
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
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
