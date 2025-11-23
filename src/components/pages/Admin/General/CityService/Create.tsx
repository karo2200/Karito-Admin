import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
	useCity_GetAllQuery,
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

import Modal from './ModalInsert';
import { IPageProps } from './type-page';

const Index: FC<IPageProps> = ({ DataRow, onRefreshItem, onSearchItem, openModal }) => {
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const [DataRows, setDataRow] = useState<any>(null);

	const [listSub, setlistSub] = useState([]);
	const [listSubsubAll, setListSubsubAll] = useState([]);
	const [listState, setListState] = useState([]);
	const [listCity, setlistCity] = useState([]);
	const [StateId, setStateId] = useState('');
	// بارگذاری DataRow
	useEffect(() => {
		setDataRow(DataRow);
	}, [DataRow]);

	useEffect(() => {
		if (openModal === true) {
			setOpen(true);
		}
	}, [openModal]);
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
		<FormProvider methods={methods}>
			<Grid container spacing={2} alignItems="center" justifyContent="flex-start" dir="rtl">
				<Grid item xs={12} sm={3}>
					<SelectField
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
					<SelectField
						name="CityId"
						options={listCity}
						autoWidth={false}
						multiple={false}
						native={false}
						onChanged={(e) => {
							onSearchItem(e.target.value);
						}}
					/>
				</Grid>

				<Grid item xs={12} sm={3}>
					<LoadingButton
						variant="contained"
						onClick={() => {
							setDataRow(null);
							setOpen(true);
						}}
						fullWidth
						sx={{
							fontSize: '15px',
							background: '#88b2e1',
							color: '#fff',
							borderRadius: '8px !important',
							width: '100px',
							marginTop: '5px',
						}}
					>
						جدید
					</LoadingButton>
				</Grid>
			</Grid>
			<Modal
				open={open}
				handleClose={() => {
					setOpen(false);
					onRefreshItem();
				}}
				DataRow={DataRows}
			/>
		</FormProvider>
	);
};

export default Index;
