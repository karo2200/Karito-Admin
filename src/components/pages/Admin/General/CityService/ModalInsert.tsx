import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useCity_GetAllQuery,
	useCity_GetAvailableServiceTypesQuery,
	useCity_SetAvailableServiceTypesMutation,
	useProvincesQuery,
	useServiceSubCategory_GetAllQuery,
	useServiceTypes_GetAllQuery,
} from 'src/graphql/generated';

import { SelectField, useForm, Yup, yupResolver } from '@/components/atoms/Form';
import { FormProvider } from '@/components/atoms/Form';

import { IPageProps } from './type-page';

// 🔰 Validation Schema
const LoginSchema = Yup.object().shape({
	CityId: Yup.string().required('شهر را انتخاب کنید'),
	serviceTypeIds: Yup.array().of(Yup.string().required('حداقل یک سرویس انتخاب کنید')).min(1, 'حداقل یک سرویس نیاز است'),
});

const Index: FC<IPageProps> = ({ handleClose, open }) => {
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [listSub, setlistSub] = useState([]);
	const [listSubsubAll, setListSubsubAll] = useState([]);
	const [listState, setListState] = useState([]);
	const [listCity, setlistCity] = useState([]);
	const [StateId, setStateId] = useState('');
	const [cityId, setcityId] = useState('');

	// =================== GraphQL Queries ===================
	const { data: CityServiceList } = useCity_GetAvailableServiceTypesQuery(
		{
			skip: 0,
			take: 10000,
			input: { cityId: cityId },
		},
		{ keepPreviousData: true }
	);

	const { mutate: mutateState, isLoading } = useCity_SetAvailableServiceTypesMutation();

	const { data: datasub, isSuccess: isSuccesssub } = useServiceSubCategory_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);

	const { data: dataSubsub, isSuccess: isSuccessSubsub } = useServiceTypes_GetAllQuery(
		{ skip: 0, take: 1000 },
		{ keepPreviousData: true }
	);

	const { data, isSuccess: isSuccessstate } = useProvincesQuery({ skip: 0, take: 1000 }, { keepPreviousData: true });

	const { data: datacity, isSuccess: isSuccesscity } = useCity_GetAllQuery(
		{ skip: 0, take: 1000, where: { province: { id: { eq: StateId } } } },
		{ keepPreviousData: true }
	);

	// =================== Load Provinces ===================
	useEffect(() => {
		if (isSuccessstate) {
			const newList =
				data?.province_getAll?.result?.items?.map(({ name, id }) => ({
					option: name,
					value: id,
				})) || [];
			setListState(newList);
		}
	}, [isSuccessstate, data]);

	// =================== Load Cities ===================
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

	// =================== Load Sub Categories ===================
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

	// =================== Load Service Types ===================
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

	// =================== React Hook Form ===================
	const defaultValues = {
		StateId: '',
		CityId: '',
		serviceTypeIds: [''],
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const { handleSubmit, setValue, watch } = methods;
	const serviceTypeIds = watch('serviceTypeIds');

	// =================== Auto-fill form after city selection ===================
	useEffect(() => {
		if (!CityServiceList || !cityId) return;

		const items = CityServiceList.city_getAvailableServiceTypes?.result?.items || [];

		// اگر لیست خالی بود
		if (items.length === 0) {
			setSelectedServices([]);
			setValue('serviceTypeIds', ['']);
			return;
		}

		// استخراج category و type
		const categoryIds = items.map((item) => item.serviceSubCategory?.id || '');
		const typeIds = items.map((item) => item.id);

		setSelectedServices(categoryIds);
		setValue('serviceTypeIds', typeIds);
	}, [CityServiceList, cityId]);

	// =================== Submit ===================
	const onSubmit = async (data: typeof defaultValues) => {
		const payload = {
			cityId: data.CityId,
			serviceTypeIds: data.serviceTypeIds.filter((f) => f),
		};

		await mutateState(
			{ input: payload },
			{
				onSuccess: () => {
					handleClose();
				},
			}
		);
	};

	// =================== Add / Remove Rows ===================
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
		const newSelected = [...selectedServices];
		newSelected[index] = value;
		setSelectedServices(newSelected);

		const updated = [...serviceTypeIds];
		updated[index] = '';
		setValue('serviceTypeIds', updated);
	};

	const filteredSubsubs = (index: number) => {
		const categoryId = selectedServices[index];
		return listSubsubAll.filter((item) => item.serviceCategoryId === categoryId);
	};

	// =================== Render ===================
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
					{/* استان */}
					<Grid item xs={12} sm={3}>
						<SelectField
							name="StateId"
							options={listState}
							onChanged={(e) => {
								setStateId(e.target.value);
							}}
						/>
					</Grid>

					{/* شهر */}
					<Grid item xs={12} sm={3}>
						<SelectField name="CityId" options={listCity} onChanged={(e) => setcityId(e.target.value)} />
					</Grid>

					{/* دسته / نوع سرویس */}
					<Grid item xs={12} sm={6} sx={{ marginTop: '20px' }}>
						{serviceTypeIds.map((value, index) => (
							<Grid container spacing={2} key={index} alignItems="center" sx={{ mt: 1 }}>
								<Grid item xs={12} sm={5}>
									<SelectField
										name={`serviceCategory_${index}`}
										options={listSub}
										value={selectedServices[index] || ''}
										onChanged={(e) => handleSelectServiceCategory(index, e.target.value)}
									/>
								</Grid>

								<Grid item xs={12} sm={5}>
									<SelectField
										name={`serviceTypeIds.${index}`}
										options={filteredSubsubs(index)}
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
										<Button variant="outlined" color="error" size="small" onClick={() => handleRemoveUpload(index)}>
											حذف
										</Button>
									</Grid>
								)}
							</Grid>
						))}

						<Button onClick={handleAddUpload} variant="outlined" sx={{ mt: 1 }}>
							افزودن +
						</Button>
					</Grid>

					{/* دکمه‌ها */}
					<Grid item xs={12}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<LoadingButton
								sx={{ color: '#fff', width: '100px' }}
								variant="contained"
								onClick={handleSubmit(onSubmit)}
								loading={isLoading}
							>
								ثبت
							</LoadingButton>
							<Button sx={{ color: '#fff', width: '100px' }} variant="contained" onClick={handleClose} color="error">
								بستن
							</Button>
						</Box>
					</Grid>
				</Grid>
			</FormProvider>
		</Dialog>
	);
};

export default Index;
