import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useCarousel_UpdateMutation,
	useCity_GetAllQuery,
	useCity_SetAvailableServiceTypesMutation,
	useProvincesQuery,
	useServiceSubCategory_GetAllQuery,
	useServiceTypes_GetAllQuery,
} from 'src/graphql/generated';

import { SelectField, useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider } from '@/components/atoms/Form';

const LoginSchema = Yup.object().shape({
	CityId: Yup.string().required('شهر را انتخاب کنید'),
	serviceTypeIds: Yup.array()
		.of(Yup.string().required(' حداقل یک سرویس انتخاب کنید'))
		.min(1, 'حداقل یک سرویس نیاز است'),
});

import COLORS from '@/theme/colors';

import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, handleClose, open }) => {
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [listSub, setlistSub] = useState([]);
	const [listSubsubAll, setListSubsubAll] = useState([]);
	const [formInitialized, setFormInitialized] = useState(false);
	const [listState, setListState] = useState([]);
	const [listCity, setlistCity] = useState([]);
	const [StateId, setStateId] = useState('');
	const { mutate: mutateState, isLoading } = useCity_SetAvailableServiceTypesMutation();
	const { mutate: mutateCityUpdate, isLoading: isLoadingUpdate } = useCarousel_UpdateMutation();

	const { data: datasub, isSuccess: isSuccesssub } = useServiceSubCategory_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);
	const { data: dataSubsub, isSuccess: isSuccessSubsub } = useServiceTypes_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);
	const { data, isSuccess: isSuccessstate } = useProvincesQuery(
		{
			skip: 0,
			take: 1000,
		},
		{
			keepPreviousData: true,
		}
	);
	const { data: datacity, isSuccess: isSuccesscity } = useCity_GetAllQuery(
		{ skip: 0, take: 1000, where: { province: { id: { eq: StateId } } } },
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (isSuccesscity) {
			const newList =
				datacity?.city_getAll?.result?.items?.map((page) => ({
					option: page.name,
					value: page.id,
				})) || [];

			setlistCity(newList);
		}
	}, [isSuccesscity, datacity]);

	useEffect(() => {
		if (isSuccessstate) {
			const newList =
				data?.province_getAll?.result?.items?.map(({ name, id }) => ({
					option: name,
					value: id,
				})) || [];

			if (newList.length > 0) setListState(newList);
		}
	}, [isSuccessstate, data]);

	useEffect(() => {
		if (isSuccesssub) {
			const newList =
				datasub?.serviceSubCategory_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
				})) || [];
			setlistSub(newList);
		}
	}, [isSuccesssub, datasub]);

	useEffect(() => {
		if (isSuccessSubsub) {
			const newList =
				dataSubsub?.serviceTypes_getAll.result?.items?.map((cat) => ({
					option: cat.name,
					value: cat.id,
					serviceCategoryId: cat.serviceSubCategory?.id,
				})) || [];
			setListSubsubAll(newList);
		}
	}, [isSuccessSubsub, dataSubsub]);

	const defaultValues = {
		StateId: '',
		CityId: '',
		serviceTypeIds: [''], // یک ردیف خالی اولیه
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, reset, watch } = methods;

	const serviceTypeIds = watch('serviceTypeIds');

	if (DataRow && !formInitialized) {
		return null;
	}

	const onSubmit = async (data: typeof defaultValues) => {
		const payload = {
			cityId: data.CityId,
			serviceTypeIds: data.serviceTypeIds.filter((f) => f),
		};

		await mutateState(
			{ input: payload },
			{
				onSuccess: () => {
					//reset(defaultValues);
					setValue('CityId', data.CityId);
					setValue('StateId', data.StateId);
					setValue('serviceTypeIds', []);
					setSelectedServices([]);
					setFormInitialized(false);
					handleClose();
				},
			}
		);
	};

	const handleAddUpload = () => {
		setValue('serviceTypeIds', [...serviceTypeIds, '']);
		setSelectedServices([...selectedServices, '']);
	};

	const handleRemoveUpload = (index: number) => {
		const newServiceTypeIds = [...serviceTypeIds];
		newServiceTypeIds.splice(index, 1);
		setValue('serviceTypeIds', newServiceTypeIds);

		const newSelectedServices = [...selectedServices];
		newSelectedServices.splice(index, 1);
		setSelectedServices(newSelectedServices);
	};

	const handleSelectServiceCategory = (index: number, value: string) => {
		const newSelectedServices = [...selectedServices];
		newSelectedServices[index] = value;
		setSelectedServices(newSelectedServices);

		const newServiceTypeIds = [...serviceTypeIds];
		newServiceTypeIds[index] = '';
		setValue('serviceTypeIds', newServiceTypeIds);
	};

	const filteredSubsubs = (index: number) => {
		const categoryId = selectedServices[index];
		return listSubsubAll.filter((item) => item.serviceCategoryId === categoryId);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			dir="rtl"
			fullWidth
			maxWidth="md"
			PaperProps={{ sx: { borderRadius: 3, padding: 3 } }}
		>
			<IconButton onClick={handleClose} sx={{ position: 'absolute', left: 10, top: 10, color: '#555' }}>
				<CloseIcon />
			</IconButton>

			<DialogTitle sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>ثبت اطلاعات</DialogTitle>
			<FormProvider methods={methods}>
				<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
					<Grid item xs={12} sm={3}>
						<SelectField
							//disabled={disabled}
							name="StateId"
							options={listState}
							autoWidth={false}
							multiple={false}
							native={false}
							onChanged={(e) => {
								setStateId(e.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<SelectField name="CityId" options={listCity} autoWidth={false} multiple={false} native={false} />
					</Grid>
					<Grid item xs={12} sm={6} sx={{ marginTop: '20px' }}>
						{serviceTypeIds.map((value, index) => (
							<React.Fragment key={index}>
								<Grid container spacing={2} sx={{ marginTop: '1px' }} alignItems="center">
									<Grid item xs={12} sm={5}>
										<SelectField
											name={`serviceCategory_${index}`}
											options={listSub}
											autoWidth={false}
											multiple={false}
											native={false}
											onChanged={(e) => handleSelectServiceCategory(index, e.target.value)}
											value={selectedServices[index] || ''}
										/>
									</Grid>

									<Grid item xs={12} sm={5}>
										<SelectField
											name={`serviceTypeIds.${index}`}
											options={filteredSubsubs(index)}
											autoWidth={false}
											multiple={false}
											native={false}
											value={serviceTypeIds[index] || ''}
											onChanged={(e) => {
												const updated = [...serviceTypeIds];
												updated[index] = e.target.value;
												setValue('serviceTypeIds', updated);
											}}
										/>
									</Grid>
									{index > 0 && (
										<Grid item xs={12} sm={2}>
											<Button
												variant="outlined"
												color="error"
												size="small"
												onClick={() => handleRemoveUpload(index)}
												sx={{ height: '40px', minWidth: '40px' }}
											>
												حذف
											</Button>
										</Grid>
									)}
								</Grid>
							</React.Fragment>
						))}

						<Button onClick={handleAddUpload} variant="outlined" size="small" sx={{ mt: 1, color: '#000 !important' }}>
							افزودن +
						</Button>
					</Grid>

					{/* دکمه‌ها */}
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: { xs: 'center', sm: 'space-between' },
								flexDirection: { xs: 'column-reverse', sm: 'row' },
								gap: 1,
							}}
						>
							<LoadingButton
								variant="contained"
								onClick={handleSubmit(onSubmit)}
								loading={isLoading || isLoadingUpdate}
								sx={{ background: '#88b2e1', color: '#fff', minWidth: 120 }}
							>
								ثبت
							</LoadingButton>
							<LoadingButton
								variant="contained"
								onClick={handleClose}
								sx={{
									background: COLORS.cancelBg,
									'&:hover': { background: COLORS.cancelHover },
									color: '#fff',
									minWidth: 120,
								}}
							>
								بستن
							</LoadingButton>
						</Box>
					</Grid>
				</Grid>
			</FormProvider>
		</Dialog>
	);
};

export default Index;
